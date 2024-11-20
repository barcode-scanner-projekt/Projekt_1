import React, { useRef, useEffect } from "react";

const Bubbles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to fill the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create bubbles
    const bubbles = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      radius: Math.random() * 70 + 30, // Bigger bubbles
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.5 + 0.5,
      isBlurry: Math.random() < 0.4, // 40% chance of being blurred
      gradientDirection: Math.random() < 0.5 ? "horizontal" : "vertical", // Random gradient direction
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#230035"; // Dark purple background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bubbles
      bubbles.forEach((bubble) => {
        // Apply blur filter for blurry bubbles
        if (bubble.isBlurry) {
          ctx.filter = "blur(8px)"; // Apply a blur to the circle
        } else {
          ctx.filter = "none"; // No blur for sharp bubbles
        }

        // Create a linear gradient
        const gradient =
          bubble.gradientDirection === "horizontal"
            ? ctx.createLinearGradient(
                bubble.x - bubble.radius, // Start left
                bubble.y, // Vertical center
                bubble.x + bubble.radius, // End right
                bubble.y
              )
            : ctx.createLinearGradient(
                bubble.x, // Horizontal center
                bubble.y - bubble.radius, // Start top
                bubble.x, // Horizontal center
                bubble.y + bubble.radius // End bottom
              );

        gradient.addColorStop(0, "rgba(255, 0, 172, 1)"); // Bright pink
        gradient.addColorStop(1, "rgba(57, 0, 82, 1)"); // Purple

        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;

        ctx.globalAlpha = bubble.opacity; // Set opacity for the bubble
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha for subsequent bubbles

        // Move the bubble
        bubble.y -= bubble.speed;

        // Reset bubble position if it moves out of view
        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
          bubble.isBlurry = Math.random() < 0.4; // Recalculate blur for new bubble
          bubble.gradientDirection =
            Math.random() < 0.5 ? "horizontal" : "vertical"; // Recalculate gradient direction
        }
      });

      ctx.filter = "none"; // Reset filter for the next frame
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
