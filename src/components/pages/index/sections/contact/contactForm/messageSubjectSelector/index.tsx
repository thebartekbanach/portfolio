import { FC, useState } from "react";
import AnimateHeight from "react-animate-height";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { ReplacementContainer } from "../../../../../../shared/replacementContainer";

import {
	AvailableElementsItem,
	AvailableElementsList,
	AvailableElementsWrapper,
	CurrentElement,
	MessageSubjectSelectorElement,
	StateArrow
} from "./styles";

interface MessageSubjectSelectorProps {
	placeholder: string;
	items: string[];
	selectedItem: number | null;
	onSelect: (itemIndex: number) => void;
}

export const MessageSubjectSelector: FC<MessageSubjectSelectorProps> = ({
	placeholder,
	items,
	selectedItem,
	onSelect
}) => {
	const renderElementsList = () =>
		items
			.map((item, index) => ({ realIndex: index, content: item }))
			.filter((_, index) => index !== selectedItem)
			.map(item => (
				<AvailableElementsItem
					key={item.content}
					onClick={() => onItemSelect(item.realIndex)}
				>
					{item.content}
				</AvailableElementsItem>
			));

	const [isOpen, setIsOpen] = useState(false);
	const [currentElementsList, setCurrentElementsList] = useState(renderElementsList);

	const currentElement = selectedItem === null ? placeholder : items[selectedItem];

	const onItemSelect = (elementIndex: number) => {
		setIsOpen(false);
		onSelect(elementIndex);
	};

	const onAnimationEnd = (props: { newHeight: number }) => {
		if (props.newHeight === 0) {
			setCurrentElementsList(renderElementsList());
		}
	};

	const currentElementsListHeight = isOpen ? "auto" : 0;

	return (
		<MessageSubjectSelectorElement onClick={() => setIsOpen(!isOpen)}>
			<ReplacementContainer zIndex={2}>
				<CurrentElement key={selectedItem}>{currentElement}</CurrentElement>
			</ReplacementContainer>
			<StateArrow subjectSelectorOpenState={isOpen} />
			<AvailableElementsWrapper>
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
