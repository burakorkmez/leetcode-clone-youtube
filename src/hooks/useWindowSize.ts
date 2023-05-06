import { useEffect, useState } from "react";

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== "undefined" ? window.innerWidth : 1200,
		height: typeof window !== "undefined" ? window.innerHeight : 800,
	});

	function changeWindowSize() {
		if (typeof window !== "undefined") {
			setWindowSize({ width: window.innerWidth, height: window.innerHeight });
		}
	}

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("resize", changeWindowSize);

			return () => {
				window.removeEventListener("resize", changeWindowSize);
			};
		}
	}, []);

	return windowSize;
}
