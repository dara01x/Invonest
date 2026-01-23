/**
 * Ezoic Ads Vite Plugin
 * 
 * This plugin automatically injects Ezoic ad placeholders during build
 * and ensures proper loading of Ezoic scripts
 */

import type { Plugin } from 'vite';

export interface EzoicPluginOptions {
  /**
   * Enable or disable the plugin
   * @default true
   */
  enabled?: boolean;

  /**
   * Ezoic site ID (provided by Ezoic after approval)
   * @default undefined
   */
  siteId?: string;

  /**
   * Whether to inject ad placeholders automatically
   * @default false
   */
  autoInject?: boolean;

  /**
   * Script loading strategy
   * @default 'async'
   */
  scriptLoading?: 'async' | 'defer' | 'blocking';
}

export function ezoicAdsPlugin(options: EzoicPluginOptions = {}): Plugin {
  const {
    enabled = true,
    siteId,
    autoInject = false,
    scriptLoading = 'async',
  } = options;

  return {
    name: 'vite-plugin-ezoic-ads',

    enforce: 'post',

    config(config, { command }) {
      if (!enabled) {
        console.log('[Ezoic Plugin] Disabled');
        return;
      }

      console.log('[Ezoic Plugin] Initializing...');
      
      // Add Ezoic script to the build if siteId is provided
      if (siteId && command === 'build') {
        console.log(`[Ezoic Plugin] Configured for site ID: ${siteId}`);
      }
    },

    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!enabled) {
          return html;
        }

        // Additional transformations for production builds
        if (ctx.bundle) {
          console.log('[Ezoic Plugin] Processing production build');
        }

        // Inject Ezoic script placeholder comment
        // After Ezoic approval, replace this with actual Ezoic integration code
        const ezoicComment = `<!-- Ezoic Integration will be added here after approval -->
    <!-- Site ID: ${siteId || 'Pending approval'} -->
    <!-- Note: Ezoic will automatically inject their script upon integration -->`;

        // Inject before closing </head> tag
        html = html.replace(
          '</head>',
          `  ${ezoicComment}\n  </head>`
        );

        // If autoInject is enabled, add ad placeholder divs
        if (autoInject) {
          const adPlaceholders = `
    <!-- Ezoic Ad Placeholders -->
    <div id="ezoic-pub-ad-placeholder-101" class="ezoic-ad ezoic-ad-top"></div>
    `;

          // Inject after opening <body> tag
          html = html.replace(
            '<body>',
            `<body>\n    ${adPlaceholders}`
          );
        }

        return html;
      }
    },

    generateBundle(options, bundle) {
      if (!enabled) {
        return;
      }

      // Log bundle generation for debugging
      console.log('[Ezoic Plugin] Bundle generated');

      // You can add custom bundle processing here if needed
      // For example, adding Ezoic-specific meta tags or configurations
    },

    buildEnd() {
      if (enabled) {
        console.log('[Ezoic Plugin] Build completed');
        if (!siteId) {
          console.warn('[Ezoic Plugin] Warning: No site ID configured. Add your Ezoic site ID after approval.');
        }
      }
    },
  };
}

/**
 * Helper function to generate Ezoic placeholder HTML
 */
export function generateEzoicPlaceholder(
  id: string,
  className: string = 'ezoic-ad'
): string {
  return `<div id="${id}" class="${className}" data-ezoic-ad="true"></div>`;
}

/**
 * Helper to create multiple placeholders
 */
export function generateEzoicPlaceholders(count: number = 4): string {
  const placeholders: string[] = [];
  for (let i = 1; i <= count; i++) {
    const id = `ezoic-pub-ad-placeholder-${100 + i}`;
    placeholders.push(generateEzoicPlaceholder(id));
  }
  return placeholders.join('\n    ');
}

/**
 * Ezoic script tag generator
 * Use this after getting approval from Ezoic
 */
export function generateEzoicScript(siteId: string, scriptLoading: 'async' | 'defer' | 'blocking' = 'async'): string {
  // Note: Replace with actual Ezoic script URL after approval
  return `<script ${scriptLoading} data-ezoic="1">
    // Ezoic script will be provided by Ezoic after approval
    // This is a placeholder
    console.log('Ezoic integration: Site ${siteId}');
  </script>`;
}

// Default export
export default ezoicAdsPlugin;
