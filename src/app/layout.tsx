import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Md Kaioum Islam - Portfolio OS',
  description: 'Interactive portfolio OS',
};

export default function OSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
   * NOTE: This layout is served inside a CSS3D iframe by MonitorScreen.ts.
   * It must NOT render a nested <html>/<body> — Next.js App Router handles
   * the outer shell via the root src/app/layout.tsx. We only inject the
   * font variables and base styles onto the children wrapper.
   */
  return (
    <div
      className={`${inter.variable} ${jetBrainsMono.variable} ${inter.className}`}
      style={{
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0f1e',
        fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}
