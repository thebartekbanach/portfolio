import { RootContext } from "./applicationModels";
import { getContext } from "~/utils/sagaEffects";
import { GetContextEffect } from "redux-saga/effects";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StringProps<T> = { [K in keyof T]: K }[keyof T];

export function getFromRootContext<T extends StringProps<RootContext>>(
	prop: T
): Generator<GetContextEffect, RootContext[T], unknown> {
	return getContext<RootContext[T]>(prop);
}
