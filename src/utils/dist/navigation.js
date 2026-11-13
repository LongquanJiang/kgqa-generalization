"use strict";
var _a;
exports.__esModule = true;
exports.pageToPath = exports.pathToPage = exports.pathMap = exports.githubUrl = void 0;
// Github url that is used in hyperlinks
exports.githubUrl = "https://www.github.com/longquanjiang/kgqa-generalization";
// Map between the different Paths and Pages defined in types/navigation
exports.pathMap = (_a = {},
    _a["/"] = "landing",
    _a["/papers"] = "papers",
    _a["/charts"] = "charts",
    _a["/add-paper"] = "add-paper",
    _a);
// Functions to swap between pages and paths if necessary
exports.pathToPage = function (path) {
    if (path in exports.pathMap) {
        return exports.pathMap[path];
    }
    return "landing";
};
exports.pageToPath = function (page) {
    for (var _i = 0, _a = Object.entries(exports.pathMap); _i < _a.length; _i++) {
        var entry = _a[_i];
        if (entry[1] === page) {
            return entry[0];
        }
    }
    return "/";
};
