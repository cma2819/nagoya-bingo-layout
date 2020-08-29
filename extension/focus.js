"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var clone_1 = tslib_1.__importDefault(require("clone"));
var rowSlots = {
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
exports.focus = function (nodecg) {
    var logger = new nodecg.Logger(nodecg.bundleName + ": focus");
    var bingoCardReplicant = nodecg.Replicant('bingoCard', {
        defaultValue: []
    });
    var bingoFocusReplicant = nodecg.Replicant('bingoFocusRow', {
        defaultValue: {
            row: null,
            slots: []
        }
    });
    var focusTo = function (row) {
        var slots = rowSlots[row];
        bingoFocusReplicant.value = {
            row: row,
            slots: clone_1.default(bingoCardReplicant.value.filter(function (slot) {
                return slots.includes(slot.id);
            }))
        };
        logger.info("Bingo focus on " + row + ".");
    };
    var removeFocus = function () {
        bingoFocusReplicant.value = {
            row: null,
            slots: []
        };
        logger.info("Bingo focus is removed.");
    };
    nodecg.listenFor('focusTo', focusTo);
    nodecg.listenFor('removeFocus', removeFocus);
};
