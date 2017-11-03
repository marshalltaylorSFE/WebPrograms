export class DataBodyElement {
	data: string;
	entry: string;
}

//New data types
export class Directory {
	paths: string[];
}

export class Entry {
	entry: string;
	data: string;
}

export class Section {
	section: string;
	entries: Entry[];
}

export class File {
	name: string;
	topic: string;
	sections: Section[];
}