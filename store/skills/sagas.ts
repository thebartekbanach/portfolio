import {
	takeLatest,
	takeEvery,
	select,
	call,
	put,
	take,
	spawn,
	getFromRootContext,
	cancelled
} from "~/utils/sagaEffects";
import { skills } from ".";
import { images } from "~/store/images";
import { getObjectFromTranslations } from "~/utils/i18next";
import { BoardsContent, CategoryName, BoardCategory } from "./models";
import { environmentSelector } from "~/utils/environmentSelector";
import { I18n } from "next-i18next";

type ChangeActiveSkillsCategoryAction = ReturnType<
	typeof skills.actions.changeActiveSkillsCategory.request
>;

export function* loadSkillsCategoryIcons(action: ChangeActiveSkillsCategoryAction) {
	const isSelectedCategoryLoaded = yield* select(skills.selectors.isSelectedBoardLoaded);

	if (isSelectedCategoryLoaded) {
		return yield* put(skills.actions.changeActiveSkillsCategory.success(action.payload.to));
	}

	const selectedBoardItemIcons = yield* select(skills.selectors.selectedBoardImages);
	const successfullyLoadedAllIcons = yield* call(
		images.utils.makeSureAllImagesAreLoaded,
		selectedBoardItemIcons
	);

	if (!successfullyLoadedAllIcons) {
		return yield* put(skills.actions.changeActiveSkillsCategory.failed(action.payload.to));
	}

	return yield* put(skills.actions.changeActiveSkillsCategory.success(action.payload.to));
}

export function getAndParseSkillsContents(i18n: I18n, categories: CategoryName[]): BoardsContent {
	const contents = categories
		.map(category => ({
			[category]: getObjectFromTranslations<BoardCategory[]>(
				i18n,
				`skills:categories:${category}:content`
			)
		}))
		.reduce((prev, curr) => ({ ...prev, ...curr }));

	return contents as BoardsContent;
}

export function* getAndSetContents() {
	const i18n = yield* getFromRootContext("i18n");
	const categories: CategoryName[] = ["frontend", "backend", "embedded"];

	const contents = yield* call(getAndParseSkillsContents, i18n, categories);

	return yield* put(skills.actions.setupBoardsContent(contents));
}

export function* updateSkillsSectionContentsOnLanguageChange() {
	try {
		const languageChangeChannel = yield* getFromRootContext("i18nLanguageChangeChannel");

		while (true) {
			yield* take(languageChangeChannel);
			yield* call(getAndSetContents);
		}
	} catch (e) {
		const wasCancelled = yield* cancelled();

		if (!wasCancelled) {
			throw e;
		}
	}
}

export function* initializeSkillsSectionContents() {
	const { browser } = yield* call(environmentSelector);

	if (!browser) {
		yield* call(getAndSetContents);
	} else {
		yield* spawn(updateSkillsSectionContentsOnLanguageChange);
	}
}

export function* skillsWatchSaga() {
	yield* takeEvery(skills.actions.setupSkillsSection.type, initializeSkillsSectionContents);
	yield* takeLatest(skills.actions.changeActiveSkillsCategory.request, loadSkillsCategoryIcons);
}
