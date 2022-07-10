import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ColorPicker = ({ colorHSL, setColorRGBRange }) => {
  const [mouseIsDown, setMouseIsDown] = useState(false);

  const [selectedPointer, setSelectedPointer] = useState("");

  const [pointers, setPointers] = useState({
    pointer1: { x: 351, y: 40 },
    pointer2: { x: 384, y: 103 },
    pointer3: { x: 464, y: 64 },
    pointer4: { x: 423, y: 22 },
  });

  const canvasRef = useRef(null);

  const width = 500;
  const height = 240;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const { data: pointer1Data } = context.getImageData(
      pointers.pointer1.x,
      pointers.pointer1.y,
      1,
      1
    );

    const { data: pointer2Data } = context.getImageData(
      pointers.pointer2.x,
      pointers.pointer2.y,
      1,
      1
    );

    const { data: pointer3Data } = context.getImageData(
      pointers.pointer3.x,
      pointers.pointer3.y,
      1,
      1
    );

    const { data: pointer4Data } = context.getImageData(
      pointers.pointer4.x,
      pointers.pointer4.y,
      1,
      1
    );

    const red = [
      pointer1Data[0],
      pointer2Data[0],
      pointer3Data[0],
      pointer4Data[0],
    ];

    const green = [
      pointer1Data[1],
      pointer2Data[1],
      pointer3Data[1],
      pointer4Data[1],
    ];

    const blue = [
      pointer1Data[2],
      pointer2Data[2],
      pointer3Data[2],
      pointer4Data[2],
    ];

    setColorRGBRange({
      redMin: Math.min(...red),
      redMax: Math.max(...red),
      greenMin: Math.min(...green),
      greenMax: Math.max(...green),
      blueMin: Math.min(...blue),
      blueMax: Math.max(...blue),
    });
  }, [colorHSL, pointers]);

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

  const handleMouseDown = (pointer) => {
    setMouseIsDown(true);
    setSelectedPointer(pointer);
  };

  const handleMouseMove = (e) => {
    if (mouseIsDown) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;

      setPointers((prevState) => ({
        ...prevState,
        [selectedPointer]: { x, y },
      }));
    }
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
    setSelectedPointer("");
  };

  return (
    <Container>
      <canvas ref={canvasRef} width={width} height={height} />

      <Pointers>
        <svg
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <line
            x1={pointers.pointer1.x}
            y1={pointers.pointer1.y}
            x2={pointers.pointer2.x}
            y2={pointers.pointer2.y}
          />

          <line
            x1={pointers.pointer2.x}
            y1={pointers.pointer2.y}
            x2={pointers.pointer3.x}
            y2={pointers.pointer3.y}
          />

          <line
            x1={pointers.pointer3.x}
            y1={pointers.pointer3.y}
            x2={pointers.pointer4.x}
            y2={pointers.pointer4.y}
          />

          <line
            x1={pointers.pointer4.x}
            y1={pointers.pointer4.y}
            x2={pointers.pointer1.x}
            y2={pointers.pointer1.y}
          />

          <circle
            onMouseDown={() => handleMouseDown("pointer1")}
            cx={pointers.pointer1.x}
            cy={pointers.pointer1.y}
          />

          <circle
            onMouseDown={() => handleMouseDown("pointer2")}
            cx={pointers.pointer2.x}
            cy={pointers.pointer2.y}
          />

          <circle
            onMouseDown={() => handleMouseDown("pointer3")}
            cx={pointers.pointer3.x}
            cy={pointers.pointer3.y}
          />

          <circle
            onMouseDown={() => handleMouseDown("pointer4")}
            cx={pointers.pointer4.x}
            cy={pointers.pointer4.y}
          />
        </svg>
      </Pointers>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Pointers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  circle {
    r: 6;
    fill: #ffffff;
    cursor: pointer;
  }

  line {
    stroke: #ffffff;
    stroke-width: 2;
  }
`;

export default ColorPicker;
