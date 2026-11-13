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
var Panel = antd_1.Collapse.Panel;
// if imageUrl is given, it will render a panel with the image.
function TypeOfExplanation(_a) {
    var name = _a.name, description = _a.description, imageUrl = _a.imageUrl;
    var imageCitation = imageUrl ? imageUrl.split(".")[0].split("_") : undefined;
    var citation = imageCitation === null || imageCitation === void 0 ? void 0 : imageCitation[(imageCitation === null || imageCitation === void 0 ? void 0 : imageCitation.length) - 1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("p", { style: { margin: 0 } },
            react_1["default"].createElement("i", null, name),
            ", ",
            description),
        imageUrl ? react_1["default"].createElement(antd_1.Collapse, { style: { marginBottom: 10 } },
            react_1["default"].createElement(Panel, { header: "Example taken from [" + citation + "]", key: "1" },
                react_1["default"].createElement(antd_1.Image, { src: "" + (process.env.PUBLIC_URL + "/explanation_types_examples/") + imageUrl, style: { width: "100%" } }))) : null));
}
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
        setShowJson(form["Type of Data"].length > 0
            && form["Type of Explanation"].length > 0
            && form["Type of Model to be Explained"].length > 0
            && form["Type of Problem"].length > 0
            && form["Type of Task"].length > 0
            && form["Method used to explain"].length > 0
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
    function handleChangeProblem(value) {
        dispatch(redux_1.formActions.setProblem(utils_1.fromSelectValue(value)));
    }
    function handleChangeModel(value) {
        dispatch(redux_1.formActions.setModel(utils_1.fromSelectValue(value)));
    }
    function handleChangeTask(value) {
        dispatch(redux_1.formActions.setTask(utils_1.fromSelectValue(value)));
    }
    function handleChangeExplanation(value) {
        dispatch(redux_1.formActions.setExplanation(utils_1.fromSelectValue(value)));
    }
    function handleChangeMethod(value) {
        dispatch(redux_1.formActions.setMethod(utils_1.fromSelectValue(value)));
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
        react_1["default"].createElement("aside", { className: "data-status-inline" },
            react_1["default"].createElement("strong", null, "Schema migration pending:"),
            " this form currently generates entries using the original XAI fields. Wait for the KGQA metadata schema before using it for KGQA records."),
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
                    react_1["default"].createElement(Item, { label: "Type of Data", tooltip: {
                            title: "What Datatypes the model in the paper uses. A combination of multiple flags is possible.",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        }, required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Type of Data", enumerator: types_1.Data, handleChange: handleChangeData, value: form["Type of Data"] })),
                    react_1["default"].createElement(Item, { label: "Type of Problem", required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Type of Problem", enumerator: types_1.Problem, handleChange: handleChangeProblem, value: form["Type of Problem"] }),
                        react_1["default"].createElement(antd_1.Collapse, null,
                            react_1["default"].createElement(Panel, { header: "Info", key: "1" },
                                react_1["default"].createElement("p", null, "What type of problems a XAI method can solve are solved in the paper. With at least one of the following flags. These four problem types are based on the taxonomy of Guidotti et. al.[8]"),
                                react_1["default"].createElement("p", null,
                                    react_1["default"].createElement("i", null, "Model Explanation"),
                                    ", globally explaining model \uD835\uDC53 through an interpretable, predictive model."),
                                react_1["default"].createElement("p", null,
                                    react_1["default"].createElement("i", null, "Model Inspection"),
                                    ", globally explaining some specific property of model \uD835\uDC53 or its prediction."),
                                react_1["default"].createElement("p", null,
                                    react_1["default"].createElement("i", null, "Outcome Explanation"),
                                    ", explaining an outcome/prediction of \uD835\uDC53 on a particular input instance."),
                                react_1["default"].createElement("p", null,
                                    react_1["default"].createElement("i", null, "Transparent Box Design"),
                                    ", the explanation method is an interpretable model (i.e., \uD835\uDC52 = \uD835\uDC53 ) also making the predictions.")))),
                    react_1["default"].createElement(Item, { label: "Type of Model to be Explained", tooltip: {
                            title: "What type of AI model is used in the paper. A combination of multiple flags is possible.",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        }, required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Type of Model to be Explained", enumerator: types_1.Model, handleChange: handleChangeModel, value: form["Type of Model to be Explained"] })),
                    react_1["default"].createElement(Item, { label: "Type of Task", tooltip: {
                            title: "What is the task of the AI model in the paper. A combination of multiple flags is possible.",
                            icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null)
                        }, required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Type of Task", enumerator: types_1.Task, handleChange: handleChangeTask, value: form["Type of Task"] })),
                    react_1["default"].createElement(Item, { label: "Method used to explain", required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Method used to explain", enumerator: types_1.Method, handleChange: handleChangeMethod, value: form["Method used to explain"] }),
                        react_1["default"].createElement(antd_1.Collapse, null,
                            react_1["default"].createElement(Panel, { header: "Info", key: "1" },
                                react_1["default"].createElement("p", null,
                                    "What method is used to explain the AI model. ",
                                    react_1["default"].createElement("br", null),
                                    react_1["default"].createElement("i", null, "Post-hoc Explanation Method"),
                                    ", Post-hoc explanation methods (also called reverse engineering): explain an already trained predictive model."),
                                react_1["default"].createElement("p", null,
                                    react_1["default"].createElement("i", null, "Built-in Interpretability"),
                                    ", Interpretability built into the predictive model, such as white-box models, attention mechanisms or interpretability constraints (e.g. sparsity) included in the training process of the predictive model."),
                                react_1["default"].createElement("p", null,
                                    react_1["default"].createElement("i", null, "Supervised Explanation Training"),
                                    ", where a ground-truth explanation is provided in order to train the model to output an explanation.")))),
                    react_1["default"].createElement(Item, { label: "Type of Explanation", required: true },
                        react_1["default"].createElement(components_1.Select, { placeholder: "Type of Explanation", enumerator: types_1.Explanation, handleChange: handleChangeExplanation, value: form["Type of Explanation"] }),
                        react_1["default"].createElement(antd_1.Collapse, null,
                            react_1["default"].createElement(Panel, { header: "Info", key: "1" },
                                react_1["default"].createElement("p", null, "What type of explanation is used to explain the AI model. A combination of multiple flags is possible."),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Decision Rules", description: "Logical rules, including decision sets[16], anchors[24], decision tables[13] and programs[31].", imageUrl: "decision_rules_16.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Decision Tree", description: "Rooted graph with conditional statement at each node, e.g. ProtoTree [19].", imageUrl: "decision_tree_19.png" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Disentanglement", description: "Disentangled representation, where each disjoint feature might have a semantic meaning. E.g. InfoGAN [5].", imageUrl: "disentanglement_5.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Feature Importance", description: "Set of 1-dimensional non-binary values/scores to indicate feature relevance, feature contribution or attribution. A feature is not necessarily an input feature to predictive model \uD835\uDC53 , but it should be a feature in the explanation. Examples include SHAP[18] and importance scores by LIME[23].", imageUrl: "feature_importance_22.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Feature Plot", description: "Plot or figure showing relations or interactions between features or between feature(s) and outcome. Examples include Partial Dependence Plot[7], Individual Conditional Expectation plot[9] and Feature Auditing[1].", imageUrl: "feature_plot_9.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Graph", description: "Graphical network structure with nodes and edges, e.g. Abstract Policy Graph[28], Knowledge Graph[32], Flow Graph[25] and Finite State Automata[11].", imageUrl: "graph_27.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Heatmap", description: "Map with at least 2 dimensions visually highlighting non-binary feature attribution, activation, sensitivity, attention or saliency. Includes attention maps[26], perturbation masks [6] and Layer-Wise Relevance Propagation [2].", imageUrl: "heatmap_25.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Localization", description: "Binary feature importance. Features can be any type of covariate used in the explanation, such as words, tabular features, or bounding boxes. Examples include binary maps with image patches[23], segmentation[12] and bounding boxes[33].", imageUrl: "Localization_22.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Prototypes", description: "(Parts of) Representative examples, including concepts[15], influential training instances[10], prototypical parts [4, 19], nearest neighbors and criticisms[14].", imageUrl: "prototypes_14.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Representation Synthesis", description: "Artificially produced visualization to explain representations of the predictive model. Examples include generated data samples[27], Activation Maximization[20] and feature visualization[21].", imageUrl: "representation_synthesis_33.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Representation Visualization", description: "Charts or plots to visualize representations of the predictive model, including visualizations of dimensionality reduction with scatter plots[30], visual cluster analysis[17] and Principal Component Analysis.", imageUrl: "representation_visualization_29.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Text", description: "Textual explanation via natural language [3, 22].", imageUrl: "text_21.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "White-box Model", description: "Intrinsically interpretable models (excluding decision rules). Predictive model \uD835\uDC53 is interpretable and therefore acts as explanation. Examples include a scoring sheet[29] and linear regression. Decision Rules and Decision Trees do not fall into this category, since they are categories on their own.", imageUrl: "white_box_model_28.PNG" }),
                                react_1["default"].createElement(TypeOfExplanation, { name: "Other", description: "Explanation that do not fit any other category." })))),
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
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[1] Philip Adler, Casey Falk, Sorelle A Friedler, Tionney Nix, Gabriel Rybeck, Carlos Scheidegger, Brandon Smith, and Suresh Venkatasubramanian. Auditing black-box models for indirect influence. Knowledge and Information Systems, 54(1):95\u2013122, 2018."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[2] Sebastian Bach, Alexander Binder, Gr\u00E9goire Montavon, Frederick Klauschen, Klaus-Robert M\u00FCller, and Wojciech Samek. On pixel-wise explanations for non-linear classifier decisions by layer-wise relevance propagation. PLOS ONE, 10(7):1\u201346, 07 2015."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[3] Oana-Maria Camburu, Tim Rockt\u00E4schel, Thomas Lukasiewicz, and Phil Blunsom. e-snli: Natural language inference with natural language explanations. In Samy Bengio, Hanna M. Wallach, Hugo Larochelle, Kristen Grauman, Nicol\u00F2 Cesa-Bianchi, and Roman Garnett, editors, Advances in Neural Information Processing Systems 31: Annual Conference on Neural Information Processing Systems 2018, NeurIPS 2018, December 3-8, 2018, 36 Nauta et al. Montr\u00E9al, Canada, pages 9560\u20139572, 2018."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[4] Chaofan Chen, Oscar Li, Daniel Tao, Alina Barnett, Cynthia Rudin, and Jonathan Su. This looks like that: Deep learning for interpretable image recognition. In Hanna M. Wallach, Hugo Larochelle, Alina Beygelzimer, Florence d\u2019Alch\u00E9-Buc, Emily B. Fox, and Roman Garnett, editors, Advances in Neural Information Processing Systems 32: Annual Conference on Neural Information Processing Systems 2019, NeurIPS 2019, December 8-14, 2019, Vancouver, BC, Canada, pages 8928\u20138939, 2019."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[5] Xi Chen, Yan Duan, Rein Houthooft, John Schulman, Ilya Sutskever, and Pieter Abbeel. Infogan: Interpretable representation learning by information maximizing generative adversarial nets. In Daniel D. Lee, Masashi Sugiyama, Ulrike von Luxburg, Isabelle Guyon, and Roman Garnett, editors, Advances in Neural Information Processing Systems 29: Annual Conference on Neural Information Processing Systems 2016, December 5-10, 2016, Barcelona, Spain, pages 2172\u20132180, 2016."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[6] Ruth C. Fong and Andrea Vedaldi. Interpretable explanations of black boxes by meaningful perturbation. In IEEE International Conference on Computer Vision, ICCV 2017, Venice, Italy, October 22-29, 2017, pages 3449\u20133457. IEEE Computer Society, 2017."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[7] Jerome H. Friedman. Greedy function approximation: A gradient boosting machine. The Annals of Statistics, 29(5):1189\u20131232, 2001."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[8] Riccardo Guidotti, Anna Monreale, Salvatore Ruggieri, Franco Turini, Fosca Giannotti, and Dino Pedreschi. A survey of methods for explaining black box models. ACM computing surveys (CSUR), 51(5):1\u201342, 2018."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[9] Alex Goldstein, Adam Kapelner, Justin Bleich, and Emil Pitkin. Peeking inside the black box: Visualizing statistical learning with plots of individual conditional expectation. Journal of Computational and Graphical Statistics, 24(1):44\u201365, 2015."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[10] Xiaochuang Han, Byron C. Wallace, and Yulia Tsvetkov. Explaining black box predictions and unveiling data artifacts through influence functions. In Dan Jurafsky, Joyce Chai, Natalie Schluter, and Joel R. Tetreault, editors, Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics, ACL 2020, Online, July 5-10, 2020, pages 5553\u20135563. Association for Computational Linguistics, 2020."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[11] Bo-Jian Hou and Zhi-Hua Zhou. Learning with interpretable structure from gated rnn. IEEE Transactions on Neural Networks and Learning Systems, 31(7):2267\u20132279, 2020."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[12] Lukas Hoyer, Mauricio Munoz, Prateek Katiyar, Anna Khoreva, and Volker Fischer. Grid saliency for context explanations of semantic segmentation. In Hanna M. Wallach, Hugo Larochelle, Alina Beygelzimer, Florence d\u2019Alch\u00E9-Buc, Emily B. Fox, and Roman Garnett, editors, Advances in Neural Information Processing Systems 32: Annual Conference on Neural Information Processing Systems 2019, NeurIPS 2019, December 8-14, 2019, Vancouver, BC, Canada, pages 6459\u20136470, 2019."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[13] Johan Huysmans, Karel Dejaeger, Christophe Mues, Jan Vanthienen, and Bart Baesens. An empirical evaluation of the comprehensibility of decision table, tree and rule based predictive models. Decision Support Systems, 51(1):141\u2013154, April 2011."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[14] Been Kim, Oluwasanmi Koyejo, and Rajiv Khanna. Examples are not enough, learn to criticize! criticism for interpretability. In Daniel D. Lee, Masashi Sugiyama, Ulrike von Luxburg, Isabelle Guyon, and Roman Garnett, editors, Advances in Neural Information Processing Systems 29: Annual Conference on Neural Information Processing Systems 2016, December 5-10, 2016, Barcelona, Spain, pages 2280\u20132288, 2016."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[15] Been Kim, Martin Wattenberg, Justin Gilmer, Carrie J. Cai, James Wexler, Fernanda B. Vi\u00E9gas, and Rory Sayres. Interpretability beyond feature attribution: Quantitative testing with concept activation vectors (TCAV). In Jennifer G. Dy and Andreas Krause, editors, Proceedings of the 35th International Conference on Machine Learning, ICML 2018, Stockholmsm\u00E4ssan, Stockholm, Sweden, July 10-15, 2018, volume 80 of Proceedings of Machine Learning Research, pages 2673\u20132682. PMLR, 2018."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[16] Himabindu Lakkaraju, Stephen H. Bach, and Jure Leskovec. Interpretable decision sets: A joint framework for description and prediction. In Balaji Krishnapuram, Mohak Shah, Alexander J. Smola, Charu C. Aggarwal, Dou Shen, and Rajeev Rastogi, editors, Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, San Francisco, CA, USA, August 13-17, 2016, pages 1675\u20131684. ACM, 2016."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[17] Haoyu Liu, Fenglong Ma, Yaqing Wang, Shibo He, Jiming Chen, and Jing Gao. Lp-explain: Local pictorial explanation for outliers. In Claudia Plant, Haixun Wang, Alfredo Cuzzocrea, Carlo Zaniolo, and Xindong Wu, editors, 20th IEEE International Conference on Data Mining, ICDM 2020, Sorrento, Italy, November 17-20, 2020, pages 372\u2013381. IEEE, 2020."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[18] Scott M. Lundberg and Su-In Lee. A unified approach to interpreting model predictions. In Isabelle Guyon, Ulrike von Luxburg, Samy Bengio, Hanna M. Wallach, Rob Fergus, S. V. N. Vishwanathan, and Roman Garnett, editors, Advances in Neural Information Processing Systems 30: Annual Conference on Neural Information Processing Systems 2017, December 4-9, 2017, Long Beach, CA, USA, pages 4765\u20134774, 2017."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[19] Meike Nauta, Ron van Bree, and Christin Seifert. Neural prototype trees for interpretable fine-grained image recognition. In 2021 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages 14928\u201314938, 2021. Anh Nguyen, Alexey Dosovitskiy, Jason Yosinski, Thomas Brox, and Jeff Clune. Synthesizing the preferred inputs for neurons in neural networks via deep generator networks. In D. Lee, M. Sugiyama, U. Luxburg, I. Guyon, and R. Garnett, editors, Advances in Neural Information Processing Systems, volume 29. Curran Associates, Inc., 2016."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[20] Chris Olah, Alexander Mordvintsev, and Ludwig Schubert. Feature visualization. Distill, 2017. https://distill.pub/2017/feature-visualization."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[21] Nazneen Fatema Rajani, Bryan McCann, Caiming Xiong, and Richard Socher. Explain yourself! leveraging language models for commonsense reasoning. In Anna Korhonen, David R. Traum, and Llu\u00EDs M\u00E0rquez, editors, Proceedings of the 57th Conference of the Association for Computational Linguistics, ACL 2019, Florence, Italy, July 28- August 2, 2019, Volume 1: Long Papers, pages 4932\u20134942. Association for Computational Linguistics, 2019."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[22] Marco T\u00FAlio Ribeiro, Sameer Singh, and Carlos Guestrin. \"why should I trust you?\": Explaining the predictions of any classifier. In Balaji Krishnapuram, Mohak Shah, Alexander J. Smola, Charu C. Aggarwal, Dou Shen, and Rajeev Rastogi, editors, Proceedings of the 22nd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, San Francisco, CA, USA, August 13-17, 2016, pages 1135\u20131144. ACM, 2016."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[23] Marco T\u00FAlio Ribeiro, Sameer Singh, and Carlos Guestrin. Anchors: High-precision model-agnostic explanations. In Sheila A. McIlraith and Kilian Q. Weinberger, editors, Proceedings of the Thirty-Second AAAI Conference on Artificial Intelligence, (AAAI-18), the 30th innovative Applications of Artificial Intelligence (IAAI-18), and the 8th AAAI Symposium on Educational Advances in Artificial Intelligence (EAAI-18), New Orleans, Louisiana, USA, February 2-7, 2018, pages 1527\u20131535. AAAI Press, 2018."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[24] Raif M. Rustamov and James T. Klosowski. Interpretable graph-based semi-supervised learning via flows. In Sheila A. McIlraith and Kilian Q. Weinberger, editors, Proceedings of the Thirty-Second AAAI Conference on Artificial Intelligence, (AAAI-18), the 30th innovative Applications of Artificial Intelligence (IAAI-18), and the 8th AAAI Symposium on Educational Advances in Artificial Intelligence (EAAI-18), New Orleans, Louisiana, USA, February 2-7, 2018, pages 3976\u20133983. AAAI Press, 2018."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[25] Ramprasaath R. Selvaraju, Michael Cogswell, Abhishek Das, Ramakrishna Vedantam, Devi Parikh, and Dhruv Batra. Grad-cam: Visual explanations from deep networks via gradient-based localization. In IEEE International Conference on Computer Vision, ICCV 2017, Venice, Italy, October 22-29, 2017, pages 618\u2013626. IEEE Computer Society, 2017."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[26] Sumedha Singla, Brian Pollack, Junxiang Chen, and Kayhan Batmanghelich. Explanation by progressive exaggeration. In 8th International Conference on Learning Representations, ICLR 2020, Addis Ababa, Ethiopia, April 26-30, 2020. OpenReview.net, 2020."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[27] Nicholay Topin and Manuela Veloso. Generation of policy-level explanations for reinforcement learning. In The Thirty-Third AAAI Conference on Artificial Intelligence, AAAI 2019, The Thirty-First Innovative Applications of Artificial Intelligence Conference, IAAI 2019, The Ninth AAAI Symposium on Educational Advances in Artificial Intelligence, EAAI 2019, Honolulu, Hawaii, USA, January 27 - February 1, 2019, pages 2514\u20132521. AAAI Press, 2019."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[28] Berk Ustun and Cynthia Rudin. Optimized risk scores. In Proceedings of the 23rd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, KDD \u201917, page 1125\u20131134, New York, NY, USA, 2017. Association for Computing Machinery"),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[29] Laurens van der Maaten and Geoffrey Hinton. Visualizing data using t-sne. Journal of Machine Learning Research, 9(86):2579\u20132605, 2008"),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[30] Ramakrishna Vedantam, Karan Desai, Stefan Lee, Marcus Rohrbach, Dhruv Batra, and Devi Parikh. Probabilistic neural symbolic models for interpretable visual question answering. In Kamalika Chaudhuri and Ruslan Salakhutdinov, editors, Proceedings of the 36th International Conference on Machine Learning, ICML 2019, 9-15 June 2019, Long Beach, California, USA, volume 97 of Proceedings of Machine Learning Research, pages 6428\u20136437. PMLR, 2019."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[31] Xiang Wang, Dingxian Wang, Canran Xu, Xiangnan He, Yixin Cao, and Tat-Seng Chua. Explainable reasoning over knowledge graphs for recommendation. In The Thirty-Third AAAI Conference on Artificial Intelligence, AAAI 2019, The Thirty-First Innovative Applications of Artificial Intelligence Conference, IAAI 2019, The Ninth AAAI Symposium on Educational Advances in Artificial Intelligence, EAAI 2019, Honolulu, Hawaii, USA, January 27 - February 1, 2019, pages 5329\u20135336. AAAI Press, 2019."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[32] Quanshi Zhang, Ruiming Cao, Ying Nian Wu, and Song-Chun Zhu. Growing interpretable part graphs on convnets via multi-shot learning. In Satinder P. Singh and Shaul Markovitch, editors, Proceedings of the Thirty-First AAAI Conference on Artificial Intelligence, February 4-9, 2017, San Francisco, California, USA, pages 2898\u20132906. AAAI Press, 2017."),
            react_1["default"].createElement("p", { style: { margin: 0 } }, "[33] Anh Nguyen, Alexey Dosovitskiy, Jason Yosinski, Thomas Brox, and Jeff Clune. Synthesizing the preferred inputs for neurons in neural networks via deep generator networks. In D. Lee, M. Sugiyama, U. Luxburg, I. Guyon, and R. Garnett, editors, Advances in Neural Information Processing Systems, volume 29. Curran Associates, Inc., 2016."))));
}
exports["default"] = AddPaper;
