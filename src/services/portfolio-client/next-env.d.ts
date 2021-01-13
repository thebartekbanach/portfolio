/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.svg" {
	const svg: React.ElementType;
	export default svg;
}
declare namespace NodeJS {
	export interface ProcessEnv {
		EMAIL_GATEWAY_API_ADDRESS: string;
	}
}
