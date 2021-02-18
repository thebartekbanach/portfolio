import { FC, useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import { LanguageSwitch } from "./languageSwitch";
import { Navbar } from "./navbar";

interface PageContainerProps {
	useOverflowHidden?: boolean;
}

const StyledPageContainer = styled.main<PageContainerProps>`
	position: relative;
	margin: 0 auto;
	${p => (p.useOverflowHidden ? "overflow: hidden;" : null)};

	transition: opacity 200ms, transform 200ms;
	opacity: 0;
	transform: translateY(20px);

	&.enter-active,
	&.enter-done {
		opacity: 1;
		transform: translateY(0px);
	}

	&.enter,
	&.exit-active,
	&.exit {
		opacity: 0;
		transform: translateY(20px);
	}
`;

export const PageContainer: FC<PageContainerProps> = ({ children, useOverflowHidden }) => {
	const [isPageHidden, setIsPageHidden] = useState(false);
	const animationEndListenerRef = useRef(null as null | (() => void));

	const hidePage = useCallback(() => {
		return new Promise<void>(resolve => {
			animationEndListenerRef.current = resolve;
			setIsPageHidden(true);
		});
	}, []);

	const showPage = useCallback(() => {
		return new Promise<void>(resolve => {
			animationEndListenerRef.current = resolve;
			setIsPageHidden(false);
		});
	}, []);

	const animationEndListener = useCallback(() => {
		if (animationEndListenerRef.current !== null) {
			animationEndListenerRef.current();
			animationEndListenerRef.current = null;
		}
	}, []);

	return (
		<>
			<CSSTransition
				in={isPageHidden}
				timeout={200}
				onEntered={animationEndListener}
				onExited={animationEndListener}
			>
				<StyledPageContainer useOverflowHidden={useOverflowHidden}>
					<Navbar />
					{children}
				</StyledPageContainer>
			</CSSTransition>
			<LanguageSwitch hidePage={hidePage} showPage={showPage} />
		</>
	);
};
