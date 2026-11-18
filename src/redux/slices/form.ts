import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Data, Learning, Model, Paper, Venue } from "../../types"


const initialState: Paper & { Comment?: string } = {
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
}

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		setTitle(state, action: PayloadAction<string>) {
			state.Title = action.payload
		},
		setDoi(state, action: PayloadAction<string>) {
			state.url = action.payload
		},
		setYear(state, action: PayloadAction<number>) {
			state.Year = action.payload.toString()
		},
		setAuthors(state, action: PayloadAction<Array<string>>) {
			state.Authors = action.payload
		},
		setIsOldVenue(state, action: PayloadAction<boolean>) {
			state.Venue.isOld = action.payload
		},
		setVenue(state, action: PayloadAction<Venue | string>) {
			state.Venue.value = action.payload
		},
		setData(state, action: PayloadAction<Array<typeof Data>>) {
			state["Data Level Mechanisms"] = action.payload
		},
		setModel(state, action: PayloadAction<Array<typeof Model>>) {
			state["Model Level Mechanisms"] = action.payload
		},
		setLearning(state, action: PayloadAction<Array<typeof Learning>>) {
			state["Learning Level Mechanisms"] = action.payload
		},
		setAbstract(state, action: PayloadAction<string>) {
			state["Abstract"] = action.payload
		},
		setComment(state, action: PayloadAction<string>) {
			if (action.payload) {
				state.Comment = action.payload
			} else {
				delete state.Comment
			}
		}
	}
})

export const formReducer = formSlice.reducer
export const formActions = formSlice.actions
