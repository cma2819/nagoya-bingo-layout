"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var googleapis_1 = require("googleapis");
var helper_1 = require("./lib/helper");
exports.bingo = function (nodecg) {
    var logger = new nodecg.Logger(nodecg.bundleName + ": bingo");
    var bingoCardReplicant = nodecg.Replicant('bingoCard', {
        defaultValue: []
    });
    var googleApiKey = nodecg.bundleConfig.googleApiKey;
    var spreadsheetApi = googleapis_1.google.sheets({
        version: 'v4',
        auth: googleApiKey
    });
    var spreadsheetId = helper_1.googleSpreadsheetUrlToId(nodecg.bundleConfig.bingoSpreadsheet);
    if (spreadsheetId === '') {
        throw new Error('Spreadsheet URL is invalid.');
    }
    var loadBingoSpreadsheet = function (_, ack) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var spreadsheet, sheetTitles, err_1;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, spreadsheetApi.spreadsheets.get({
                            spreadsheetId: spreadsheetId
                        })];
                case 1:
                    spreadsheet = _b.sent();
                    sheetTitles = (_a = spreadsheet.data.sheets) === null || _a === void 0 ? void 0 : _a.map(function (sheet) {
                        var _a;
                        return ((_a = sheet.properties) === null || _a === void 0 ? void 0 : _a.title) ? sheet.properties.title : '';
                    }).filter(function (title) {
                        return title !== '';
                    });
                    if (!sheetTitles) {
                        throw new Error('Failed to load from spreadsheet.');
                    }
                    ack(null, sheetTitles);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _b.sent();
                    logger.error(err_1);
                    ack(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var importBingoCard = function (name) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var response, slotValues, err_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, spreadsheetApi.spreadsheets.values.get({
                            spreadsheetId: spreadsheetId,
                            range: name + "!A1:E5"
                        })];
                case 1:
                    response = _a.sent();
                    slotValues = response.data.values;
                    if (!slotValues) {
                        logger.error("Slot values for " + name + " is unavailable!");
                        return [2 /*return*/];
                    }
                    bingoCardReplicant.value = slotValues.flat().map(function (slotName, index) {
                        return {
                            id: index,
                            name: slotName
                        };
                    });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    logger.error(err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    nodecg.listenFor('loadBingoSpreadsheet', loadBingoSpreadsheet);
    nodecg.listenFor('importBingoCard', importBingoCard);
};
