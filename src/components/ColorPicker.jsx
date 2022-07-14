import { useState, useRef, useEffect } from "react";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { norm } from "../utils/norm";
import { isBetween } from "../utils/isBetween";
import styled from "styled-components";

const ColorPicker = ({ colorHSLHue, setColorRGBRange }) => {
  const [pointers, setPointers] = useState({
    pointer1: { x: 0.9984375, y: 0 },
    pointer2: { x: 0.5302083333333333, y: 0 },
    pointer3: { x: 0.5994791666666667, y: 0.236 },
    pointer4: { x: 0.75625, y: 0.254 },
  });

  const canvasRef = useRef(null);
  const pointer1Ref = useRef(null);
  const pointer2Ref = useRef(null);
  const pointer3Ref = useRef(null);
  const pointer4Ref = useRef(null);

  let selectedPointer = "";
  let dragging = false;

  const width = useWindowWidth() || window.innerWidth;
  const height = 465;

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
  }, [colorHSLHue, width]);

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
  }, [colorHSLHue, pointers]);

  const handleDown = (e) => {
    const { id: pointer } = e.target;
    selectedPointer = pointer;
    dragging = true;
  };

  const handleMove = (e) => {
    if (dragging) {
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
        [selectedPointer]: {
          x: isBetween(normalizedX, 0, 0.999)
            ? normalizedX
            : prevState[selectedPointer].x,
          y: isBetween(normalizedY, 0, 0.999)
            ? normalizedY
            : prevState[selectedPointer].y,
        },
      }));
    }
  };

  useEffect(() => {
    pointer1Ref.current.addEventListener("mousedown", handleDown);
    pointer1Ref.current.addEventListener("touchstart", handleDown);
    pointer2Ref.current.addEventListener("mousedown", handleDown);
    pointer2Ref.current.addEventListener("touchstart", handleDown);
    pointer3Ref.current.addEventListener("mousedown", handleDown);
    pointer3Ref.current.addEventListener("touchstart", handleDown);
    pointer4Ref.current.addEventListener("mousedown", handleDown);
    pointer4Ref.current.addEventListener("touchstart", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      pointer1Ref.current.removeEventListener("mousedown", handleDown);
      pointer1Ref.current.removeEventListener("touchstart", handleDown);
      pointer2Ref.current.removeEventListener("mousedown", handleDown);
      pointer2Ref.current.removeEventListener("touchstart", handleDown);
      pointer3Ref.current.removeEventListener("mousedown", handleDown);
      pointer3Ref.current.removeEventListener("touchstart", handleDown);
      pointer4Ref.current.removeEventListener("mousedown", handleDown);
      pointer4Ref.current.removeEventListener("touchstart", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [selectedPointer, width]);

  const handleUp = () => {
    selectedPointer = "";
    dragging = false;
  };

  return (
    <Container>
      <canvas ref={canvasRef} width={width} height={height} />

      <svg width={width} height={height}>
        <line x1={pointer1X} y1={pointer1Y} x2={pointer2X} y2={pointer2Y} />
        <line x1={pointer2X} y1={pointer2Y} x2={pointer3X} y2={pointer3Y} />
        <line x1={pointer3X} y1={pointer3Y} x2={pointer4X} y2={pointer4Y} />
        <line x1={pointer4X} y1={pointer4Y} x2={pointer1X} y2={pointer1Y} />

        <circle
          id="pointer1"
          ref={pointer1Ref}
          cx={pointer1X}
          cy={pointer1Y}
          r={10}
        />
        <circle
          id="pointer2"
          ref={pointer2Ref}
          cx={pointer2X}
          cy={pointer2Y}
          r={10}
        />
        <circle
          id="pointer3"
          ref={pointer3Ref}
          cx={pointer3X}
          cy={pointer3Y}
          r={10}
        />
        <circle
          id="pointer4"
          ref={pointer4Ref}
          cx={pointer4X}
          cy={pointer4Y}
          r={10}
        />
      </svg>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  touch-action: none;

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
