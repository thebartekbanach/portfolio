import { FC, useState } from "react";
import AnimateHeight from "react-animate-height";

import { ReplacementContainer } from "../../../../../../../../shared/replacementContainer";

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
	selectedItem: number | null,
	onItemSelect: (itemIndex: number) => void
) =>
	items
		.map((item, index) => ({ realIndex: index, content: item }))
		.filter((_, index) => index !== selectedItem)
		.map(item => (
			<AvailableElementsItem key={item.content} onClick={() => onItemSelect(item.realIndex)}>
				{item.content}
			</AvailableElementsItem>
		));

interface MessageSubjectSelectorProps {
	placeholder: string;
	items: string[];
	selectedItem: number | null;
	onSelect: (itemIndex: number) => void;
	showNotSelectedError: boolean;
}

export const MessageSubjectSelector: FC<MessageSubjectSelectorProps> = ({
	placeholder,
	items,
	selectedItem,
	onSelect,
	showNotSelectedError
}) => {
	const onItemSelect = (elementIndex: number) => {
		setIsOpen(false);
		onSelect(elementIndex);
	};

	const [isOpen, setIsOpen] = useState(false);
	const [currentElementsList, setCurrentElementsList] = useState(() =>
		renderElementsList(items, selectedItem, onItemSelect)
	);

	const currentElement = selectedItem === null ? placeholder : items[selectedItem];

	const onAnimationEnd = (props: { newHeight: number }) => {
		if (props.newHeight === 0) {
			setCurrentElementsList(renderElementsList(items, selectedItem, onItemSelect));
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
