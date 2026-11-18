"use strict";
exports.__esModule = true;
var react_dom_1 = require("react-dom");
var test_utils_1 = require("react-dom/test-utils");
var components_1 = require("../components");
var react_redux_1 = require("react-redux");
var redux_1 = require("../redux");
require("@testing-library/jest-dom");
var paper_1 = require("../types/paper");
var container = null;
var mouseClickEvents = ["mousedown", "click", "mouseup"];
function simulateMouseClick(element) {
    mouseClickEvents.forEach(function (mouseEventType) {
        return element.dispatchEvent(new MouseEvent(mouseEventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        }));
    });
}
describe("Test", function () {
    it("Checks filters", function () {
        // Render filters
        var filters = [paper_1.Data, paper_1.Model, paper_1.Learning];
        test_utils_1.act(function () {
            react_dom_1.render(React.createElement(react_redux_1.Provider, { store: redux_1.store },
                React.createElement(components_1.Filters, null)), container);
        });
        // Get all the dropdowns and click them
        var allDropdowns = document.querySelectorAll(".ant-select-selection-overflow");
        test_utils_1.act(function () {
            allDropdowns.forEach(function (elem) { return simulateMouseClick(elem); });
        });
        // for each tag, click the corresponding entry in the dropdown and check if it appears in the input box
        Object.values(paper_1.Data).forEach(function (element) {
            var btn = document.querySelector("[title='" + element + "']");
            expect(btn).not.toBeNull();
            test_utils_1.act(function () {
                simulateMouseClick(btn);
            });
            expect(btn).toHaveAttribute("aria-selected", "true");
            var allTags = Array.from(document.querySelectorAll(".ant-select-selection-overflow-item > span > span")).map(function (elem) { return elem.textContent; });
            expect(allTags).toContain(element);
        });
    });
});
beforeEach(function () {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(function () {
    // cleanup on exiting
    if (container !== null) {
        react_dom_1.unmountComponentAtNode(container);
        container.remove();
    }
    container = null;
});
