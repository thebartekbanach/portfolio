import { FC, useState } from "react";
import AnimateHeight from "react-animate-height";

import { ReplacementContainer } from "~/components/shared/replacementContainer";

import {
	AvailableElementsItem,
	AvailableElementsList,
	AvailableElementsWrapper,
	CurrentElement,
	MessageSubjectSelectorElement,
	StateArrow
} from "./styles";

const renderElementsList = (
	items: string[],
	translateItem: (id: string) => string,
	selectedItem: string | null,
	onItemSelect: (elementID: string) => void
) =>
	items
		.filter(item => item !== selectedItem)
		.map(item => (
			<AvailableElementsItem key={item} onClick={() => onItemSelect(item)}>
				{translateItem(item)}
			</AvailableElementsItem>
		));

interface MessageSubjectSelectorProps {
	placeholder: string;
	items: string[];
	translateItem: (id: string) => string;
	selectedItem: string | null;
	onSelect: (itemID: string) => void;
	showNotSelectedError: boolean;
}

export const MessageSubjectSelector: FC<MessageSubjectSelectorProps> = ({
	placeholder,
	items,
	translateItem,
	selectedItem,
	onSelect,
	showNotSelectedError
}) => {
	const onItemSelect = (elementId: string) => {
		setIsOpen(false);
		onSelect(elementId);
	};

	const [isOpen, setIsOpen] = useState(false);
	const [currentElementsList, setCurrentElementsList] = useState(() =>
		renderElementsList(items, translateItem, selectedItem, onItemSelect)
	);

	const currentElement = selectedItem === null ? placeholder : translateItem(selectedItem);

	const onAnimationEnd = (props: { newHeight: number }) => {
		if (props.newHeight === 0) {
			setCurrentElementsList(
				renderElementsList(items, translateItem, selectedItem, onItemSelect)
			);
		}
	};

	const currentElementsListHeight = isOpen ? "auto" : 0;

	return (
		<MessageSubjectSelectorElement onClick={() => setIsOpen(!isOpen)} hasFocus={isOpen}>
			<ReplacementContainer zIndex={4}>
				<CurrentElement
					key={selectedItem}
					notSelectedError={!isOpen && showNotSelectedError}
				>
					{currentElement}
				</CurrentElement>
			</ReplacementContainer>
			<StateArrow subjectSelectorOpenState={isOpen} />
			<AvailableElementsWrapper isVisible={isOpen}>
				<AnimateHeight
					duration={300}
					animateOpacity={true}
					height={currentElementsListHeight}
					onAnimationEnd={onAnimationEnd}
				>
					<AvailableElementsList>{currentElementsList}</AvailableElementsList>
				</AnimateHeight>
			</AvailableElementsWrapper>
		</MessageSubjectSelectorElement>
	);
};
