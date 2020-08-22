import { NodeCG } from './nodecg';
import { google } from 'googleapis';
import { googleSpreadsheetUrlToId } from './lib/helper';

export const bingo = (nodecg: NodeCG): void => {
	const logger = new nodecg.Logger(`${nodecg.bundleName}: bingo`);
	const bingoCardReplicant = nodecg.Replicant('bingoCard', {
		defaultValue: []
	});

	const googleApiKey = nodecg.bundleConfig.googleApiKey;
	const spreadsheetApi = google.sheets({
		version: 'v4',
		auth: googleApiKey
	});
	const spreadsheetId = googleSpreadsheetUrlToId(nodecg.bundleConfig.bingoSpreadsheet);
	if (spreadsheetId === '') {
		throw new Error('Spreadsheet URL is invalid.');
	}

	const loadBingoSpreadsheet = async (_: any, ack: any): Promise<void> => {

		try {
			const spreadsheet = await spreadsheetApi.spreadsheets.get({
				spreadsheetId
			});
			const sheetTitles = spreadsheet.data.sheets?.map((sheet) => {
				return sheet.properties?.title ? sheet.properties.title : '';
			}).filter((title) => {
				return title !== '';
			});

			if (!sheetTitles) {
				throw new Error('Failed to load from spreadsheet.');
			}

			ack(null, sheetTitles);

		} catch (err) {
			logger.error(err);
			ack(err);
		}
	}

	const importBingoCard = async (name: string): Promise<void> => {
		try {
			const response = await spreadsheetApi.spreadsheets.values.get({
				spreadsheetId: spreadsheetId,
				range: `${name}!A1:E5`
			});

			const slotValues = response.data.values;
			if (!slotValues) {
				logger.error(`Slot values for ${name} is unavailable!`);
				return;
			}

			bingoCardReplicant.value = slotValues.flat().map((slotName, index) => {
				return {
					id: index,
					name: slotName
				};
			});
		} catch (err) {
			logger.error(err);
		}
	}

	nodecg.listenFor('loadBingoSpreadsheet', loadBingoSpreadsheet);
	nodecg.listenFor('importBingoCard', importBingoCard);

}
