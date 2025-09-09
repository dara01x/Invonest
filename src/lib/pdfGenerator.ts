import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { Invoice, PDFGenerationOptions } from './types';
import { currencies } from './types';
import { translations, type Language } from './i18n';

interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

// Cache for optimized images
const imageCache = new Map<string, string>();

/**
 * Optimized PDF generation with performance improvements
 */
export const generateInvoicePDF = async (
  invoice: Invoice, 
  language: Language,
  sellerInfo: CompanyInfo,
  buyerInfo: CustomerInfo,
  themeColor: string = '#3B82F6',
  logoUrl?: string | null,
  themeGradient?: string,
  options: PDFGenerationOptions = {}
) => {
  const {
    filename = `invoice-${invoice.invoiceNo}.pdf`,
    quality = 2,
    format = 'a4',
    orientation = 'portrait'
  } = options;

  try {
    // Get translations for the selected language
    const t = (key: keyof typeof translations.en) => translations[language][key] || translations.en[key];
    
    // Optimize logo if provided
    let optimizedLogoUrl = logoUrl;
    if (logoUrl && !imageCache.has(logoUrl)) {
      optimizedLogoUrl = await optimizeLogoForPDF(logoUrl);
      imageCache.set(logoUrl, optimizedLogoUrl);
    } else if (logoUrl && imageCache.has(logoUrl)) {
      optimizedLogoUrl = imageCache.get(logoUrl);
    }
    
    // Create a temporary div with the invoice content
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '794px'; // A4 width at 96dpi
    tempDiv.style.backgroundColor = 'white';
    tempDiv.style.padding = '40px';
    tempDiv.style.fontFamily = language === 'en' ? 'Inter, sans-serif' : 'Noto Sans Arabic, Tahoma, Arial, sans-serif';
    tempDiv.style.direction = language === 'en' ? 'ltr' : 'rtl';
    tempDiv.style.textAlign = language === 'en' ? 'left' : 'right';
    
    // Generate HTML content
    tempDiv.innerHTML = generateInvoiceHTML(invoice, language, sellerInfo, buyerInfo, themeColor, optimizedLogoUrl, themeGradient, t);
    
    document.body.appendChild(tempDiv);
    
    // Generate canvas from HTML with optimizations
    const canvas = await html2canvas(tempDiv, {
      scale: quality,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: tempDiv.scrollHeight,
      logging: false, // Disable logging for performance
      imageTimeout: 15000,
      removeContainer: true
    });
    
    // Remove temporary div immediately
    document.body.removeChild(tempDiv);
    
    // Create PDF with optimizations
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format,
      compress: true
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 0.9); // Use JPEG for smaller file size
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Handle multi-page PDFs
    const pageHeight = pdf.internal.pageSize.getHeight();
    let heightLeft = pdfHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }
    
    // Mobile-friendly PDF download
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile devices, create a blob URL and open in new tab
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      
      // Try to download directly first
      try {
        pdf.save(filename);
      } catch (error) {
        // Fallback: open in new window for mobile
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL after a delay
        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      }
    } else {
      // Desktop download
      pdf.save(filename);
    }
    
    return { success: true, message: 'PDF generated successfully' };
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

/**
 * Optimize logo image for PDF
 */
const optimizeLogoForPDF = async (logoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Optimize size for PDF (max 200px)
      const maxSize = 200;
      let { width, height } = img;
      
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to optimized format
      const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      resolve(optimizedDataUrl);
    };
    
    img.onerror = () => {
      console.warn('Failed to optimize logo, using original');
      resolve(logoUrl);
    };
    
    img.src = logoUrl;
  });
};

