import { RowType } from "../extension/focus";

export type MessageMap = {
	'loadBingoSpreadsheet': {
		result: Array<string>;
	};

	'importBingoCard': {
		data: string;
	};

	'defaultBingoCard': {};

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

	'focusTo': {
		data: RowType
	};

	'removeFocus': {};
};
