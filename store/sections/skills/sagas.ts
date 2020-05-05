import { takeLatest, select, call, put, take, spawn } from "~/utils/sagaEffects";
import { skillsSection } from ".";
import { images } from "~/store/images";
import i18nextInstance, {
	i18n,
	languageChangeChannel,
	getObjectFromTranslations
} from "~/utils/i18next";
import { BoardsContent } from "./models";
import { environmentSelector } from "~/utils/environmentSelector";

type ChangeActiveSkillsCategoryAction = ReturnType<
	typeof skillsSection.actions.changeActiveSkillsCategory.request
>;

export function* loadSkillsCategoryIcons(action: ChangeActiveSkillsCategoryAction) {
	console.log("i am selecting");
	const isSelectedCategoryLoaded = yield* select(skillsSection.selectors.isSelectedBoardLoaded);
	console.log("isSelectedCategoryLoaded: " + isSelectedCategoryLoaded);

	if (isSelectedCategoryLoaded) {
		return yield* put(
			skillsSection.actions.changeActiveSkillsCategory.success(action.payload.to)
		);
	}

	console.log("pre icons");
	const selectedBoardItemIcons = yield* select(skillsSection.selectors.selectedBoardImages);
	console.log("icons: " + JSON.stringify(selectedBoardItemIcons));
	const successfullyLoadedAllIcons = yield* call(
		images.utils.makeSureAllImagesAreLoaded,
		selectedBoardItemIcons
	);

	if (!successfullyLoadedAllIcons) {
		return yield* put(
			skillsSection.actions.changeActiveSkillsCategory.failed(action.payload.to)
		);
	}

	return yield* put(skillsSection.actions.changeActiveSkillsCategory.success(action.payload.to));
}

export function* getAndSetContents() {
	const contents = yield call(getObjectFromTranslations, "skills:categories");
	console.log(contents);
	console.log(i18n.language);
	console.log(i18n.t("skills:sectionTitle", { returnObjects: true }));
	console.log(i18n.isInitialized);
	i18n.getResource(i18n.language, "skills", "categories");

	return yield* put(
		skillsSection.actions.setupBoardsContent((contents as unknown) as BoardsContent)
	);
}

export function* updateSkillsSectionContentsOnLanguageChange() {
	try {
		while (true) {
			yield* take(languageChangeChannel);
			yield* call(getAndSetContents);
		}
		// eslint-disable-next-line no-empty
	} catch (_) {}
}

export function* initializeSkillsSectionContents() {
	const { browser } = yield* call(environmentSelector);

	if (!browser) {
		console.log("LOADING CONTENTS ON SERVER");
		yield* call(getAndSetContents);
	} else {
		yield* spawn(updateSkillsSectionContentsOnLanguageChange);
	}
}

export default function* skillsWatchSaga() {
	yield initializeSkillsSectionContents();

	yield* takeLatest(
		skillsSection.actions.changeActiveSkillsCategory.request,
		loadSkillsCategoryIcons
	);
}
