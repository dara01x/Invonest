// Vite plugin to handle ads.txt redirect for Ezoic
import type { Plugin } from 'vite';

export function ezoicAdsRedirect(): Plugin {
  return {
    name: 'ezoic-ads-redirect',
    configureServer(server) {
      server.middlewares.use('/ads.txt', (req, res) => {
        res.writeHead(301, {
          'Location': 'https://srv.adstxtmanager.com/19390/invonest.me',
          'Content-Type': 'text/plain'
        });
        res.end('Redirecting to Ezoic Ads.txt Manager...');
      });
    },
    generateBundle() {
      // Emit ads.txt redirect file
      this.emitFile({
        type: 'asset',
        fileName: 'ads.txt',
        source: `<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=https://srv.adstxtmanager.com/19390/invonest.me">
    <script>window.location.replace("https://srv.adstxtmanager.com/19390/invonest.me");</script>
</head>
<body>
    <p>Redirecting to <a href="https://srv.adstxtmanager.com/19390/invonest.me">Ezoic Ads.txt Manager</a></p>
</body>
</html>`
      });
    }
  };
}
