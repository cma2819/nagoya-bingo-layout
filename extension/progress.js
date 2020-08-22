"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progress = function (nodecg) {
    var logger = new nodecg.Logger(nodecg.bundleName + ": progress");
    var redDoneReplicant = nodecg.Replicant('redBingoDoneArray', {
        defaultValue: []
    });
    var blueDoneReplicant = nodecg.Replicant('blueBingoDoneArray', {
        defaultValue: []
    });
    var doneRed = function (index) {
        if (!redDoneReplicant.value.includes(index)) {
            redDoneReplicant.value.push(index);
            logger.info("Done red team slot[" + index + "].");
        }
        return redDoneReplicant.value;
    };
    var undoRed = function (index) {
        redDoneReplicant.value = redDoneReplicant.value.filter(function (done) {
            return done !== index;
        });
        logger.info("Undo red team slot[" + index + "].");
        return redDoneReplicant.value;
    };
    var resetRed = function () {
        redDoneReplicant.value = [];
        logger.info('Reset red team progress.');
        return redDoneReplicant.value;
    };
    var doneBlue = function (index) {
        if (!blueDoneReplicant.value.includes(index)) {
            blueDoneReplicant.value.push(index);
            logger.info("Done blue team slot[" + index + "].");
        }
        return blueDoneReplicant.value;
    };
    var undoBlue = function (index) {
        blueDoneReplicant.value = blueDoneReplicant.value.filter(function (done) {
            return done !== index;
        });
        logger.info("Undo blue team slot[" + index + "].");
        return blueDoneReplicant.value;
    };
    var resetBlue = function () {
        blueDoneReplicant.value = [];
        logger.info('Reset blue team progress.');
        return blueDoneReplicant.value;
    };
    nodecg.listenFor('doneRed', doneRed);
    nodecg.listenFor('undoRed', undoRed);
    nodecg.listenFor('resetRed', resetRed);
    nodecg.listenFor('doneBlue', doneBlue);
    nodecg.listenFor('undoBlue', undoBlue);
    nodecg.listenFor('resetBlue', resetBlue);
    nodecg.listenFor('resetBothProgress', function () {
        resetRed();
        resetBlue();
    });
};
