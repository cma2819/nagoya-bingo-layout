"use strict";
var bingo_1 = require("./bingo");
var progress_1 = require("./progress");
var focus_1 = require("./focus");
module.exports = function (nodecg) {
    bingo_1.bingo(nodecg);
    focus_1.focus(nodecg);
    progress_1.progress(nodecg);
};
