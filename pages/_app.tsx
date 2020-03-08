import App, { AppContext } from "next/app";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { configureStore } from "../store/configureStore";
import { Provider } from "react-redux";
import "normalize.css";

interface MyAppProps {
	store: any;
}

class MyApp extends App<MyAppProps> {
	static async getInitialProps({ Component, ctx }: AppContext) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps, store } = this.props;

		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}
}

export default withRedux(configureStore)(withReduxSaga(MyApp));