const generateInvoiceHTML = (
  invoice: Invoice, 
  language: Language,
  sellerInfo: CompanyInfo,
  buyerInfo: CustomerInfo,
  themeColor: string = '#3B82F6',
  logoUrl?: string | null,
  themeGradient?: string,
  t?: (key: keyof typeof translations.en) => string
): string => {
  // Default translation function if none provided
  const translate = t || ((key: keyof typeof translations.en) => translations.en[key]);
  const isRTL = language !== 'en';
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    const selectedCurrency = currencies.find(c => c.code === invoice.currency);
    const symbol = selectedCurrency?.symbol || '$';
    return `${symbol}${amount.toFixed(2)}`;
  };
  
  // Use gradient if provided, otherwise use solid color
  const backgroundStyle = themeGradient || themeColor;
  
  return `
    <div style="
      max-width: 794px; 
      margin: 0 auto; 
      background: white; 
      color: #1a1a1a; 
      font-family: Arial, sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border: 1px solid #e5e7eb;
    ">
      <!-- Header -->
      <table style="width: 100%; border-collapse: collapse; background: ${backgroundStyle}; color: white; margin-bottom: 30px;">
        <tr>
          <td style="padding: 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="width: 70%;">
                  <table style="border-collapse: collapse;">
                    <tr>
                      ${logoUrl ? `
                        <td style="padding-right: 20px; vertical-align: top;">
                          <img src="${logoUrl}" alt="Logo" style="
                            width: 70px; 
                            height: 70px; 
                            object-fit: contain; 
                            background: white; 
                            border-radius: 8px; 
                            padding: 6px;
                          " />
                        </td>
                      ` : ''}
                      <td style="vertical-align: top;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; margin-bottom: 5px;">${translate('invoice').toUpperCase()}</h1>
                        <p style="margin: 0; font-size: 16px; opacity: 0.9;">${invoice.invoiceNo}</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="width: 30%; text-align: ${language === 'en' ? 'right' : 'left'}; vertical-align: top; padding-top: 10px;">
                  <p style="margin: 0; font-size: 13px; margin-bottom: 5px;">${translate('issueDate')}: ${new Date(invoice.issueDate).toLocaleDateString()}</p>
                  <p style="margin: 0; font-size: 13px;">${translate('dueDate')}: ${new Date(invoice.dueDate).toLocaleDateString()}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Company Info -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; padding: 0 30px;">
        <tr>
          <td style="width: 48%; vertical-align: top; padding-right: 20px;">
            <div style="
              background: #f8fafc; 
              padding: 20px; 
              border-radius: 8px; 
              border-left: 4px solid ${themeColor};
              min-height: 140px;
            ">
              <h3 style="margin: 0 0 15px 0; color: ${themeColor}; font-size: 16px; font-weight: bold;">
                ${translate('from')}:
              </h3>
              <p style="margin: 0 0 8px 0; font-weight: 600; font-size: 16px; color: #1f2937;">${sellerInfo.name}</p>
              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 13px; line-height: 1.4;">${sellerInfo.address.replace(/\n/g, '<br>')}</p>
              <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px;">${sellerInfo.phone}</p>
              <p style="margin: 0; color: #6b7280; font-size: 13px;">${sellerInfo.email}</p>
            </div>
          </td>
          <td style="width: 4%;"></td>
          <td style="width: 48%; vertical-align: top; padding-left: 20px;">
            <div style="
              background: #f8fafc; 
              padding: 20px; 
              border-radius: 8px; 
              border-left: 4px solid ${themeColor};
              min-height: 140px;
            ">
              <h3 style="margin: 0 0 15px 0; color: ${themeColor}; font-size: 16px; font-weight: bold;">
                ${translate('to')}:
              </h3>
              <p style="margin: 0 0 8px 0; font-weight: 600; font-size: 16px; color: #1f2937;">${buyerInfo.name}</p>
              <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 13px; line-height: 1.4;">${buyerInfo.address.replace(/\n/g, '<br>')}</p>
              <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px;">${buyerInfo.phone}</p>
              <p style="margin: 0; color: #6b7280; font-size: 13px;">${buyerInfo.email}</p>
            </div>
          </td>
        </tr>
      </table>      <!-- Items Table -->
      <div style="margin-bottom: 30px; padding: 0 30px;">
        <table style="
          width: 100%; 
          border-collapse: collapse; 
          border: 1px solid #e5e7eb; 
          border-radius: 8px; 
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        ">
          <thead>
            <tr style="background: ${backgroundStyle}; color: white;">
              <th style="padding: 15px; text-align: ${language === 'en' ? 'left' : 'right'}; font-weight: 600; font-size: 14px; border-right: 1px solid rgba(255,255,255,0.2);">${translate('itemDescription')}</th>
              <th style="padding: 15px; text-align: center; font-weight: 600; font-size: 14px; width: 80px; border-right: 1px solid rgba(255,255,255,0.2);">${translate('qty')}</th>
              <th style="padding: 15px; text-align: ${language === 'en' ? 'right' : 'left'}; font-weight: 600; font-size: 14px; width: 100px; border-right: 1px solid rgba(255,255,255,0.2);">${translate('unitPrice')}</th>
              <th style="padding: 15px; text-align: ${language === 'en' ? 'right' : 'left'}; font-weight: 600; font-size: 14px; width: 100px;">${translate('amount')}</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map((item, index) => `
              <tr style="
                border-bottom: 1px solid #f1f5f9; 
                ${index % 2 === 0 ? 'background: #f9fafb;' : 'background: white;'}
              ">
                <td style="padding: 15px; border-right: 1px solid #f1f5f9;">
                  <div style="font-weight: 600; color: #1f2937; font-size: 14px; margin-bottom: 3px;">${item.name}</div>
                  ${item.description ? `<div style="color: #6b7280; font-size: 12px; line-height: 1.3;">${item.description}</div>` : ''}
                </td>
                <td style="padding: 15px; text-align: center; color: #374151; font-size: 14px; border-right: 1px solid #f1f5f9;">${item.quantity}</td>
                <td style="padding: 15px; text-align: ${language === 'en' ? 'right' : 'left'}; color: #374151; font-size: 14px; border-right: 1px solid #f1f5f9;">${formatCurrency(item.unitPrice)}</td>
                <td style="padding: 15px; text-align: ${language === 'en' ? 'right' : 'left'}; font-weight: 600; color: #1f2937; font-size: 14px;">${formatCurrency(item.lineTotal)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      <!-- Totals -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
        <tr>
          <td style="width: 60%;"></td>
          <td style="width: 40%; padding: 0 30px;">
            <div style="
              background: #f8fafc; 
              padding: 20px; 
              border-radius: 8px; 
              border: 1px solid #e5e7eb;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-weight: 500; font-size: 14px;">${translate('subtotal')}:</td>
                  <td style="padding: 8px 0; text-align: ${language === 'en' ? 'right' : 'left'}; font-weight: 600; color: #1f2937; font-size: 14px;">${formatCurrency(invoice.summary.subtotal)}</td>
                </tr>
                ${invoice.summary.discountTotal > 0 ? `
                <tr>
                  <td style="padding: 8px 0; color: #ef4444; font-weight: 500; font-size: 14px;">${translate('discount')}:</td>
                  <td style="padding: 8px 0; text-align: ${language === 'en' ? 'right' : 'left'}; font-weight: 600; color: #ef4444; font-size: 14px;">-${formatCurrency(invoice.summary.discountTotal)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td colspan="2" style="padding: 12px 0 8px 0;">
                    <div style="border-top: 1px solid #d1d5db;"></div>
                  </td>
                </tr>
                <tr style="background: ${backgroundStyle}; color: white;">
                  <td style="padding: 12px 15px; font-weight: bold; font-size: 16px; border-radius: 6px 0 0 6px;">${translate('total')}:</td>
                  <td style="padding: 12px 15px; text-align: ${language === 'en' ? 'right' : 'left'}; font-weight: bold; font-size: 18px; border-radius: 0 6px 6px 0;">${formatCurrency(invoice.summary.grandTotal)}</td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
      
      ${invoice.notes ? `
        <div style="border-top: 1px solid #e5e7eb; padding: 20px 30px 30px 30px;">
          <div style="
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 8px; 
            border-left: 4px solid ${themeColor};
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          ">
            <h4 style="
              margin: 0 0 10px 0; 
              color: ${themeColor}; 
              font-weight: bold; 
              font-size: 16px;
            ">
              ${translate('notes')}:
            </h4>
            <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.5;">${invoice.notes}</p>
          </div>
        </div>
      ` : ''}
    </div>
  `;
};