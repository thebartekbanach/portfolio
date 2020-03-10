import { Store } from "..";

export const runningEnvironmentSelector = (store: Store) =>
	store.environment.runningInBrowser ? "browser" : "server";

export const isRunningInBrowserSelector = (store: Store) => store.environment.runningInBrowser;

export const isRunningOnServerSelector = (store: Store) => !store.environment.runningInBrowser;
