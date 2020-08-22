"use strict";
var bingo_1 = require("./bingo");
var progress_1 = require("./progress");
module.exports = function (nodecg) {
    bingo_1.bingo(nodecg);
    progress_1.progress(nodecg);
};
