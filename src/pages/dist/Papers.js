"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var hooks_1 = require("../hooks");
var components_1 = require("../components");
var utils_1 = require("../utils");
var react_router_dom_1 = require("react-router-dom");
var reverseEnumKeyMap = utils_1.reverseObject(utils_1.enumKeyMap);
function CustomTag(_a) {
    var record = _a.record, type = _a.type;
    var tagType = reverseEnumKeyMap[type];
    var data = record[type].map(function (item) { return utils_1.capitalize(tagType) + " : " + item; });
    return (React.createElement(components_1.TagList, { TagData: data, Color: utils_1.getColor(type) }));
}
function PapersPage() {
    var filteredPapers = hooks_1.useFilteredPapers();
    var papersData = filteredPapers.map(function (paper) { return (__assign(__assign({}, paper), { key: filteredPapers.indexOf(paper), Author: [paper.Authors[0] + " et al."] })); });
    var allKeys = papersData.map(function (paper) { return paper.key; });
    var expandController = hooks_1.useExpandingAllInTable(allKeys, "key", false);
    var columns = [
        {
            title: "Title",
            dataIndex: "Title",
            render: function (text, row) { return (React.createElement("a", { href: row.url, target: "_blank", rel: "noreferrer" }, text)); },
            key: "title",
            defaultSortOrder: "ascend",
            sorter: {
                compare: function (a, b) { return a.Title.localeCompare(b.Title); },
                multiple: 1
            }
        },
        {
            title: "Submitted",
            dataIndex: "Date",
            key: "date",
            defaultSortOrder: "descend",
            sorter: {
                compare: function (a, b) {
                    if (typeof a.Date === "undefined") {
                        return 1;
                    }
                    if (typeof b.Date === "undefined") {
                        return -1;
                    }
                    return a.Date.getTime() - b.Date.getTime();
                },
                multiple: 4
            },
            render: function (_, row) { return (React.createElement(React.Fragment, null, typeof row.Date !== "undefined"
                ?
                    React.createElement(antd_1.Col, { span: 24 }, typeof row.Date === "string" ? row.Date : row.Date.toLocaleDateString("en-UK"))
                : React.createElement(antd_1.Tag, { style: { marginLeft: 5 }, color: "blue" }, "Original"))); },
            width: 100
        },
        {
            title: "Venue",
            dataIndex: "Venue",
            render: function (_, row) { return React.createElement(React.Fragment, null, row.Venue.value); },
            key: "venue",
            defaultSortOrder: "ascend",
            width: 100,
            sorter: {
                compare: function (a, b) { return a.Venue.value.localeCompare(b.Venue.value); },
                multiple: 2
            }
        },
        {
            title: "Year",
            dataIndex: "Year",
            key: "year",
            defaultSortOrder: "descend",
            width: 100,
            sorter: {
                compare: function (a, b) { return a.Year.localeCompare(b.Year); },
                multiple: 3
            }
        },
        {
            title: "Author",
            key: "author",
            dataIndex: "Author",
            width: 250
        },
    ];
    return (React.createElement("div", { className: "paper-browser" },
        React.createElement("header", { className: "page-heading" },
            React.createElement("div", null,
                React.createElement("div", { className: "eyebrow-label" }, "KGQA Generalization / papers"),
                React.createElement("h1", null, "Paper catalog"),
                React.createElement("p", null, "Search and compare the records currently bundled with this project.")),
            React.createElement(react_router_dom_1.Link, { className: "button-primary", to: "/add-paper" },
                "Add a paper ",
                React.createElement("span", { "aria-hidden": "true" }, "\u2197"))),
        React.createElement("section", { className: "filter-panel", "aria-label": "Paper filters" },
            React.createElement(components_1.Filters, null)),
        React.createElement("div", { className: "paper-results" },
            React.createElement(antd_1.Row, { className: "paper-actions", justify: "space-between" },
                React.createElement(antd_1.Button, { className: "expand-all", "aria-label": expandController.isAllExpanded() ? "Collapse all paper details" : "Expand all paper details" }, expandController.isAllExpanded() ? React.createElement(icons_1.MinusOutlined, null) : React.createElement(icons_1.PlusOutlined, null)),
                React.createElement(antd_1.Button, { type: "primary" },
                    React.createElement("a", { href: "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredPapers)), download: "FilteredList.json" }, "Export filtered list as JSON"))),
            React.createElement(antd_1.Table, { style: { marginTop: 10 }, columns: columns, dataSource: papersData, expandable: {
                    expandRowByClick: true,
                    expandedRowRender: function (record) {
                        return (React.createElement(antd_1.Row, { gutter: [0, 4] },
                            record.Abstract.length > 0
                                ? React.createElement(antd_1.Col, { span: 24 }, record.Abstract)
                                : null,
                            React.createElement(antd_1.Col, { span: 24 },
                                React.createElement("b", null,
                                    "Authors: ",
                                    utils_1.printNames(record.Authors))),
                            React.createElement(antd_1.Col, { span: 24 }, utils_1.typeArray.map(function (type) { return (React.createElement(CustomTag, { record: record, type: type, key: utils_1.typeArray.indexOf(type) })); }))));
                    }
                }, className: "paper-table " + (expandController.isAllExpanded() ? "table-expanding-all" : ""), expandedRowKeys: expandController.expandedRowKeys, onExpand: expandController.onExpand, rowKey: expandController.rowKey, pagination: {
                    defaultPageSize: 20,
                    position: ["bottomCenter"]
                } }))));
}
exports["default"] = PapersPage;
