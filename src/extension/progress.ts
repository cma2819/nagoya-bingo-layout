import { NodeCG } from './nodecg';
import { RedBingoDoneArray, BlueBingoDoneArray } from '../nodecg/replicants';

export const progress = (nodecg: NodeCG) => {
	const logger = new nodecg.Logger(`${nodecg.bundleName}: progress`);

	const redDoneReplicant = nodecg.Replicant('redBingoDoneArray', {
		defaultValue: []
	});
	const blueDoneReplicant = nodecg.Replicant('blueBingoDoneArray', {
		defaultValue: []
	});

	const doneRed = (index: number): RedBingoDoneArray => {
		if (!redDoneReplicant.value.includes(index)) {
			redDoneReplicant.value.push(index);
			logger.info(`Done red team slot[${index}].`);
		}
		return redDoneReplicant.value;
	}

	const undoRed = (index: number): RedBingoDoneArray => {
		redDoneReplicant.value = redDoneReplicant.value.filter((done) => {
			return done !== index;
		});
		logger.info(`Undo red team slot[${index}].`);
		return redDoneReplicant.value;
	}

	const resetRed = (): RedBingoDoneArray => {
		redDoneReplicant.value = [];
		logger.info('Reset red team progress.');
		return redDoneReplicant.value;
	}

	const doneBlue = (index: number): BlueBingoDoneArray => {
		if (!blueDoneReplicant.value.includes(index)) {
			blueDoneReplicant.value.push(index);
			logger.info(`Done blue team slot[${index}].`);
		}
		return blueDoneReplicant.value;
	}

	const undoBlue = (index: number): BlueBingoDoneArray => {
		blueDoneReplicant.value = blueDoneReplicant.value.filter((done) => {
			return done !== index;
		});
		logger.info(`Undo blue team slot[${index}].`);
		return blueDoneReplicant.value;
	}

	const resetBlue = (): BlueBingoDoneArray => {
		blueDoneReplicant.value = [];
		logger.info('Reset blue team progress.');
		return blueDoneReplicant.value;
	}

	nodecg.listenFor('doneRed', doneRed);
	nodecg.listenFor('undoRed', undoRed);
	nodecg.listenFor('resetRed', resetRed);
	nodecg.listenFor('doneBlue', doneBlue);
	nodecg.listenFor('undoBlue', undoBlue);
	nodecg.listenFor('resetBlue', resetBlue);
	nodecg.listenFor('resetBothProgress', () => {
		resetRed();
		resetBlue();
	});
}
