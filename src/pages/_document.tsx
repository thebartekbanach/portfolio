import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Main,
	NextScript,
	Html
} from "next/document";
import { PageHead } from "~/components/layout/head";
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
				<Head>
					<PageHead />
					{this.props.styles}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
