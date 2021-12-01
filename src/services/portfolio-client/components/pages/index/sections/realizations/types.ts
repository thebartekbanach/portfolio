export interface ProjectInfo {
	id: string;
	previewImageUrl: string;
	name: string;
	description: string;
	previewType: "website" | "github";
	previewUrl: string | null;
}
