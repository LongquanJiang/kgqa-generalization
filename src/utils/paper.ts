import { Filters } from "../redux/slices/filters"
import { Paper, Data, Model, Learning, Venue } from "../types"
import { isSomeEnum, isEnumArray } from "./utils"

// Function that checks if an object is of type Paper. 
// Uses typescript typeguards to ensure that objects that pass the checks are actually given type Paper
export function isPaper(paper: any): paper is Paper {
	return "url" in paper 
        && "Title" in paper 
        && "Year" in paper 
        && "Venue" in paper 
		&& (paper["Venue"]["isOld"] && isSomeEnum(Venue)(paper["Venue"]["value"]) || !paper["Venue"]["isOld"])
        && "Authors" in paper 
        && "Data Level Mechanisms" in paper
        && isEnumArray(Data)(paper["Data Level Mechanisms"])
        && "Model Level Mechanisms" in paper
        && isEnumArray(Model)(paper["Model Level Mechanisms"])
        && "Learning Level Mechanisms" in paper
        && isEnumArray(Learning)(paper["Learning Level Mechanisms"])
}

// Array of the type of X, used throughout the project for consistency
export const typeArray: (keyof Paper)[] = ["Data Level Mechanisms", "Model Level Mechanisms", "Learning Level Mechanisms"]

// Map from name of type object to type of X string
export const enumKeyMap: Record<keyof Omit<Filters, "filterStateAND" | "startYear" | "endYear" | "search" | "showOriginal" | "showNew" >, keyof Paper> = {
	data: "Data Level Mechanisms", 
	model: "Model Level Mechanisms", 
	learning: "Learning Level Mechanisms",
	venue: "Venue",
}

// returns the dedicated color to the given type of X/Venue given. Colors are 
export const getColor = (type: keyof Paper) => {
	switch (type) {
	case "Data Level Mechanisms":
		return "magenta"
        
	case "Model Level Mechanisms":
		return "green"

	case "Learning Level Mechanisms":
		return "geekblue"

	case "Venue": 
		return "cyan"
                
	default:
		return "gold"
	}
}
