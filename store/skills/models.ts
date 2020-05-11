export type CategoryName = "frontend" | "backend" | "embedded";

export interface BoardItem {
	iconPath: string;
	iconScale?: number;
	title: string;
	description?: string;
}

export interface BoardCategory {
	categoryName: string;
	items: BoardItem[];
}

export type BoardsContent = {
	[name in CategoryName]: BoardCategory[];
};

export type BoardsLoadingState = {
	[name in CategoryName]: boolean;
};
