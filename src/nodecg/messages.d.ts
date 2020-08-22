export type MessageMap = {
	'loadBingoSpreadsheet': {
		result: Array<string>;
	};

	'importBingoCard': {
		data: string;
	};

	'doneRed': {
		data: number;
	};
	'undoRed': {
		data: number;
	};

	'resetRed': {};

	'doneBlue': {
		data: number;
	};
	'undoBlue': {
		data: number;
	};

	'resetBlue': {};

	'resetBothProgress': {};
};
