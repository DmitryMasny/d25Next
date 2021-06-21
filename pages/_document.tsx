import Document, { DocumentContext } from 'next/document'

import { ServerStyleSheet } from 'styled-components';

// TODO
export default class MyDocument extends Document {
    static async getInitialProps ( ctx:DocumentContext ) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage( {
                    enhanceApp: ( App ) => ( props ) =>
                        sheet.collectStyles( <App { ...props } /> ),
                } );

            const initialProps = await Document.getInitialProps( ctx );
            return {
                ...initialProps,
                styles: (
                    <>
                        { initialProps.styles }
                        { sheet.getStyleElement() }
                    </>
            // <Html>
            //     <Head>
            //         <link href="/fonts/style.css" rel="stylesheet"/>
            //     </Head>
            //
            //     <body>
            //     <Main/>
            //     <NextScript/>
            //     </body>
            // </Html>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
}