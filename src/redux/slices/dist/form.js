"use strict";
exports.__esModule = true;
exports.formActions = exports.formReducer = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    Title: "",
    url: "",
    Year: "2020",
    Venue: {
        isOld: true,
        value: ""
    },
    Authors: [],
    "Data Level Mechanisms": [],
    "Model Level Mechanisms": [],
    "Learning Level Mechanisms": [],
    "Abstract": "",
    Date: new Date()
};
var formSlice = toolkit_1.createSlice({
    name: "form",
    initialState: initialState,
    reducers: {
        setTitle: function (state, action) {
            state.Title = action.payload;
        },
        setDoi: function (state, action) {
            state.url = action.payload;
        },
        setYear: function (state, action) {
            state.Year = action.payload.toString();
        },
        setAuthors: function (state, action) {
            state.Authors = action.payload;
        },
        setIsOldVenue: function (state, action) {
            state.Venue.isOld = action.payload;
        },
        setVenue: function (state, action) {
            state.Venue.value = action.payload;
        },
        setData: function (state, action) {
            state["Data Level Mechanisms"] = action.payload;
        },
        setModel: function (state, action) {
            state["Model Level Mechanisms"] = action.payload;
        },
        setLearning: function (state, action) {
            state["Learning Level Mechanisms"] = action.payload;
        },
        setAbstract: function (state, action) {
            state["Abstract"] = action.payload;
        },
        setComment: function (state, action) {
            if (action.payload) {
                state.Comment = action.payload;
            }
            else {
                delete state.Comment;
            }
        }
    }
});
exports.formReducer = formSlice.reducer;
exports.formActions = formSlice.actions;
