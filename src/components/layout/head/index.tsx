import { Favicon } from "./favicon";
import { FacebookMeta } from "./meta/facebook";
import { GoogleMeta } from "./meta/google";

export const PageHead = () => (
	<>
		<title>Bartek Banach - portfolio</title>
		<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		<Favicon />
		<GoogleMeta />
		<FacebookMeta />
	</>
);
