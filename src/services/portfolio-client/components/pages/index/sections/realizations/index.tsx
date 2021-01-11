import useIsInViewport from "use-is-in-viewport";

import { SectionHeader } from "~/components/shared/sectionHeader";
import { useLazyLoadChain } from "~/hooks/useLazyLoadChain";
import { useTranslation } from "~/utils/i18next";

import BackgroundWave from "~/public/assets/pages/index/realizations/background/wave.svg";

import { Realization } from "./realization";
import {
	RealizationsList,
	RealizationsSectionElement,
	RealizationsSectionBackground
} from "./styles";
import { ProjectInfo } from "./types";

export const RealizationsSection = () => {
	const [t] = useTranslation("indexPage");

	const [isSectionInViewport, sectionRef] = useIsInViewport();
	const [nextDelegate] = useLazyLoadChain({
		isLoadingEnabled: isSectionInViewport || false
	});

	const projectInfos = t<ProjectInfo[]>("realizations.projects", { returnObjects: true });
	const renderedProjects = projectInfos.map((project, index) => (
		<Realization
			key={index}
			previewImageUrl={project.previewImageUrl}
			previewImageLoadDelegate={nextDelegate()}
			name={project.name}
			description={project.description}
			detailsUrl={t("realizations.projectUrlSchema", { id: project.id })}
			previewType={project.previewType}
			previewUrl={project.previewUrl}
		/>
	));

	return (
		<RealizationsSectionElement ref={sectionRef} id={t("realizations.sectionId")}>
			<RealizationsSectionBackground>
				<BackgroundWave />
			</RealizationsSectionBackground>
			<SectionHeader
				sectionName={t("realizations.sectionName")}
				description={t("realizations.sectionDescription")}
			/>
			<RealizationsList>{renderedProjects}</RealizationsList>
		</RealizationsSectionElement>
	);
};
