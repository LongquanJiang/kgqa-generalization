import { isPaper } from "../utils"
import { Paper, Venue } from "../types"

const paper: Paper = {
	Title: "Example",
	url: "https://example.com",
	Year: "2024",
	Venue: { isOld: true, value: Venue.AAAI },
	Authors: ["Author"],
	"Type of Data": [],
	"Type of Problem": [],
	"Type of Model to be Explained": [],
	"Type of Task": [],
	"Type of Explanation": [],
	"Method used to explain": [],
	Abstract: ""
}

describe("isPaper", () => {
	it("accepts a valid paper", () => {
		expect(isPaper(paper)).toBe(true)
	})

	it.each([null, "paper", 42])("rejects non-object input: %s", (value) => {
		expect(isPaper(value)).toBe(false)
	})
})
