import React, { FC, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import useIsInViewport from "use-is-in-viewport";

import { useTranslation } from "~/utils/i18next";

import GithubIcon from "~/public/assets/pages/index/github/github-logo.svg";

import {
	GithubInfoBackground,
	GithubInfoContent,
	GithubInfoDescription,
	GithubInfoDetailsButton,
	GithubInfoIconWrapper,
	GithubInfoTitle,
	GithubSectionElement
} from "./styles";

const particlesBackgroundOptions = {
	fpsLimit: 60,
	particles: {
		color: {
			value: ["#0ed145", "#ec1c24", "#b83dba", "#00a8f3"]
		},
		move: {
			direction: "none",
			enable: true,
			random: false,
			straight: false,
			speed: 1.5
		},
		number: {
			density: {
				enable: true,
				value_area: 800
			},
			value: 80
		},
		opacity: {
			value: 1
		},
		shape: {
			type: "circle"
		},
		size: {
			value: 1
		}
	},
	detectRetina: true
};

export const GithubSection: FC = () => {
	const [t] = useTranslation("pages.index");

	const [isGithubSectionInViewport, githubSectionRef] = useIsInViewport();
	const [isParticlesBackgroundVisible, setIsParticlesBackgroundVisible] = useState(false);
	const [isParticlesBackgroundRendered, setIsParticlesBackgroundRendered] = useState(false);

	useEffect(() => {
		if (isGithubSectionInViewport && !isParticlesBackgroundVisible) {
			setIsParticlesBackgroundRendered(true);
		}
	}, [isGithubSectionInViewport, isParticlesBackgroundVisible]);

	useEffect(() => {
		if (isGithubSectionInViewport && isParticlesBackgroundRendered) {
			setIsParticlesBackgroundVisible(true);
			return;
		}

		if (!isGithubSectionInViewport && isParticlesBackgroundRendered) {
			setIsParticlesBackgroundVisible(false);
			setIsParticlesBackgroundRendered(false);
		}
	}, [isGithubSectionInViewport, isParticlesBackgroundRendered]);

	const particlesBackgroundCanvas = !isParticlesBackgroundRendered ? null : (
		<Particles id="github-particles-background" options={particlesBackgroundOptions} />
	);

	return (
		<GithubSectionElement ref={githubSectionRef} id={t("github.sectionId")}>
			<GithubInfoBackground isVisible={isParticlesBackgroundVisible}>
				{particlesBackgroundCanvas}
			</GithubInfoBackground>
			<GithubInfoContent>
				<GithubInfoIconWrapper>
					<GithubIcon />
				</GithubInfoIconWrapper>
				<GithubInfoTitle>{t("github.header")}</GithubInfoTitle>
				<GithubInfoDescription
					dangerouslySetInnerHTML={{ __html: t("github.haveALookAtMyGithub") }}
				/>
				<GithubInfoDetailsButton href={t("common:socials.github")} target="_blank">
					{t("github.githubLinkButtonText")}
				</GithubInfoDetailsButton>
			</GithubInfoContent>
		</GithubSectionElement>
	);
};
