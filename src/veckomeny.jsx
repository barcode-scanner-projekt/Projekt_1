import React, { useState, useEffect } from "react";
import axios from "axios";

const Veckomeny = () => {
	const [meals, setMeals] = useState({
		0: "Laddar...",
		1: "Laddar...",
		2: "Laddar...",
		3: "Laddar...",
		4: "Laddar...",
	});

	useEffect(() => {
		const fetchMeals = async () => {
			try {
				const response = await axios.get(
					"https://ntifoodpeople.vercel.app/api/food/week"
				);
				const apiData = response.data.items;
				const formattedMeals = {};

				apiData.forEach((item, idx) => {
					item.description = item.description.split("<br/>");
					formattedMeals[idx] = item.description;
				});

				setMeals(formattedMeals);
			} catch (error) {
				console.error("Fel vid hämtning av API-data:", error);
			}
		};

		fetchMeals();
	}, []);

	const currentDay = new Date().getDay() - 1;
	const glow = "drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]";

	return (
		<div className="w-2/5 ml-4 p-5 rounded-2xl text-right shadow-lg bg-black/55 backdrop-blur-md">
			<div className="text-lg font-bold text-white p-2 rounded mb-5">
				Veckans Lunch
			</div>
			<div className="space-y-2">
				{["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag"].map(
					(day, idx) => (
						<div
							className="flex justify-between text-white text-sm p-2 rounded gap-4 items-center"
							key={day}
						>
							<span
								className={`font-bold text-lg ${
									idx === currentDay
										? `text-purple-400 ${glow}`
										: ""
								}`}
							>
								{day}
							</span>
							<span
								className={`text-gray-200 text-base ${
									idx === currentDay
										? `text-purple-400 ${glow}`
										: ""
								}`}
							>
								{meals[idx][0] || "Ingen data"}
								<br />
								{meals[idx][1] || "Ingen data"}
							</span>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default Veckomeny;
