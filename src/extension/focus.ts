import { NodeCG } from './nodecg';
import clone from 'clone';

const rowSlots: {
	[k in RowType]: Array<number>
} = {
	ROW1: [0, 1, 2, 3, 4],
	ROW2: [5, 6, 7, 8, 9],
	ROW3: [10, 11, 12, 13, 14],
	ROW4: [15, 16, 17, 18, 19],
	ROW5: [20, 21, 22, 23, 24],
	COL1: [0, 5, 10, 15, 20],
	COL2: [1, 6, 11, 16, 21],
	COL3: [2, 7, 12, 17, 22],
	COL4: [3, 8, 13, 18, 23],
	COL5: [4, 9, 14, 19, 24],
	'TL-BR': [0, 6, 12, 18, 24],
	'BL-TR': [4, 8, 12, 16, 20]
};
export const focus = (nodecg: NodeCG): void => {
	const logger = new nodecg.Logger(`${nodecg.bundleName}: focus`);
	const bingoCardReplicant = nodecg.Replicant('bingoCard', {
		defaultValue: []
	});
	const bingoFocusReplicant = nodecg.Replicant('bingoFocusRow', {
		defaultValue: {
			row: null,
			slots: []
		}
	});

	const focusTo = (row: RowType): void => {
		const slots = rowSlots[row];
		bingoFocusReplicant.value = {
			row,
			slots: clone(bingoCardReplicant.value.filter((slot) => {
				return slots.includes(slot.id);
			}))
		}
		logger.info(`Bingo focus on ${row}.`)
	}

	const removeFocus = (): void => {
		bingoFocusReplicant.value = {
			row: null,
			slots: []
		};
		logger.info(`Bingo focus is removed.`)
	}

	nodecg.listenFor('focusTo', focusTo);
	nodecg.listenFor('removeFocus', removeFocus);

}

export type RowType = 'ROW1' | 'ROW2' | 'ROW3' | 'ROW4' | 'ROW5' | 'COL1' | 'COL2' | 'COL3' | 'COL4' | 'COL5' | 'TL-BR' | 'BL-TR';
