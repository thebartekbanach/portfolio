import {
	loadSkillsCategoryIcons,
	initializeSkillsSectionContents,
	updateSkillsSectionContentsOnLanguageChange,
	getAndSetContents,
	getAndParseSkillsContents
} from "../sagas";
import { expectSaga } from "redux-saga-test-plan";
import { skills } from "..";
import * as match from "redux-saga-test-plan/matchers";
import * as providers from "~/tests/utils/testEffectsProviders";
import { images } from "~/store/images";
import { environmentSelector } from "~/utils/environmentSelector";
import { BoardsContent } from "../models";
import { createMock } from "ts-auto-mock";
import { I18n } from "next-i18next";

describe(loadSkillsCategoryIcons, () => {
	it("should put changeActiveSkillsCategory.success action of selected category is already loaded", () => {
		const action = skills.actions.changeActiveSkillsCategory.request("embedded");

		return expectSaga(loadSkillsCategoryIcons, action)
			.provide([[match.select(skills.selectors.isSelectedBoardLoaded), true]])
			.put(skills.actions.changeActiveSkillsCategory.success("embedded"))
			.run();
	});

	it("should load icons from active category and then put changeActiveSkillsCategory.success action", () => {
		const action = skills.actions.changeActiveSkillsCategory.request("embedded");
		const imagesToLoad = ["https://google.com", "https://youtube.com", "https://facebook.com"];

		return expectSaga(loadSkillsCategoryIcons, action)
			.provide([
				[match.select(skills.selectors.isSelectedBoardLoaded), false],
				[match.select(skills.selectors.selectedBoardImages), imagesToLoad],
				[match.call(images.utils.makeSureAllImagesAreLoaded, imagesToLoad), true]
			])
			.put(skills.actions.changeActiveSkillsCategory.success("embedded"))
			.run();
	});

	it("should put changeActiveSkillsCategory.failed if image loading error is ocurred", () => {
		const action = skills.actions.changeActiveSkillsCategory.request("embedded");
		const imagesToLoad = ["https://google.com", "https://youtube.com", "https://facebook.com"];

		return expectSaga(loadSkillsCategoryIcons, action)
			.provide([
				[match.select(skills.selectors.isSelectedBoardLoaded), false],
				[match.select(skills.selectors.selectedBoardImages), imagesToLoad],
				[match.call(images.utils.makeSureAllImagesAreLoaded, imagesToLoad), false]
			])
			.put(skills.actions.changeActiveSkillsCategory.failed("embedded"))
			.run();
	});
});

describe(initializeSkillsSectionContents, () => {
	it("should initialize skills section contents if running on server", () => {
		return expectSaga(initializeSkillsSectionContents)
			.provide([
				[match.call(environmentSelector), { browser: false }],
				[match.call(getAndSetContents), undefined]
			])
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
		const languageChangeChannelMock = jest
			.fn()
			.mockReturnValueOnce("pl")
			.mockReturnValueOnce("en")
			.mockImplementationOnce(() => {
				throw new Error("saga cancelled");
			});

		return expectSaga(updateSkillsSectionContentsOnLanguageChange)
			.provide([
				providers.take(languageChangeChannelMock).mockedBy(languageChangeChannelMock),
				[match.getContext("i18nLanguageChangeChannel"), languageChangeChannelMock],
				[match.call(getAndSetContents), undefined],
				[match.cancelled(), true]
			])
			.take(languageChangeChannelMock)
			.call(getAndSetContents)
			.take(languageChangeChannelMock)
			.call(getAndSetContents)
			.run();
	});
});

describe(getAndSetContents, () => {
	it("should get and put skill board contents from i18n translations", () => {
		const i18nMock = createMock<I18n>();
		const categories = ["frontend", "backend", "embedded"];
		const contents = createMock<BoardsContent>();

		return expectSaga(getAndSetContents)
			.provide([
				[match.getContext("i18n"), i18nMock],
				[match.call(getAndParseSkillsContents, i18nMock, categories), contents]
			])
			.call(getAndParseSkillsContents, i18nMock, categories)
			.put(skills.actions.setupBoardsContent(contents))
			.run();
	});
});
