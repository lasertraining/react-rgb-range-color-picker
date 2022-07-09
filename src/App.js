import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

function App() {
  const [color, setColor] = useState("#ff0000");
  const [value, setValue] = useState(0);

  const width = 400;
  const height = 5;

  const canvasRef = useRef(null);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
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

    const context = canvasRef.current.getContext("2d");
    const { data } = context.getImageData(value, 0, 1, 1);
    const rgbColor = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";

    setColor(rgbColor);
  };

  return (
    <Wrapper>
      <Container>
        <Color style={{ backgroundColor: color }} />
        <ColorPicker>
          <canvas ref={canvasRef} width={width} height={height} />

          <Input
            type="range"
            min="0"
            value={value}
            max={width - 1}
            onChange={handleColor}
            color={color}
          />
        </ColorPicker>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #222222;
  border-radius: 35px;
  padding: 2rem;

  width: 500px;
  height: 350px;
`;

const Color = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

const ColorPicker = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  position: relative;

  canvas {
    border-radius: 50px;
  }
`;

const Input = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  outline: none;
  background: none;

  border-radius: 50px;
  width: 100%;
  height: 15px;

  position: absolute;

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default CSS styles */
    appearance: none;
    background-color: ${({ color }) => color};

    border-radius: 10px;
    width: 15px;
    height: 15px;

    cursor: pointer;
  }
`;

export default App;
