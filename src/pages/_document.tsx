import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Main,
	NextScript,
	Html
} from "next/document";
import { collectStyles } from "~/utils/collectStyles";

interface MyDocumentProps extends DocumentInitialProps {
	styles: React.Component;
}

export default class MyDocument extends Document<MyDocumentProps> {
	static async getInitialProps(ctx: DocumentContext) {
		return await collectStyles(ctx);
	}

	render() {
		return (
			<Html>
				<Head>{this.props.styles}</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
