import { Assets } from "./asset";
import { BingoCard } from "./generated/bingoCard";
import { BlueBingoDoneArray } from "./generated/blueBingoDoneArray";
import { RedBingoDoneArray } from "./generated/redBingoDoneArray";


type ReplicantMap = {
	'assets:background': Assets,
	bingoCard: BingoCard,
	blueBingoDoneArray: BlueBingoDoneArray,
	redBingoDoneArray: RedBingoDoneArray,
};

export {
	Assets,
	BingoCard,
	BlueBingoDoneArray,
	RedBingoDoneArray,
	ReplicantMap
};
