import { NodeCG } from './nodecg';
import { bingo } from './bingo';
import { progress } from './progress';

export = (nodecg: NodeCG): void => {
	bingo(nodecg);
	progress(nodecg);
}
