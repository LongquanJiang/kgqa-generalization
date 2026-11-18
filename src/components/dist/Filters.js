"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var types_1 = require("../types");
var redux_1 = require("../redux");
var hooks_1 = require("../hooks");
var utils_1 = require("../utils");
var Select_1 = require("./Select");
var moment_1 = require("moment");
var RangePicker = antd_1.DatePicker.RangePicker;
var Search = antd_1.Input.Search;
function Filters() {
    var filters = hooks_1.useAppSelector(function (state) { return state.filters; });
    var dispatch = hooks_1.useAppDispatch();
    function handleDataChange(value) {
        dispatch(redux_1.filtersActions.setData(utils_1.fromSelectValue(value)));
    }
    function handleModelChange(value) {
        dispatch(redux_1.filtersActions.setModel(utils_1.fromSelectValue(value)));
    }
    function handleLearningChange(value) {
        dispatch(redux_1.filtersActions.setLearning(utils_1.fromSelectValue(value)));
    }
    function handleVenueChange(value) {
        dispatch(redux_1.filtersActions.setVenue(utils_1.fromSelectValue(value)));
    }
    function handleFilterChange(event) {
        dispatch(redux_1.filtersActions.changeState(event.target.value === "AND"));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleYearChange(value) {
        var _a, _b;
        var startYear = (_a = value === null || value === void 0 ? void 0 : value[0]) === null || _a === void 0 ? void 0 : _a.year();
        var endYear = (_b = value === null || value === void 0 ? void 0 : value[1]) === null || _b === void 0 ? void 0 : _b.year();
        dispatch(redux_1.filtersActions.setStartYear(startYear));
        dispatch(redux_1.filtersActions.setEndYear(endYear));
    }
    function handleSearch(value) {
        dispatch(redux_1.filtersActions.setSearch(value.currentTarget.value));
    }
    function handleShowOriginal(value) {
        dispatch(redux_1.filtersActions.setShowOriginal(value.target.checked));
    }
    function handleShowNew(value) {
        dispatch(redux_1.filtersActions.setShowNew(value.target.checked));
    }
    function handleReset() {
        dispatch(redux_1.filtersActions.reset());
    }
    return (react_1["default"].createElement(antd_1.Row, { className: "filters-grid", gutter: [8, 8], justify: "center", style: { marginBottom: 12 } },
        react_1["default"].createElement(antd_1.Col, { span: 5 },
            react_1["default"].createElement(antd_1.Form.Item, { label: "State of Filter", tooltip: {
                    title: "AND selects papers with all of the selected types, OR selects papers with any of the selected types",
                    icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                } },
                react_1["default"].createElement(antd_1.Radio.Group, { buttonStyle: "solid", defaultValue: filters.filterStateAND ? "AND" : "OR", onChange: handleFilterChange },
                    react_1["default"].createElement(antd_1.Radio.Button, { value: "AND" }, "AND"),
                    react_1["default"].createElement(antd_1.Radio.Button, { value: "OR" }, "OR")))),
        react_1["default"].createElement(antd_1.Col, { span: 3 },
            react_1["default"].createElement(antd_1.Button, { onClick: handleReset }, "Reset Filters")),
        react_1["default"].createElement(antd_1.Col, { span: 8 },
            react_1["default"].createElement(antd_1.Checkbox, { onChange: handleShowOriginal, checked: filters.showOriginal }, "Show Original Papers from Survey")),
        react_1["default"].createElement(antd_1.Col, { span: 8 },
            react_1["default"].createElement(antd_1.Checkbox, { onChange: handleShowNew, checked: filters.showNew }, "Show New Papers from Community")),
        react_1["default"].createElement(Select_1["default"], { placeholder: "Data Level Mechanisms", enumerator: types_1.Data, handleChange: handleDataChange, value: filters.data, span: 8 }),
        react_1["default"].createElement(Select_1["default"], { placeholder: "Model Level Mechanisms", enumerator: types_1.Model, handleChange: handleModelChange, value: filters.model, span: 8 }),
        react_1["default"].createElement(Select_1["default"], { placeholder: "Learning Level Mechanisms", enumerator: types_1.Learning, handleChange: handleLearningChange, value: filters.learning, span: 8 }),
        react_1["default"].createElement(Select_1["default"], { placeholder: "Venue", enumerator: types_1.Venue, handleChange: handleVenueChange, value: filters.venue, span: 8 }),
        react_1["default"].createElement(antd_1.Col, { span: 8 },
            react_1["default"].createElement(RangePicker, { picker: "year", onChange: handleYearChange, allowEmpty: [true, true], value: [
                    filters.startYear ? moment_1["default"]([filters.startYear]) : null,
                    filters.endYear ? moment_1["default"]([filters.endYear]) : null
                ], defaultPickerValue: [
                    moment_1["default"]([2010]),
                    moment_1["default"]([2010])
                ], style: {
                    width: "100%"
                } })),
        react_1["default"].createElement(antd_1.Col, { span: 8 },
            react_1["default"].createElement(Search, { placeholder: "Search titles, venues, authors and abstracts", onChange: handleSearch, value: filters.search, suffix: react_1["default"].createElement(antd_1.Tooltip, { title: "Prefix with 'title:', 'venue:', 'author:' or 'abstract:' to only search in the respective field" },
                    react_1["default"].createElement(icons_1.InfoCircleOutlined, null)) }))));
}
exports["default"] = Filters;
