"use strict";
exports.__esModule = true;
exports.getColor = exports.enumKeyMap = exports.typeArray = exports.isPaper = void 0;
var types_1 = require("../types");
var utils_1 = require("./utils");
// Function that checks if an object is of type Paper. 
// Uses typescript typeguards to ensure that objects that pass the checks are actually given type Paper
function isPaper(paper) {
    return "url" in paper
        && "Title" in paper
        && "Year" in paper
        && "Venue" in paper
        && (paper["Venue"]["isOld"] && utils_1.isSomeEnum(types_1.Venue)(paper["Venue"]["value"]) || !paper["Venue"]["isOld"])
        && "Authors" in paper
        && "Data Level Mechanisms" in paper
        && utils_1.isEnumArray(types_1.Data)(paper["Data Level Mechanisms"])
        && "Model Level Mechanisms" in paper
        && utils_1.isEnumArray(types_1.Model)(paper["Model Level Mechanisms"])
        && "Learning Level Mechanisms" in paper
        && utils_1.isEnumArray(types_1.Learning)(paper["Learning Level Mechanisms"]);
}
exports.isPaper = isPaper;
// Array of the type of X, used throughout the project for consistency
exports.typeArray = ["Data Level Mechanisms", "Model Level Mechanisms", "Learning Level Mechanisms"];
// Map from name of type object to type of X string
exports.enumKeyMap = {
    data: "Data Level Mechanisms",
    model: "Model Level Mechanisms",
    learning: "Learning Level Mechanisms",
    venue: "Venue"
};
// returns the dedicated color to the given type of X/Venue given. Colors are 
exports.getColor = function (type) {
    switch (type) {
        case "Data Level Mechanisms":
            return "magenta";
        case "Model Level Mechanisms":
            return "green";
        case "Learning Level Mechanisms":
            return "geekblue";
        case "Venue":
            return "cyan";
        default:
            return "gold";
    }
};
