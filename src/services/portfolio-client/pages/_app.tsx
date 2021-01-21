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

import { AppProps } from "next/app";
import { FC, useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { appWithTranslation } from "~/utils/i18next";
import { scrollToElement } from "~/utils/scrollToElement";

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
	const [isPageFadedIn, setIsPageFadedIn] = useState(false);

	useEffect(() => setIsPageFadedIn(true), []);

	console.log(isPageFadedIn);

	const [pagePath, sectionId] = router.asPath.split("#");

	const scrollToTopOrToElementWhenPageIsInvisible = () => {
		if (sectionId !== undefined) {
			const section = document.getElementById(sectionId);

			if (section === null) {
				return;
			}

			scrollToElement(section);
			return;
		}

		window.scrollTo({ top: 0, left: 0 });
	};

	return (
		<CSSTransition in={isPageFadedIn} timeout={300}>
			<SwitchTransition mode="out-in">
				<CSSTransition
					key={pagePath}
					timeout={300}
					onEnter={scrollToTopOrToElementWhenPageIsInvisible}
				>
					<Component {...pageProps} />
				</CSSTransition>
			</SwitchTransition>
		</CSSTransition>
	);
};

export default appWithTranslation(MyApp);
