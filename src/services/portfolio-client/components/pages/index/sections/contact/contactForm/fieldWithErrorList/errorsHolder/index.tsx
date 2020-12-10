import React, { FC } from "react";

import { ListWithAnimatedHeight } from "~/components/shared/listWithAnimatedHeight";

import { ErrorList } from "./styles";

interface ErrorsHolderProps {
	errorMessages: string[];
}

export const ErrorsHolder: FC<ErrorsHolderProps> = ({ errorMessages }) => {
	const renderedMessages = errorMessages.map(message => <span key={message}>{message}</span>);

	return (
		<ListWithAnimatedHeight component={ErrorList}>{renderedMessages}</ListWithAnimatedHeight>
	);
};
