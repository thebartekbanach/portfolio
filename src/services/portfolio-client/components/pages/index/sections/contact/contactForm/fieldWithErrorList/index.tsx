import { FC } from "react";

import { ErrorsHolder } from "./errorsHolder";

interface FieldWithErrorListProps {
	fieldErrors: string[];
}

export const FieldWithErrorList: FC<FieldWithErrorListProps> = ({ children, fieldErrors }) => {
	return (
		<div>
			{children}
			<ErrorsHolder errorMessages={fieldErrors} />
		</div>
	);
};
