import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Main,
	NextScript
} from "next/document";
import { ServerStyleSheet } from "styled-components";

interface MyDocumentProps extends DocumentInitialProps {
	styles: React.Component;
}

export default class MyDocument extends Document<MyDocumentProps> {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<html>
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicon/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon/favicon-16x16.png"
					/>
					{this.props.styles}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
