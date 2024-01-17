import { SpeedInsights } from "@vercel/speed-insights/next"
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head />
      <meta name="description" content="Seu sistema para integração com a API do WhatsApp para mensagens automáticas." />
      <meta name="keywords" content="API do WhatsApp, Mensagens automáticas, Integração WhatsApp" />
      <meta name="author" content="Rafael Rizzo Breschi" />

      <title>Chama lá!</title>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
