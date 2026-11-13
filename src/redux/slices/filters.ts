import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Venue } from "../../types"

export type Filters = {
    data: Array<string>
    problem: Array<string>
    model: Array<string>
    task: Array<string>
    explanation: Array<string>
    method: Array<string>
	venue: Array<Venue>
	startYear?: number
	endYear?: number
	search: string
    filterStateAND: boolean
	showOriginal: boolean
	showNew: boolean
}

const initialState: Filters = {
	data: [],
	problem: [],
	model: [],
	task: [],
	explanation: [],
	method: [],
	venue: [],
	startYear: undefined,
	endYear: undefined,
	search: "",
	filterStateAND: true,
	showOriginal: true,
	showNew: true
}

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: { 
		reset() {
			return initialState 
		},
		setData(state, action: PayloadAction<Array<string>>) {
			state.data = action.payload
		},
		setProblem(state, action: PayloadAction<Array<string>>) {
			state.problem = action.payload
		},
		setModel(state, action: PayloadAction<Array<string>>) {
			state.model = action.payload
		},
		setTask(state, action: PayloadAction<Array<string>>) {
			state.task = action.payload
		},
		setExplanation(state, action: PayloadAction<Array<string>>) {
			state.explanation = action.payload
		},
		setMethod(state, action: PayloadAction<Array<string>>) {
			state.method = action.payload
		},
		setVenue(state, action: PayloadAction<Array<Venue>>) {
			state.venue = action.payload
		},
		changeState(state, action: PayloadAction<boolean>) {
			state.filterStateAND = action.payload
		},
		setStartYear(state, action: PayloadAction<number | undefined>) {
			state.startYear = action.payload
		},
		setEndYear(state, action: PayloadAction<number | undefined>) {
			state.endYear = action.payload
		},
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload
		},
		setShowOriginal(state, action: PayloadAction<boolean>) {
			state.showOriginal = action.payload
		},
		setShowNew(state, action: PayloadAction<boolean>) {
			state.showNew = action.payload
		}
	}
})

export const filtersReducer = filtersSlice.reducer
export const filtersActions = filtersSlice.actions