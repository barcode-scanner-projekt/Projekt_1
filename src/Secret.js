import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { ScanCount } from "./App";


export const SecretHook = () => {
	const scanCount = useAtomValue(ScanCount);


	useEffect(() => {
		const searchAndReplace = (rootNode) => {
			const walker = document.createTreeWalker(
				rootNode,
				NodeFilter.SHOW_TEXT,
				null,
				false
			);

			let currentNode;
			while ((currentNode = walker.nextNode())) {
				if (currentNode.nodeValue.includes("Simon Wandel")) {
					currentNode.nodeValue = currentNode.nodeValue.replace(
						/Simon Wandel/g,
						"Slajmon Schwandel"
					);
				}
			}
		};

		// Call the function on the entire document body or a specific container
		searchAndReplace(document.body);
	}, [scanCount]);
};
