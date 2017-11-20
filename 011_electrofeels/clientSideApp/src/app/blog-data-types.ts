export class BlogPost {
	title: string;
	id: number;
	date: Date;
	body: string[];
}

export class BlogIndexEntry {
	file: string;
	dateStr: string;
}

export class BlogIndex {
	posts: BlogIndexEntry[];
}

