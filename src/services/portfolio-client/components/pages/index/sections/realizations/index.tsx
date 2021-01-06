import useIsInViewport from "use-is-in-viewport";

import { SectionHeader } from "~/components/shared/sectionHeader";
import { useLazyLoadChain } from "~/hooks/useLazyLoadChain";

import BackgroundWave from "~/public/assets/pages/index/realizations/background/wave.svg";

import { Realization } from "./realization";
import {
	RealizationsList,
	RealizationsSectionElement,
	RealizationsSectionBackground
} from "./styles";

export const RealizationsSection = () => {
	const [isSectionInViewport, sectionRef] = useIsInViewport();
	const [nextDelegate] = useLazyLoadChain({
		isLoadingEnabled: isSectionInViewport || false
	});

	return (
		<RealizationsSectionElement
			ref={sectionRef}
			id="realizacje"
			data-smooth-scroll-offset={100}
		>
			<RealizationsSectionBackground>
				<BackgroundWave />
			</RealizationsSectionBackground>
			<SectionHeader
				sectionName="Realizacje"
				description="W każdy projekt wkładam mnóstwo serca <br />aby działał i wyglądał jak najlepiej"
			/>
			<RealizationsList>
				<Realization
					previewImageUrl="/assets/pages/index/realizations/works/majkel-music.png"
					previewImageLoadDelegate={nextDelegate()}
					name="Majkel Music"
					description="Strona zawiera czytelny CMS za pomocą którego można edytować całą treść zawartą na stronie internetowej. Skrypty napisane w Javascripcie dodają stronie dynamizmu."
					detailsUrl="#"
					previewUrl="#"
					previewType="preview"
				/>
				<Realization
					previewImageUrl="/assets/pages/index/realizations/works/dom-u-kasi.png"
					previewImageLoadDelegate={nextDelegate()}
					name="Dom u Kasi"
					description="Strona interntowa domu letniskowego do wynajęcia. Responsywna oraz dynamiczna, wykonana przy pomocy React, MobX i NextJS. Strona ładuje się szybko nawet przy wolnym łączu dzięki opóźnionemu ładowaniu wszystkich obrazków."
					detailsUrl="#"
					previewUrl="#"
					previewType="preview"
				/>
				<Realization
					previewImageUrl="/assets/pages/index/realizations/works/hkp-project.png"
					previewImageLoadDelegate={nextDelegate()}
					name="HKP Project"
					description="Witryna stworzona dla firmy zajmującej się haftem komputerowym. Prosta oraz czytelna, w pełni responsywna. Gulp.js pozwala na wygodniejszą edycję treści i wglądu na żywo."
					detailsUrl="#"
					previewUrl="#"
					previewType="preview"
				/>
				<Realization
					previewImageUrl="/assets/pages/index/realizations/works/aquaristic-controller.png"
					previewImageLoadDelegate={nextDelegate()}
					name="Aquaristic Controller"
					description="Kontroler akwarystyczny napisany na płytkę Arduino Due. Pozwala na półautomatyczną podmianę wody, automatycznie uzupełnia wodę w akwarium i steruje czasowo urządzeniami takimi jak oświetlenie, napowietrzanie lub cokolwiek innego."
					detailsUrl="#"
					previewUrl="#"
					previewType="github"
				/>
			</RealizationsList>
		</RealizationsSectionElement>
	);
};
