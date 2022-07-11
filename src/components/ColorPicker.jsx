import { useState, useRef, useEffect } from "react";
import { useWindowWidth } from "../hooks/useWindowWidth";
import styled from "styled-components";

const ColorPicker = ({ colorHSLHue, setColorRGBRange }) => {
  const [down, setDown] = useState(false);

  const [selectedPointer, setSelectedPointer] = useState("");

  const [pointers, setPointers] = useState({
    pointer1: { x: 105, y: 28 },
    pointer2: { x: 136, y: 120 },
    pointer3: { x: 213, y: 103 },
    pointer4: { x: 212, y: 37 },
  });

  const canvasRef = useRef(null);

  const width = useWindowWidth() || window.innerWidth;
  const height = 500;

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
  }, [colorHSLHue, pointers, setColorRGBRange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = `hsl(${colorHSLHue[0]}, 100%, 50%)`;
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
  }, [width, colorHSLHue]);

  const handleDown = (pointer) => {
    setDown(true);
    setSelectedPointer(pointer);
  };

  const handleMove = (e) => {
    if (down) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();

      const x =
        e.type === "touchmove"
          ? e.changedTouches[0].clientX - rect.left
          : e.clientX - rect.left;

      const y =
        e.type === "touchmove"
          ? e.changedTouches[0].clientY - rect.top
          : e.clientY - rect.top;

      setPointers((prevState) => ({
        ...prevState,
        [selectedPointer]: { x, y },
      }));
    }
  };

  const handleUp = () => {
    setDown(false);
    setSelectedPointer("");
  };

  return (
    <Container
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={handleUp}
      onTouchEnd={handleUp}
    >
      <canvas ref={canvasRef} width={width} height={height} />

      <svg width={width} height={height}>
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
          onMouseDown={() => handleDown("pointer1")}
          onTouchStart={() => handleDown("pointer1")}
          cx={pointers.pointer1.x}
          cy={pointers.pointer1.y}
          r={6}
        />

        <circle
          onMouseDown={() => handleDown("pointer2")}
          onTouchStart={() => handleDown("pointer2")}
          cx={pointers.pointer2.x}
          cy={pointers.pointer2.y}
          r={6}
        />

        <circle
          onMouseDown={() => handleDown("pointer3")}
          onTouchStart={() => handleDown("pointer3")}
          cx={pointers.pointer3.x}
          cy={pointers.pointer3.y}
          r={6}
        />

        <circle
          onMouseDown={() => handleDown("pointer4")}
          onTouchStart={() => handleDown("pointer4")}
          cx={pointers.pointer4.x}
          cy={pointers.pointer4.y}
          r={6}
        />
      </svg>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;

  svg {
    position: absolute;
    top: 0;
    left: 0;

    line {
      stroke: #ffffff;
      stroke-width: 2;
    }

    circle {
      fill: #ffffff;
      cursor: pointer;
    }
  }
`;

export default ColorPicker;
