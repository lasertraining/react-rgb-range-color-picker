import { useState, useRef, useEffect } from "react";
import { RGBToHSL } from "../utils/RGBToHSL";
import styled from "styled-components";

function Hue({ colorHSLHue, setColorHSLHue }) {
  const [rangeValue, setRangeValue] = useState("1");

  const canvasRef = useRef(null);

  const width = 250;
  const height = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const { data: RGBData } = context.getImageData(
      parseInt(rangeValue),
      0,
      1,
      1
    );

    const red = RGBData[0];
    const green = RGBData[1];
    const blue = RGBData[2];

    setColorHSLHue(RGBToHSL(red, green, blue));
  }, [rangeValue, setColorHSLHue]);

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

  return (
    <Container>
      <canvas ref={canvasRef} width={width} height={height} />

      <Input
        type="range"
        value={rangeValue}
        onChange={(e) => setRangeValue(e.target.value)}
        min="1"
        max={width - 1}
        width={width}
        height={height}
        color={`hsl(${colorHSLHue[0]},${colorHSLHue[1]}%, ${colorHSLHue[2]}%)`}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  margin-top: 5rem;

  canvas {
    border-radius: 50px;
  }
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;

  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};

  -webkit-appearance: none;
  appearance: none;
  outline: none;
  background: none;
  border-radius: 50px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: ${({ color }) => color};
    border-radius: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    background-color: ${({ color }) => color};
    border: none;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

export default Hue;
