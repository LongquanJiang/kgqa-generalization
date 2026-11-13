import { Filters } from "../redux/slices/filters"
import { Paper, Data, Problem, Model, Task, Explanation, Method, Venue } from "../types"
import { isSomeEnum, isEnumArray } from "./utils"

// Function that checks if an object is of type Paper. 
// Uses typescript typeguards to ensure that objects that pass the checks are actually given type Paper
export function isPaper(paper: unknown): paper is Paper {
	if (typeof paper !== "object" || paper === null) {
		return false
	}

	const candidate = paper as Record<string, unknown>
	const venue = candidate["Venue"]
	if (typeof venue !== "object" || venue === null) {
		return false
	}

	const venueRecord = venue as Record<string, unknown>
	return "url" in candidate
		&& "Title" in candidate
		&& "Year" in candidate
		&& "isOld" in venueRecord
		&& "value" in venueRecord
		&& (venueRecord["isOld"] === true && isSomeEnum(Venue)(venueRecord["value"]) || venueRecord["isOld"] === false)
		&& "Authors" in candidate
		&& isEnumArray(Data)(candidate["Type of Data"])
		&& isEnumArray(Problem)(candidate["Type of Problem"])
		&& isEnumArray(Model)(candidate["Type of Model to be Explained"])
		&& isEnumArray(Task)(candidate["Type of Task"])
		&& isEnumArray(Explanation)(candidate["Type of Explanation"])
		&& isEnumArray(Method)(candidate["Method used to explain"])
}

// Array of the type of X, used throughout the project for consistency
export const typeArray: (keyof Paper)[] = ["Type of Data", "Type of Problem", "Type of Model to be Explained", "Type of Task", "Type of Explanation", "Method used to explain"]

// Map from name of type object to type of X string
export const enumKeyMap: Record<keyof Omit<Filters, "filterStateAND" | "startYear" | "endYear" | "search" | "showOriginal" | "showNew" >, keyof Paper> = {
	data: "Type of Data", 
	problem: "Type of Problem", 
	model: "Type of Model to be Explained", 
	task: "Type of Task",
	explanation: "Type of Explanation",
	method: "Method used to explain",
	venue: "Venue",
}

// returns the dedicated color to the given type of X/Venue given. Colors are 
export const getColor = (type: keyof Paper) => {
	switch (type) {
	case "Type of Data":
		return "magenta"
        
	case "Type of Problem":
		return "green"

	case "Type of Model to be Explained":
		return "geekblue"

	case "Type of Task": 
		return "orange"

	case "Type of Explanation": 
		return "red"

	case "Method used to explain": 
		return "purple"

	case "Venue": 
		return "cyan"
                
	default:
		return "gold"
	}
}
