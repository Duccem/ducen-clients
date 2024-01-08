import '@fontsource/nunito';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Metadata } from 'next';
import { DucenProvider } from '../modules/shared/common/DucenProvider';
import { IndexProtect } from './_shared/components/IndexProtect';
import { RouteGuard } from './_shared/components/RouteGuard';
import './global.css';
config.autoAddCss = false;

export const metadata: Metadata = {
  icons: {
    icon: '/images/seguridad.png',
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <IndexProtect>
          <RouteGuard>
            <DucenProvider configurations={{
              baseUrl: process.env.BACKEND_URL,
              countriesUrl: process.env.COUNTRIES_URL,
              citiesUrl: process.env.CITIES_URL,
            }}>
              {children}
            </DucenProvider>
          </RouteGuard>
        </IndexProtect>
      </body>
    </html>
  );
}
