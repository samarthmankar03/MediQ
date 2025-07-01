
import './globals.css';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata = {
  title: 'Mediq App',
  description: 'Smart medical queue management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <main>
          <SessionProviderWrapper>
            <Header />
              {children}
          </SessionProviderWrapper>
        </main>
        <Toaster /> 
      </body>
    </html>
  );
}
