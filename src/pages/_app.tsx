import "normalize.css";

import "~/public/fonts/montserrat/bold/include.css";
import "~/public/fonts/montserrat/extra-bold/include.css";
import "~/public/fonts/nunito-sans/regular/include.css";
import "~/public/fonts/nunito-sans/semi-bold/include.css";
import "~/public/fonts/nunito-sans/bold/include.css";
import "~/public/fonts/nunito-sans/extra-bold/include.css";
import "~/public/fonts/roboto/regular/include.css";
import "~/public/fonts/roboto/medium/include.css";
import "~/public/fonts/roboto/bold/include.css";

import App from "next/app";

import { appWithTranslation } from "~/utils/i18next";

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Component {...pageProps} />
			</>
		);
	}
}

export default appWithTranslation(MyApp);
