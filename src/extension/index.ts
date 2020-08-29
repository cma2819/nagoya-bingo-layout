import { NodeCG } from './nodecg';
import { bingo } from './bingo';
import { progress } from './progress';
import { focus } from './focus';

export = (nodecg: NodeCG): void => {
	bingo(nodecg);
	focus(nodecg);
	progress(nodecg);
}
