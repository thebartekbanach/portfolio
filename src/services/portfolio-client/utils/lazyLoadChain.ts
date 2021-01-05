export type LazyLoadResolve = () => void | Promise<void>;

type LazyLoadChainDelegateFunc = (
	resolver: LazyLoadResolve,
	shouldBeLoaded?: () => boolean
) => void;

export type LazyLoadChainDelegate = LazyLoadChainDelegateFunc & {
	root: LazyLoadChain;
	target: LazyLoadChain;
};

export enum LazyLoadChainState {
	WAITING,
	LOADING,
	PAUSED,
	LOADED
}

interface LazyLoadItem {
	resolver: LazyLoadResolve;
	shouldBeLoaded?: () => boolean;
}

export class LazyLoadChain {
	private root: LazyLoadChain;
	private target?: LazyLoadChain;

	private items: Record<number, LazyLoadItem | undefined> = {};
	private endObservers: LazyLoadResolve[] = [];

	private isInitialized = false;
	private state = LazyLoadChainState.WAITING;

	private get numberOfItems() {
		return Object.keys(this.items).length;
	}

	private get numberOfItemsReadyToLoad() {
		let numberOfItems = 0;

		for (const itemIndex in this.items) {
			const item = this.items[itemIndex];

			if (item?.shouldBeLoaded === undefined || item.shouldBeLoaded()) {
				numberOfItems += 1;
			}
		}

		return numberOfItems;
	}

	private sortAndFilterUndefinedItems() {
		const listOfItems = Object.entries(this.items)
			.map(item => ({ index: parseInt(item[0]), value: item[1] }))
			.filter(item => item.value !== undefined)
			.sort((a, b) => a.index - b.index)
			.map(item => item.value);

		this.items = {};

		for (let index = 0; index < listOfItems.length; ++index) {
			const value = listOfItems[index];
			this.items[index] = value;
		}
	}

	private getFirstNotLoadedItemResolver() {
		this.sortAndFilterUndefinedItems();

		for (let itemIndex = 0; itemIndex < this.numberOfItems; ++itemIndex) {
			const item = this.items[itemIndex];

			if (item?.shouldBeLoaded === undefined || item.shouldBeLoaded()) {
				const resolver = async () => {
					await item?.resolver();
				};

				const removeLoadedItem = () => {
					this.items[itemIndex] = undefined;
				};

				return { resolver, removeLoadedItem };
			}
		}
	}

	constructor(root?: LazyLoadChain, target?: LazyLoadChain) {
		this.root = root ?? this;
		this.target = target;

		if (typeof window === "undefined") {
			this.lockAddingNewItems();
		}
	}

	async start() {
		if (this.state === LazyLoadChainState.LOADING) {
			return;
		}

		this.state = LazyLoadChainState.LOADING;

		while (this.numberOfItemsReadyToLoad > 0) {
			const item = this.getFirstNotLoadedItemResolver();

			if (item === undefined) {
				break;
			}

			const { resolver, removeLoadedItem } = item;

			await resolver();

			if (this.isPaused()) {
				this.state = LazyLoadChainState.PAUSED;
				return;
			}

			removeLoadedItem();
		}

		for (const observer of this.endObservers) {
			await observer();
		}

		this.state = LazyLoadChainState.LOADED;
	}

	pause() {
		if (this.state === LazyLoadChainState.LOADING) {
			this.state = LazyLoadChainState.PAUSED;
		}
	}

	next(item: LazyLoadItem, index?: number) {
		if (this.isInitialized) {
			return;
		}

		const id = index ?? this.numberOfItems;

		if (this.items[id] !== undefined) {
			throw new Error(
				`Cannot add next item to LazyLoadChain because element at specified index "${index}" already exists`
			);
		}

		this.items[id] = item;
	}

	nextDelegate(index?: number) {
		const delegate: LazyLoadChainDelegate = (resolver, shouldBeLoaded) => {
			this.next({ resolver, shouldBeLoaded }, index);
		};

		delegate.root = this.root;
		delegate.target = this;

		return delegate;
	}

	onLoadEnd(observer: LazyLoadResolve) {
		if (this.state === LazyLoadChainState.LOADED) {
			observer();
		} else {
			this.endObservers.push(observer);
		}
	}

	onRootLoadEnd(observer: LazyLoadResolve) {
		if (this.state === LazyLoadChainState.LOADED) {
			observer();
		} else {
			this.root.endObservers.push(observer);
		}
	}

	lockAddingNewItems() {
		this.isInitialized = true;
	}

	getState() {
		return this.state;
	}

	isPaused() {
		const parent = this.target ?? this.root;

		if (parent === this) {
			return this.state === LazyLoadChainState.PAUSED;
		}

		return parent.isPaused();
	}
}
