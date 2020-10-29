import { PageHeadProps } from "..";

export const googleMeta = (props: PageHeadProps) => (
	<>
		<meta name="robots" content="noindex, nofollow" /> {/* TODO: enable robots */}
		<meta name="author" content="Programmer: Bartłomiej Banach; Designer: Mateusz Krom;" />
		<meta name="description" content={props.description} />
	</>
);
