import isMobile from "ismobilejs";

import { useMatchMedia } from "./useMatchMedia";

export const useMatchesDesktopDevices = (userAgent: string, desktopVersionBreakpoint?: number) => {
	const isMobileResult = isMobile(userAgent);
	const isDesktop = !isMobileResult.phone && !isMobileResult.tablet;

	return useMatchMedia(`(min-width: ${desktopVersionBreakpoint ?? 1000}px)`, isDesktop);
};
