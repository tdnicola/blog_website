import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const meta = {
      title: 'Tony Nicola',
      description: 'Tony Nicola portfolio and blog site.',
      image:
        'https://assets.vercel.com/image/upload/q_auto/front/vercel/dps.png',
      content: 'Tony Nicola, python, developer, javascript, SQL, Data Analyst, Web developer, Portfolio, Remote, Automation'
    }

    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
          <meta property="og:content" content={meta.content} />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
