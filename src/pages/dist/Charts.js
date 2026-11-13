"use strict";
exports.__esModule = true;
var components_1 = require("../components");
var antd_1 = require("antd");
var components_2 = require("../components");
var react_1 = require("react");
var utils_1 = require("../utils");
var Option = antd_1.Select.Option;
var Button = antd_1.Radio.Button, Group = antd_1.Radio.Group;
function App() {
    var _a = react_1.useState("Line Chart"), chart = _a[0], setChart = _a[1];
    var _b = react_1.useState("Type of Data"), type = _b[0], setType = _b[1];
    function HandleChartChange(e) {
        setChart(e.target.value);
    }
    function HandleChange(value) {
        setType(value);
    }
    var graphMap = {
        "Line Chart": {
            withSelect: true,
            element: react_1["default"].createElement(components_2.GrowthLineChart, { type: type }),
            description: "The line chart displays the cumulative number of papers over time. Select a metadata field to compare how its labels develop. Papers can have multiple labels, so category totals may exceed the number of records."
        },
        "Bar Chart": {
            withSelect: true,
            element: react_1["default"].createElement(components_2.BarChart, { type: type }),
            description: "The bar chart shows the distribution of labels for a selected attribute. The attribute shown can be changed with the dropdown menu on the right. It should be noted that papers can have multiple labels within a category so the total length of all the bars can be greater than the number of papers in the database."
        },
        "Connected Graph": {
            withSelect: false,
            element: (react_1["default"].createElement(components_2.ConnectedChart, null)),
            description: "The connected graph displays papers as nodes. Papers are linked when they share multiple labels in the current catalog. Apply filters, then select a node to open its paper."
        },
        "Circle Packing": {
            withSelect: true,
            element: react_1["default"].createElement(components_2.CirclePackingChart, { type: type }),
            description: "The circle packing chart groups papers by a selected attribute. Hover over a circle to see the paper title, or select it to open the paper."
        }
    };
    return (react_1["default"].createElement("div", { className: "charts-page" },
        react_1["default"].createElement("header", { className: "page-heading" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "eyebrow-label" }, "KGQA Generalization / charts"),
                react_1["default"].createElement("h1", null, "Charts & patterns"),
                react_1["default"].createElement("p", null, "Compare records over time or explore how the current metadata categories relate."))),
        react_1["default"].createElement("section", { className: "charts-filters filter-panel", "aria-label": "Chart filters" },
            react_1["default"].createElement(components_1.Filters, null)),
        react_1["default"].createElement("section", { className: "chart-workspace", "aria-label": "Paper collection charts" },
            react_1["default"].createElement(antd_1.Row, { className: "charts-toolbar", justify: "space-between", style: { marginBottom: 12 } },
                react_1["default"].createElement(antd_1.Col, { span: 14, className: "charts-chart-selector" },
                    react_1["default"].createElement(Group, { defaultValue: chart, buttonStyle: "solid", onChange: HandleChartChange }, Object.keys(graphMap).map(function (elem) {
                        return react_1["default"].createElement(Button, { key: elem, value: elem }, elem);
                    }))),
                graphMap[chart].withSelect
                    ? react_1["default"].createElement(antd_1.Select, { defaultValue: type, style: { width: 240 }, onChange: HandleChange }, utils_1.typeArray.map(function (elem) {
                        return react_1["default"].createElement(Option, { key: elem, value: elem }, elem);
                    }))
                    : null),
            react_1["default"].createElement(antd_1.Row, { className: "chart-description", justify: "start", style: { marginBottom: 8 } },
                react_1["default"].createElement(antd_1.Col, { span: 24 }, graphMap[chart].description)),
            react_1["default"].createElement("div", { className: "chart-visual" }, graphMap[chart].element))));
}
exports["default"] = App;
