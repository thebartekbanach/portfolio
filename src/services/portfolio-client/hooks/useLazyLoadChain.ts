import { useRef, useEffect } from "react";

import { LazyLoadChain, LazyLoadChainDelegate, LazyLoadResolve } from "~/utils/lazyLoadChain";

type StartLazyLoadingFunction = () => Promise<void>;
type PauseLazyLoadingFunction = () => void;
type CreateNextDelegateFunction = (index?: number) => LazyLoadChainDelegate;

interface UseLazyLoadChainConfig {
	starter?: LazyLoadChainDelegate;
	onLoadEnd?: LazyLoadResolve;
	onRootLoadEnd?: LazyLoadResolve;
	shouldBeLoaded?: () => boolean;
	isLoadingEnabled?: boolean;
}

type UseLazyLoadChainHook = (
	config?: UseLazyLoadChainConfig
) => [CreateNextDelegateFunction, StartLazyLoadingFunction, PauseLazyLoadingFunction];

export const useLazyLoadChain: UseLazyLoadChainHook = config => {
	const chain = useRef(new LazyLoadChain(config?.starter?.root, config?.starter?.target));

	const nextDelegate = (index?: number) => chain.current.nextDelegate(index);
	const startFunction = () => chain.current.start();
	const pauseFunction = () => chain.current.pause();

	useEffect(() => {
		chain.current.lockAddingNewItems();

		if (config?.shouldBeLoaded !== undefined && config.starter === undefined) {
			throw new Error(
				"Cannot set shouldBeLoaded function on the root of the lazy load chain"
			);
		}

		if (config?.starter !== undefined) {
			config?.starter(startFunction, config.shouldBeLoaded);
		}

		if (config?.onLoadEnd !== undefined) {
			chain.current.onLoadEnd(config.onLoadEnd);
		}

		if (config?.onRootLoadEnd !== undefined) {
			chain.current.onRootLoadEnd(config.onRootLoadEnd);
		}
	}, []);

	useEffect(() => {
		if (config === undefined || config.isLoadingEnabled === undefined) {
			return;
		}

		if (config.isLoadingEnabled) {
			startFunction();
		} else {
			pauseFunction();
		}
	}, [config?.isLoadingEnabled]);

	return [nextDelegate, startFunction, pauseFunction];
};
