import { useState, useRef, useEffect } from "react";
import { isBetween } from "../utils/isBetween";
import { RGBToHSL } from "../utils/RGBToHSL";
import styled from "styled-components";

function Hue({ setColorHSLHue }) {
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef(null);

  const width = 250;
  const height = 10;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const gradient = context.createLinearGradient(0, 0, width, 0);

    for (let i = 0; i <= 360; i += 30) {
      gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }, []);

  const handleHue = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x =
      e.type === "touchmove"
        ? e.changedTouches[0].clientX - rect.left
        : e.clientX - rect.left;

    const y =
      e.type === "touchmove"
        ? e.changedTouches[0].clientY - rect.top
        : e.clientY - rect.top;

    const { data: RGBData } = context.getImageData(x, y, 1, 1);

    const red = RGBData[0];
    const green = RGBData[1];
    const blue = RGBData[2];

    if (isBetween(x, 0, width - 0.1) && isBetween(y, 0, height - 0.1)) {
      setColorHSLHue(RGBToHSL(red, green, blue));
    }
  };

  const handleDown = () => {
    setDragging(true);
  };

  const handleMove = (e) => {
    if (dragging) {
      handleHue(e);
    }
  };

  const handleUp = () => {
    setDragging(false);
  };

  return (
    <Container>
      <canvas
        onClick={handleHue}
        onMouseDown={handleDown}
        onTouchStart={handleDown}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseUp={handleUp}
        onTouchEnd={handleUp}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  touch-action: none;
  margin-top: 2rem;

  canvas {
    cursor: pointer;
  }
`;

export default Hue;
