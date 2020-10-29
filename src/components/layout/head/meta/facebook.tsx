import { PageHeadProps } from "..";

export const facebookMeta = (props: PageHeadProps) => (
	<>
		<meta property="og:url" content={props.url} />
		<meta property="og:type" content="website" />
		<meta property="og:locale" content={props.locale} />
		<meta property="og:title" content={props.pageTitle} />
		<meta property="og:description" content={props.description} />
		<meta property="og:image" content={props.coverImage} />
	</>
);
