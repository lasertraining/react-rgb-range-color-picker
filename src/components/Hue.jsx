import { useRef, useEffect } from "react";
import { RGBToHSL } from "../utils/RGBToHSL";
import styled from "styled-components";

function Hue({ setColorHSLHue }) {
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

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { data: RGBData } = context.getImageData(x, y, 1, 1);

    const red = RGBData[0];
    const green = RGBData[1];
    const blue = RGBData[2];

    setColorHSLHue(RGBToHSL(red, green, blue));
  };

  return (
    <Container>
      <canvas
        onClick={handleHue}
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
  margin-top: 2rem;

  canvas {
    cursor: pointer;
  }
`;

export default Hue;
