"use strict";
exports.__esModule = true;
exports.Venue = exports.Learning = exports.Model = exports.Data = void 0;
var schema_json_1 = require("../db/schema.json");
var properties = schema_json_1["default"].items.properties;
(function (Data) {
    properties["Data Level Mechanisms"].items["enum"].forEach(function (val) {
        Data[val] = val;
    });
})(exports.Data || (exports.Data = {}));
(function (Model) {
    properties["Model Level Mechanisms"].items["enum"].forEach(function (val) {
        Model[val] = val;
    });
})(exports.Model || (exports.Model = {}));
(function (Learning) {
    properties["Learning Level Mechanisms"].items["enum"].forEach(function (val) {
        Learning[val] = val;
    });
})(exports.Learning || (exports.Learning = {}));
var Venue;
(function (Venue) {
    Venue["ACL"] = "ACL";
    Venue["ICDM"] = "ICDM";
    Venue["KDD"] = "KDD";
    Venue["SIGIR"] = "SIGIR";
    Venue["AAAI"] = "AAAI";
    Venue["NeurIPS"] = "NeurIPS";
    Venue["ICCV"] = "ICCV";
    Venue["ICLR"] = "ICLR";
    Venue["WWW"] = "WWW";
    Venue["IJCAI"] = "IJCAI";
    Venue["ICML"] = "ICML";
    Venue["CVPR"] = "CVPR";
    Venue["NAACL"] = "NAACL";
    Venue["EMNLP"] = "EMNLP";
    Venue["CIKM"] = "CIKM";
    Venue["COLING"] = "COLING";
    Venue["LREC"] = "LREC";
    Venue["Other"] = "Other";
})(Venue = exports.Venue || (exports.Venue = {}));
