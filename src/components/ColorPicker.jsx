import { useState, useRef, useEffect } from "react";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { norm } from "../utils/norm";
import styled from "styled-components";

const ColorPicker = ({ colorHSLHue, setColorRGBRange }) => {
  const [down, setDown] = useState(false);

  const [selectedPointer, setSelectedPointer] = useState("");

  const [pointers, setPointers] = useState({
    pointer1: { x: 0.7817708333333333, y: 0.206 },
    pointer2: { x: 0.6682291666666667, y: 0.134 },
    pointer3: { x: 0.6442708333333333, y: 0.336 },
    pointer4: { x: 0.725, y: 0.596 },
  });

  const canvasRef = useRef(null);

  const width = useWindowWidth() || window.innerWidth;
  const height = 500;

  const pointer1X = pointers.pointer1.x * width;
  const pointer1Y = pointers.pointer1.y * height;
  const pointer2X = pointers.pointer2.x * width;
  const pointer2Y = pointers.pointer2.y * height;
  const pointer3X = pointers.pointer3.x * width;
  const pointer3Y = pointers.pointer3.y * height;
  const pointer4X = pointers.pointer4.x * width;
  const pointer4Y = pointers.pointer4.y * height;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const { data: pointer1Data } = context.getImageData(
      pointer1X,
      pointer1Y,
      1,
      1
    );

    const { data: pointer2Data } = context.getImageData(
      pointer2X,
      pointer2Y,
      1,
      1
    );

    const { data: pointer3Data } = context.getImageData(
      pointer3X,
      pointer3Y,
      1,
      1
    );

    const { data: pointer4Data } = context.getImageData(
      pointer4X,
      pointer4Y,
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
  }, [colorHSLHue, setColorRGBRange, pointers]);

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

      const normalizedX = norm(x, 0, width);
      const normalizedY = norm(y, 0, height);

      setPointers((prevState) => ({
        ...prevState,
        [selectedPointer]: { x: normalizedX, y: normalizedY },
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
        <line x1={pointer1X} y1={pointer1Y} x2={pointer2X} y2={pointer2Y} />

        <line x1={pointer2X} y1={pointer2Y} x2={pointer3X} y2={pointer3Y} />

        <line x1={pointer3X} y1={pointer3Y} x2={pointer4X} y2={pointer4Y} />

        <line x1={pointer4X} y1={pointer4Y} x2={pointer1X} y2={pointer1Y} />

        <circle
          onMouseDown={() => handleDown("pointer1")}
          onTouchStart={() => handleDown("pointer1")}
          cx={pointer1X}
          cy={pointer1Y}
          r={6}
        />

        <circle
          onMouseDown={() => handleDown("pointer2")}
          onTouchStart={() => handleDown("pointer2")}
          cx={pointer2X}
          cy={pointer2Y}
          r={6}
        />

        <circle
          onMouseDown={() => handleDown("pointer3")}
          onTouchStart={() => handleDown("pointer3")}
          cx={pointer3X}
          cy={pointer3Y}
          r={6}
        />

        <circle
          onMouseDown={() => handleDown("pointer4")}
          onTouchStart={() => handleDown("pointer4")}
          cx={pointer4X}
          cy={pointer4Y}
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
