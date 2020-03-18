import { Store } from "..";

export const runningEnvironment = (store: Store) =>
	store.environment.runningInBrowser ? "browser" : "server";

export const isRunningInBrowser = (store: Store) => store.environment.runningInBrowser;

export const isRunningOnServer = (store: Store) => !store.environment.runningInBrowser;
