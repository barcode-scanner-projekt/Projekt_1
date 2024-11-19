import React, { useRef, useEffect } from "react";

const Bubbles = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		// Set canvas size to fill the window
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const bubbles = Array.from({ length: 150 }, () => ({
			x: Math.random() * canvas.width,
			y: canvas.height + Math.random() * canvas.height,
			radius: Math.random() * 45 + 5,
			speed: Math.random() * 0.5,
			opacity: Math.random() * 0.5 + 0.3,
		}));

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#4c1d95";
			ctx.fillRect(0,0, canvas.width, canvas.height);

			// Draw bubbles
			bubbles.forEach((bubble) => {
				ctx.beginPath();
				ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(177, 3, 252, ${bubble.opacity})`; // Light blue color
				ctx.fill();
				bubble.y -= bubble.speed;

				// Reset bubble to the bottom if it goes above the canvas
				if (bubble.y + bubble.radius < 0) {
					bubble.y = canvas.height + bubble.radius;
					bubble.x = Math.random() * canvas.width;
				}
			});

			requestAnimationFrame(animate);
		};

		animate();

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		// Resize canvas on window resize
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				zIndex: -1,
			}}
		/>
	);
};

export default Bubbles;
