"use strict";
exports.__esModule = true;
exports.filtersActions = exports.filtersReducer = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    data: [],
    model: [],
    learning: [],
    venue: [],
    startYear: undefined,
    endYear: undefined,
    search: "",
    filterStateAND: true,
    showOriginal: true,
    showNew: true
};
var filtersSlice = toolkit_1.createSlice({
    name: "filters",
    initialState: initialState,
    reducers: {
        reset: function () {
            return initialState;
        },
        setData: function (state, action) {
            state.data = action.payload;
        },
        setModel: function (state, action) {
            state.model = action.payload;
        },
        setLearning: function (state, action) {
            state.learning = action.payload;
        },
        setVenue: function (state, action) {
            state.venue = action.payload;
        },
        changeState: function (state, action) {
            state.filterStateAND = action.payload;
        },
        setStartYear: function (state, action) {
            state.startYear = action.payload;
        },
        setEndYear: function (state, action) {
            state.endYear = action.payload;
        },
        setSearch: function (state, action) {
            state.search = action.payload;
        },
        setShowOriginal: function (state, action) {
            state.showOriginal = action.payload;
        },
        setShowNew: function (state, action) {
            state.showNew = action.payload;
        }
    }
});
exports.filtersReducer = filtersSlice.reducer;
exports.filtersActions = filtersSlice.actions;
