import { useAtom } from "jotai";
import { StatsAtom } from "../App";

/**
[
	{
		week: "43",
		classesThatEatOften: [
			{
				class: "21",
				peoplePerWeek: 10,
			},
		],
	},
]
 */

const getWeek = () => {
	const now = new Date();
	const startOfYear = new Date(now.getFullYear(), 0, 1);
	const pastDaysOfYear = (now - startOfYear) / 86400000;
	
	// Calculate the current week number
	return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
}


export function useSaveStats() {
	const [statsAtom, setStatsAtom] = useAtom(StatsAtom);
	
	return (studentArray = []) => {
		const currentWeek = getWeek();
		const index = statsAtom.findIndex((element) => {
			return element.week === currentWeek
		})

		let newElement = {
			week: currentWeek,
			classesThatEatOften: []
		};
		// Using old week
		if (index !== -1) {
			newElement = statsAtom[index];
		}

		// Step 1: Use reduce to count occurrences of each sodXX pattern
		const patternCounts = studentArray.reduce((acc, item) => {
			// Extract the "sodXX" pattern
			const match = item.studentId.match(/^sod(\d{2})/); // Assumes pattern is "sod" followed by 2 digits
			if (match) {
				const pattern = match[1];
				// Increment count in the accumulator
				acc[pattern] = (acc[pattern] || 0) + 1;
			}
			return acc;
		}, {});

		// Step 2: Convert the patternCounts object into a list of { class: x, amount: y } objects
		const result = Object.entries(patternCounts).map(([key, value]) => ({
			class: key,
			peoplePerWeek: value
		}));


		const newList = newElement.classesThatEatOften.concat(result);

		const merged = newList.reduce((acc, item) => {
			// Check if the current class already exists in the accumulator
			const existing = acc.find(obj => obj.class === item.class);
			
			if (existing) {
				existing.peoplePerWeek += item.peoplePerWeek;
			} else {
				acc.push({ ...item });
			}
			
			return acc;
		}, []);

		newElement.classesThatEatOften = merged;
		const statsAtomCopy = [...statsAtom];

		const finalVersion = statsAtomCopy.map((element) => {
			if (element.week === newElement.week) {
				return newElement;
			} else {
				return element;
			}
		})

		if (finalVersion.length > 0) {
			setStatsAtom(finalVersion);
		} else {
			setStatsAtom([newElement])
		}
	};
}