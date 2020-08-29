import { Assets } from "./asset";
import { BingoCard } from "./generated/bingoCard";
import { BlueBingoDoneArray } from "./generated/blueBingoDoneArray";
import { RedBingoDoneArray } from "./generated/redBingoDoneArray";
import { BingoFocusRow } from './generated/bingoFocusRow';

type ReplicantMap = {
	'assets:background': Assets,
	'assets:logo': Assets,
	bingoCard: BingoCard,
	blueBingoDoneArray: BlueBingoDoneArray,
	redBingoDoneArray: RedBingoDoneArray,
	bingoFocusRow: BingoFocusRow,
};

export {
	Assets,
	BingoCard,
	BlueBingoDoneArray,
	RedBingoDoneArray,
	BingoFocusRow,
	ReplicantMap
};
