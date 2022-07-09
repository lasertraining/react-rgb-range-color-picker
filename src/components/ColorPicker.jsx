import { useRef, useEffect } from "react";
import styled from "styled-components";

const ColorPicker = ({ colorHSL }) => {
  const canvasRef = useRef(null);

  const width = 500;
  const height = 240;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = `hsl(${colorHSL[0]}, 100%, 50%)`;
    context.fillRect(0, 0, width, height);

    const whiteGradient = context.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, "hsla(0, 0%, 100%, 100%)");
    whiteGradient.addColorStop(1, "hsla(0, 0%, 100%, 0%)");
    context.fillStyle = whiteGradient;
    context.fillRect(0, 0, width, height);

    const blackGradient = context.createLinearGradient(0, height, 0, 0);
    blackGradient.addColorStop(0, "hsla(0, 0%, 0%, 100%)");
    blackGradient.addColorStop(1, "hsla(0, 0%, 0%, 0%");
    context.fillStyle = blackGradient;
    context.fillRect(0, 0, width, height);
  }, [colorHSL]);

  return (
    <Container>
      <canvas ref={canvasRef} width={width} height={height} />
    </Container>
  );
};

const Container = styled.div`
  canvas {
    border-radius: 25px;
  }
`;

export default ColorPicker;
