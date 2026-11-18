"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var types_1 = require("../types");
var components_1 = require("../components");
var utils_1 = require("../utils");
var hooks_1 = require("../hooks");
var redux_1 = require("../redux");
var react_1 = require("react");
var icons_1 = require("@ant-design/icons");
var Item = antd_1.Form.Item;
var TextArea = antd_1.Input.TextArea;
function isUrl(str) {
    var pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
    return !!pattern.test(str);
}
function AddPaper() {
    var dispatch = hooks_1.useAppDispatch();
    var form = hooks_1.useAppSelector(function (state) { return state.form; });
    var _a = react_1.useState(""), json = _a[0], setJson = _a[1];
    var _b = react_1.useState(false), showJson = _b[0], setShowJson = _b[1];
    react_1.useEffect(function () {
        setJson("," + JSON.stringify(form, null, 2));
        // if this boolean is true, the json will be shown
        setShowJson(form["Data Level Mechanisms"].length > 0
            && form["Model Level Mechanisms"].length > 0
            && form["Learning Level Mechanisms"].length > 0
            && form.Title.length > 0
            && form.Venue.value.length > 0
            && form.Authors.length > 0
            && isUrl(form.url));
    }, [form]);
    function handleChangeTitle(event) {
        dispatch(redux_1.formActions.setTitle(event.currentTarget.value));
    }
    function handleChangeDoi(event) {
        dispatch(redux_1.formActions.setDoi(event.currentTarget.value));
    }
    function handleChangeYear(value) {
        dispatch(redux_1.formActions.setYear(value));
    }
    function handleChangeAuthors(event) {
        var authors = event.currentTarget.value.split(",").map(function (author) { return author.trim(); });
        dispatch(redux_1.formActions.setAuthors(authors));
    }
    function handleChangeVenueDropdown(value) {
        var _a;
        var newVenue = (_a = value === null || value === void 0 ? void 0 : value.label) !== null && _a !== void 0 ? _a : "";
        if (newVenue === "Other") {
            dispatch(redux_1.formActions.setIsOldVenue(false));
            dispatch(redux_1.formActions.setVenue(""));
        }
        else {
            dispatch(redux_1.formActions.setIsOldVenue(true));
            dispatch(redux_1.formActions.setVenue(newVenue));
        }
    }
    function handleChangeVenueInput(event) {
        var venue = event.currentTarget.value;
        dispatch(redux_1.formActions.setVenue(venue));
    }
    function handleChangeData(value) {
        dispatch(redux_1.formActions.setData(utils_1.fromSelectValue(value)));
    }
    function handleChangeModel(value) {
        dispatch(redux_1.formActions.setModel(utils_1.fromSelectValue(value)));
    }
    function handleChangeLearning(value) {
        dispatch(redux_1.formActions.setLearning(utils_1.fromSelectValue(value)));
    }
    function handleChangeAbstract(value) {
        dispatch(redux_1.formActions.setAbstract(value.currentTarget.value));
    }
    function handleChangeComment(value) {
        dispatch(redux_1.formActions.setComment(value.currentTarget.value));
    }
    function copyJsonToClipboard() {
        navigator.clipboard.writeText(json);
        antd_1.notification.open({
            message: "Successfully copied JSON to clipboard",
            duration: 1.5
        });
    }
    var venueValue = form.Venue.value;
    var venue = form.Venue.isOld ? [venueValue] : ["Other"];
    return (react_1["default"].createElement("div", { className: "addpaper" },
        react_1["default"].createElement("header", { className: "page-heading add-paper-heading" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("div", { className: "eyebrow-label" }, "KGQA Generalization / contribute"),
                react_1["default"].createElement("h1", null, "Add a paper"),
                react_1["default"].createElement("p", null, "Prepare a paper record, generate its database entry, and propose it through a pull request.")),
            react_1["default"].createElement("a", { className: "button-outline", href: "https://github.com/longquanjiang/kgqa-generalization/blob/master/src/db/db.json", target: "_blank", rel: "noreferrer" },
                "Open database ",
                react_1["default"].createElement("span", { "aria-hidden": "true" }, "\u2197"))),
        react_1["default"].createElement("div", { className: "contribution-intro" },
            react_1["default"].createElement("p", null, "Existing records follow the source repository\u2019s original classification. A generated entry can be reviewed in the preview and proposed through a pull request."),
            react_1["default"].createElement("div", { className: "contribution-steps", "aria-label": "Contribution flow" },
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("b", null, "01"),
                    " Describe the paper"),
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("b", null, "02"),
                    " Generate JSON"),
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement("b", null, "03"),
                    " Open a pull request"))),
        react_1["default"].createElement(antd_1.Row, { className: "add-paper-layout" },
            react_1["default"].createElement(antd_1.Col, { span: 16, className: "add-paper-form-col" },
                react_1["default"].createElement(antd_1.Form, { className: "paper-submission-form", labelCol: { span: 6 }, wrapperCol: { span: 16 } },
                    react_1["default"].createElement(Item, { label: "Title", tooltip: {
                            title: "Title of the paper in English",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        }, required: true },
                        react_1["default"].createElement(antd_1.Input, { placeholder: "Title", defaultValue: form.Title, onChange: handleChangeTitle })),
                    react_1["default"].createElement(Item, { label: "Doi-url", required: true },
                        react_1["default"].createElement(antd_1.Input, { placeholder: "Doi-url", defaultValue: form.url, onChange: handleChangeDoi })),
                    react_1["default"].createElement(Item, { label: "Year of Publication", required: true },
                        react_1["default"].createElement(antd_1.InputNumber, { defaultValue: parseInt(form.Year), onChange: handleChangeYear })),
                    react_1["default"].createElement(Item, { label: "Authors", tooltip: {
                            title: "Firstname Lastname, all names should be separated by a comma",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        }, required: true },
                        react_1["default"].createElement(antd_1.Input, { placeholder: "Authors", defaultValue: utils_1.printNames(form.Authors), onChange: handleChangeAuthors })),
                    react_1["default"].createElement(Item, { label: "Venue", required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Venue", enumerator: types_1.Venue, handleChange: handleChangeVenueDropdown, value: venue, single: true })),
                    !form.Venue.isOld
                        ? react_1["default"].createElement(Item, { label: "Venue", tooltip: {
                                title: "Please use an abbreviation of the complete Venue name similar to the predefined venues.",
                                icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                            } },
                            react_1["default"].createElement(antd_1.Input, { placeholder: "Venue", onChange: handleChangeVenueInput, value: form.Venue.value }))
                        : null,
                    react_1["default"].createElement(Item, { label: "Data Level Mechanisms", tooltip: {
                            title: "What Datatypes the model in the paper uses. A combination of multiple flags is possible.",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        }, required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Data Level Mechanisms", enumerator: types_1.Data, handleChange: handleChangeData, value: form["Data Level Mechanisms"] })),
                    react_1["default"].createElement(Item, { label: "Model Level Mechanisms", tooltip: {
                            title: "What type of AI model is used in the paper. A combination of multiple flags is possible.",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        }, required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Model Level Mechanisms", enumerator: types_1.Model, handleChange: handleChangeModel, value: form["Model Level Mechanisms"] })),
                    react_1["default"].createElement(Item, { label: "Learning Strategy Level Mechanisms", tooltip: {
                            title: "What is the task of the AI model in the paper. A combination of multiple flags is possible.",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        }, required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Learning Level Mechanisms", enumerator: types_1.Learning, handleChange: handleChangeLearning, value: form["Learning Level Mechanisms"] })),
                    react_1["default"].createElement(Item, { label: "Abstract", tooltip: {
                            title: "Abstract is optional, but highly recommended",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        } },
                        react_1["default"].createElement(TextArea, { placeholder: "Abstract", defaultValue: form["Abstract"], onChange: handleChangeAbstract, autoSize: true })),
                    react_1["default"].createElement(Item, { label: "Comment", tooltip: {
                            title: "Used to indicate that your paper needs to have a new tag for example",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        } },
                        react_1["default"].createElement(TextArea, { placeholder: "Comment", defaultValue: form === null || form === void 0 ? void 0 : form.Comment, onChange: handleChangeComment, autoSize: true })))),
            showJson
                ? react_1["default"].createElement(antd_1.Col, { span: 8, className: "json-preview-col" },
                    react_1["default"].createElement(Item, { label: "Your JSON" },
                        react_1["default"].createElement(TextArea, { value: json, autoSize: true }),
                        react_1["default"].createElement(antd_1.Button, { onClick: copyJsonToClipboard }, "Copy To Clipboard")))
                : null),
        react_1["default"].createElement("details", { className: "references-panel" },
            react_1["default"].createElement("summary", null, "References cited in the categorization guidance"),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[1] Zhenyu Li, Sunqi Fan, Yu Gu, Xiuxing Li, Zhichao Duan, Bowen Dong, Ning Liu, and Jianyong Wang. Flexkbqa: A flexible llm-powered framework for few-shot knowledge base question answering. In AAAI, vol. 38, no. 17, pp. 18608\u201318616. 2024."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[2] Mayur Patidar, Riya Sawhney, Avinash Singh, Biswajit Chatterjee, and Indrajit Bhattacharya. Few\u2013shot transfer learning for knowledge base question answering: Fusing supervised models with in-context learning. In ACL, pp. 9147\u20139165. 2024."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[3] Xiang Huang, Jiayu Shen, Shanshan Huang, Sitao Cheng, Xiaxia Wang, and Yuzhong Qu. TARGA: Targeted synthetic data generation for practical reasoning over structured data. In ACL, pp. 2704\u20132726. 2025."))));
}
exports["default"] = AddPaper;
