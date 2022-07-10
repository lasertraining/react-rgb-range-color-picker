import { useState, useRef, useEffect } from "react";
import { RGBToHSL } from "../utils/RGBToHSL";
import styled from "styled-components";

function Hue({ colorHSL, setColorHSL }) {
  const [value, setValue] = useState(0);

  const canvasRef = useRef(null);

  const width = 250;
  const height = 5;

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

  const handleColor = (e) => {
    const { value } = e.target;
    setValue(value);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { data } = context.getImageData(value, 0, 1, 1);
    const red = data[0];
    const green = data[1];
    const blue = data[2];

    setColorHSL(RGBToHSL(red, green, blue));
  };

  return (
    <Container>
      <canvas ref={canvasRef} width={width} height={height} />

      <Input
        type="range"
        value={value}
        onChange={handleColor}
        min="0"
        max={width - 1}
        width={width}
        height={height}
        color={`hsl(${colorHSL[0]},${colorHSL[1]}%, ${colorHSL[2]}%)`}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 2.5rem;

  canvas {
    border-radius: 50px;
  }
`;

const Input = styled.input.attrs(({ width, height }) => ({
  style: {
    width: `${width}px`,
    height: `${height}px`,
  },
}))`
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  background: none;
  border-radius: 50px;
  position: absolute;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: ${({ color }) => color};
    border-radius: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`;

export default Hue;
