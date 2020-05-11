import { AppContext } from "next/app";
import { NextPageContext } from "next";
import { IncomingMessage } from "http";
import { Store } from "redux";
import { State } from "~/store";
import { Task } from "redux-saga";
import { I18n } from "next-i18next";
import { initializeSagaContext } from "~/pages/_app";

export interface MyAppContext extends AppContext {
	ctx: NextPageContext & {
		req: IncomingMessage & { language?: string; i18n: I18n };
		store: Store<State> & { sagaTask: Task };
	};
}

export type RootContext = ReturnType<typeof initializeSagaContext>;
