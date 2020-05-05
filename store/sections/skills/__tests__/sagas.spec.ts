import {
	loadSkillsCategoryIcons,
	initializeSkillsSectionContents,
	updateSkillsSectionContentsOnLanguageChange,
	getAndSetContents
} from "../sagas";
import { expectSaga } from "redux-saga-test-plan";
import { skillsSection } from "..";
import * as match from "redux-saga-test-plan/matchers";
import * as providers from "~/tests/utils/testEffectsProviders";
import { images } from "~/store/images";
import { environmentSelector } from "~/utils/environmentSelector";
import { languageChangeChannel, i18n } from "~/utils/i18next";
import { BoardsContent } from "../models";

describe(loadSkillsCategoryIcons, () => {
	it("should put changeActiveSkillsCategory.success action of selected category is already loaded", () => {
		const action = skillsSection.actions.changeActiveSkillsCategory.request("embedded");

		return expectSaga(loadSkillsCategoryIcons, action)
			.provide([[match.select(skillsSection.selectors.isSelectedBoardLoaded), true]])
			.put(skillsSection.actions.changeActiveSkillsCategory.success("embedded"))
			.run();
	});

	it("should load icons from active category and then put changeActiveSkillsCategory.success action", () => {
		const action = skillsSection.actions.changeActiveSkillsCategory.request("embedded");
		const imagesToLoad = ["https://google.com", "https://youtube.com", "https://facebook.com"];

		return expectSaga(loadSkillsCategoryIcons, action)
			.provide([
				[match.select(skillsSection.selectors.isSelectedBoardLoaded), false],
				[match.select(skillsSection.selectors.selectedBoardImages), imagesToLoad],
				[match.call(images.utils.makeSureAllImagesAreLoaded, imagesToLoad), true]
			])
			.put(skillsSection.actions.changeActiveSkillsCategory.success("embedded"))
			.run();
	});

	it("should put changeActiveSkillsCategory.failed if image loading error is ocurred", () => {
		const action = skillsSection.actions.changeActiveSkillsCategory.request("embedded");
		const imagesToLoad = ["https://google.com", "https://youtube.com", "https://facebook.com"];

		return expectSaga(loadSkillsCategoryIcons, action)
			.provide([
				[match.select(skillsSection.selectors.isSelectedBoardLoaded), false],
				[match.select(skillsSection.selectors.selectedBoardImages), imagesToLoad],
				[match.call(images.utils.makeSureAllImagesAreLoaded, imagesToLoad), false]
			])
			.put(skillsSection.actions.changeActiveSkillsCategory.failed("embedded"))
			.run();
	});
});

describe(initializeSkillsSectionContents, () => {
	it("should initialize skills section contents if running on server", () => {
		return expectSaga(initializeSkillsSectionContents)
			.provide([[match.call(environmentSelector), { browser: false }]])
			.call(environmentSelector)
			.call(getAndSetContents)
			.run();
	});

	it("should spawn updateSkillsSectionContentOnLanguageChange saga if running in browser", () => {
		return expectSaga(initializeSkillsSectionContents)
			.provide([
				[match.call(environmentSelector), { browser: true }],
				[match.spawn(updateSkillsSectionContentsOnLanguageChange), null]
			])
			.call(environmentSelector)
			.spawn(updateSkillsSectionContentsOnLanguageChange)
			.run();
	});
});

describe(updateSkillsSectionContentsOnLanguageChange, () => {
	it("should call getAndSetContents every language change event", () => {
		const languageChangeChannelTakeMock = providers.take(languageChangeChannel).mockedBy(
			jest
				.fn()
				.mockReturnValueOnce("pl")
				.mockReturnValueOnce("en")
				.mockImplementationOnce(() => {
					throw new Error();
				})
		);

		return expectSaga(updateSkillsSectionContentsOnLanguageChange)
			.provide([languageChangeChannelTakeMock])
			.take(languageChangeChannel)
			.call(getAndSetContents)
			.take(languageChangeChannel)
			.call(getAndSetContents)
			.run();
	});
});

describe(getAndSetContents, () => {
	it("should get and put skill board contents from i18n translations", () => {
		const skillsTranslations = {};

		return expectSaga(getAndSetContents)
			.provide([[match.apply(i18n, i18n.t, ["skills:categories"]), skillsTranslations]])
			.put(
				skillsSection.actions.setupBoardsContent(
					(skillsTranslations as unknown) as BoardsContent
				)
			)
			.run();
	});
});
