"use strict";

exports.__esModule = true;
exports.papersActions = exports.papersReducer = void 0;

var toolkit_1 = require("@reduxjs/toolkit");

var utils_1 = require("../../utils");

var db_json_1 = require("../../db/db.json"); // Loading the papers from the db.json


var initialState = []; // Go through the papers, fix the date if necessary and assert that they are actually Papers according to the isPaper function

db_json_1["default"].forEach(function (json) {
  var paper = json;

  if (typeof paper.Date === "string") {
    paper.Date = new Date(paper.Date);
  }

  if (utils_1.isPaper(paper)) {
    initialState.push(paper);
  } else {
    console.log(json, " is not a paper and was excluded fromt the list");
  }
});
var papersSlice = toolkit_1.createSlice({
  name: "papers",
  initialState: initialState,
  reducers: {}
});
exports.papersReducer = papersSlice.reducer;
exports.papersActions = papersSlice.actions;