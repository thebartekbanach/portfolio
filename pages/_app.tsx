import "normalize.css";
import Head from "next/head";
import App, { AppContext } from "next/app";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { configureStore } from "~/store/configureStore";
import { Provider } from "react-redux";
import { appWithTranslation } from "~/utils/i18next";
import { GlobalStyles } from "~/utils/styles/globals";
import { Store } from "redux";

interface MyAppProps {
	store: Store;
}

class MyApp extends App<MyAppProps> {
	static async getInitialProps({ Component, ctx }: AppContext) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return {
			pageProps
		};
	}

	render() {
		const { Component, pageProps, store } = this.props;

		return (
			<>
				<Head>
					<title key="title">Bartek Banach - portfolio</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
						key="viewport"
					/>
				</Head>
				<GlobalStyles />
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</>
		);
	}
}

export default withRedux(configureStore)(withReduxSaga(appWithTranslation(MyApp)));
