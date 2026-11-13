"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("@ant-design/icons");
var utils_1 = require("../utils");
var focusAreas = [
    { number: "01", title: "Unseen entities", description: "Can a system answer when the question names entities absent from training?" },
    { number: "02", title: "Unseen relations", description: "How well does it handle graph predicates it has not encountered before?" },
    { number: "03", title: "New compositions", description: "Can known facts and relations be combined in unfamiliar ways?" },
    { number: "04", title: "Evaluation settings", description: "Which splits and protocols make generalization measurable?" }
];
var workflow = [
    {
        number: "01",
        Icon: icons_1.FilterOutlined,
        title: "Explore",
        text: "Search the paper catalog and narrow results with the available filters.",
        link: react_1["default"].createElement(react_router_dom_1.Link, { to: "/papers" },
            "Browse papers ",
            react_1["default"].createElement(icons_1.ArrowRightOutlined, { "aria-hidden": "true" }))
    },
    {
        number: "02",
        Icon: icons_1.FileAddOutlined,
        title: "Contribute",
        text: "Prepare a paper record and share it with the project through a pull request.",
        link: react_1["default"].createElement(react_router_dom_1.Link, { to: "/add-paper" },
            "Add a paper ",
            react_1["default"].createElement(icons_1.ArrowRightOutlined, { "aria-hidden": "true" }))
    },
    {
        number: "03",
        Icon: icons_1.CheckCircleOutlined,
        title: "Review",
        text: "Check new records and help keep the research index reliable.",
        link: react_1["default"].createElement("a", { href: utils_1.githubUrl + "/pulls", target: "_blank", rel: "noreferrer" },
            "Review on GitHub ",
            react_1["default"].createElement(icons_1.ExportOutlined, { "aria-hidden": "true" }))
    }
];
function Home() {
    return (react_1["default"].createElement("div", { className: "home-page" },
        react_1["default"].createElement("section", { className: "home-hero" },
            react_1["default"].createElement("div", { className: "home-hero-copy" },
                react_1["default"].createElement("div", { className: "eyebrow" },
                    react_1["default"].createElement("span", { className: "eyebrow-dot" }),
                    " OPEN RESEARCH WORKBENCH ",
                    react_1["default"].createElement("span", { className: "eyebrow-divider" }),
                    " KGQA"),
                react_1["default"].createElement("h1", null,
                    "Make Sense of",
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("span", null, "KGQA Generalization")),
                react_1["default"].createElement("p", { className: "home-intro" }, "A shared research index for understanding how knowledge graph question answering systems work beyond the entities, relations, and question patterns seen during training."),
                react_1["default"].createElement("div", { className: "home-actions" },
                    react_1["default"].createElement(react_router_dom_1.Link, { className: "button-primary", to: "/papers" },
                        "Explore papers ",
                        react_1["default"].createElement(icons_1.ArrowRightOutlined, { "aria-hidden": "true" })),
                    react_1["default"].createElement(react_router_dom_1.Link, { className: "text-link", to: "/charts" },
                        "View charts ",
                        react_1["default"].createElement(icons_1.ExportOutlined, { "aria-hidden": "true" }))),
                react_1["default"].createElement("p", { className: "home-citation" },
                    "Generalization settings include unseen knowledge base elements and new compositions. ",
                    react_1["default"].createElement("a", { href: "https://aclanthology.org/2025.emnlp-main.442/", target: "_blank", rel: "noreferrer" },
                        "Read a recent study ",
                        react_1["default"].createElement(icons_1.ExportOutlined, { "aria-hidden": "true" })))),
            react_1["default"].createElement("div", { className: "generalization-map", "aria-label": "KGQA generalization research areas" },
                react_1["default"].createElement("div", { className: "figure-heading" },
                    react_1["default"].createElement("span", null, "Research dimensions"),
                    react_1["default"].createElement("span", null, "01 / 04")),
                react_1["default"].createElement("div", { className: "map-hub" },
                    react_1["default"].createElement(icons_1.ShareAltOutlined, { "aria-hidden": "true" }),
                    react_1["default"].createElement("span", null, "KGQA"),
                    react_1["default"].createElement("small", null, "GENERALIZATION")),
                react_1["default"].createElement("div", { className: "map-areas" }, focusAreas.map(function (area) { return (react_1["default"].createElement("div", { className: "map-area", key: area.number },
                    react_1["default"].createElement("span", null, area.number),
                    react_1["default"].createElement("strong", null, area.title))); })),
                react_1["default"].createElement("p", { className: "map-caption" }, "A working lens for organizing papers, benchmarks, and evaluation settings."))),
        react_1["default"].createElement("aside", { className: "data-status-note", "aria-label": "Catalog data status" },
            react_1["default"].createElement("span", { className: "status-indicator", "aria-hidden": "true" }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("strong", null, "Catalog migration in progress"),
                react_1["default"].createElement("p", null, "This project is rebranded for KGQA Generalization. The bundled records and metadata fields still come from the original XAI catalog."))),
        react_1["default"].createElement("section", { className: "home-workflow", "aria-labelledby": "workflow-title" },
            react_1["default"].createElement("div", { className: "section-kicker" },
                react_1["default"].createElement("span", { id: "workflow-title" }, "Workbench"),
                react_1["default"].createElement("span", null, "01 \u2014 03")),
            react_1["default"].createElement("div", { className: "workflow-grid" }, workflow.map(function (_a) {
                var number = _a.number, Icon = _a.Icon, title = _a.title, text = _a.text, link = _a.link;
                return (react_1["default"].createElement("article", { className: "workflow-item", key: number },
                    react_1["default"].createElement("span", { className: "workflow-number" }, number),
                    react_1["default"].createElement(Icon, { className: "workflow-icon", "aria-hidden": "true" }),
                    react_1["default"].createElement("h2", null, title),
                    react_1["default"].createElement("p", null, text),
                    link));
            }))),
        react_1["default"].createElement("section", { className: "taxonomy-section", "aria-labelledby": "focus-title" },
            react_1["default"].createElement("div", { className: "taxonomy-intro" },
                react_1["default"].createElement("div", { className: "eyebrow" }, "A starting framework"),
                react_1["default"].createElement("h2", { id: "focus-title" }, "Where should a system generalize?"),
                react_1["default"].createElement("p", null, "These dimensions are an initial way to read the literature. The project can refine them as its KGQA dataset and taxonomy are established."),
                react_1["default"].createElement(react_router_dom_1.Link, { className: "text-link", to: "/papers" },
                    "Search the catalog ",
                    react_1["default"].createElement(icons_1.ArrowRightOutlined, { "aria-hidden": "true" }))),
            react_1["default"].createElement("ol", { className: "dimension-list" }, focusAreas.map(function (_a) {
                var number = _a.number, title = _a.title, description = _a.description;
                return (react_1["default"].createElement("li", { key: number },
                    react_1["default"].createElement("span", null, number),
                    react_1["default"].createElement("strong", null, title),
                    react_1["default"].createElement("small", null, description)));
            }))),
        react_1["default"].createElement("section", { className: "collection-notes", "aria-label": "Project notes" },
            react_1["default"].createElement("article", null,
                react_1["default"].createElement("div", { className: "eyebrow" }, "Research focus"),
                react_1["default"].createElement("p", null, "Knowledge graph question answering, with attention to transfer beyond familiar graph elements and question patterns.")),
            react_1["default"].createElement("article", null,
                react_1["default"].createElement("div", { className: "eyebrow" }, "Current records"),
                react_1["default"].createElement("p", null, "The source repository still contains its original explainable AI paper collection. KGQA records will need to be imported into a dedicated schema."),
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/papers" },
                    "View current records ",
                    react_1["default"].createElement(icons_1.ArrowRightOutlined, { "aria-hidden": "true" }))),
            react_1["default"].createElement("article", null,
                react_1["default"].createElement("div", { className: "eyebrow" }, "Community curation"),
                react_1["default"].createElement("p", null, "Use GitHub pull requests to propose and review updates to the collection."),
                react_1["default"].createElement("a", { href: utils_1.githubUrl + "/pulls", target: "_blank", rel: "noreferrer" },
                    "Open pull requests ",
                    react_1["default"].createElement(icons_1.ExportOutlined, { "aria-hidden": "true" }))))));
}
exports["default"] = Home;
