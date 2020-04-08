import { createActionCreator } from "deox";

export const toggleMenuState = createActionCreator("navbar/toggleMenuState");
export const internal = {
	setMenuState: createActionCreator(
		"navbar/internal/setMenuState",
		resolve => (nextMenuState: boolean) => resolve({ nextMenuState })
	)
};
