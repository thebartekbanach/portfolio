import "normalize.css";
import Head from "next/head";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { configureStore } from "~/store/configureStore";
import { Provider } from "react-redux";
import { appWithTranslation } from "~/utils/i18next";
import { GlobalStyles } from "~/utils/styles/globals";
import { Store } from "redux";
import { dispatchAndWaitForResult } from "~/utils/dispatchAndWaitForResult";
import { language } from "~/store/language";
import { channel } from "redux-saga";
import { MyAppContext } from "~/utils/applicationModels";

interface MyAppProps {
	store: Store;
}

export function initializeSagaContext(ctx: MyAppContext["ctx"]) {
	const { i18n } = ctx.req;

	const i18nLanguageChangeChannel = channel<string>();
	i18n.on("languageChanged", i18nLanguageChangeChannel.put);

	return {
		i18n,
		i18nLanguageChangeChannel
	};
}

async function bootstrapApplication(ctx: MyAppContext["ctx"]) {
	if (ctx.isServer) {
		if (!ctx.req.language) {
			ctx.req.language = "en";
		}

		await dispatchAndWaitForResult(
			ctx.store,
			language.actions.setupLanguageOnServerSide(ctx.req.language || "en"),
			state => language.selectors.currentLanguage(state) === ctx.req.language
		);
	}
}

class MyApp extends App<MyAppProps> {
	static async getInitialProps({ Component, ctx }: MyAppContext) {
		let pageProps = {};

		const sagaContext = initializeSagaContext(ctx);
		ctx.store.sagaTask.setContext(sagaContext);
		await bootstrapApplication(ctx);

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
					<meta name="theme-color" content="#694fff" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="#694fff" />
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
