import '@/index.css'

export const metadata = {
  title: 'Testimonial Widget',
  description: 'Testimonial widget',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <script src="https://unpkg.com/iframe-resizer@4.3.1/js/iframeResizer.contentWindow.min.js"></script>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        {children}
      </body>
    </html>
  )
} 