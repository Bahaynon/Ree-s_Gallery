import './globals.css';

export const metadata = {
  title: "Ree's Lover — A Little Moment, Kept Forever",
  description: 'An interactive portrait of two little companions, told in light, texture, and pixels.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
