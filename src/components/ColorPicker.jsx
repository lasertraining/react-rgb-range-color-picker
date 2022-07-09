import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const ColorPicker = ({ colorHSL }) => {
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
    <Container onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <canvas ref={canvasRef} width={width} height={height} />

      <Pointer
        top={pointers.pointer1.y}
        left={pointers.pointer1.x}
        onMouseDown={() => handleMouseDown("pointer1")}
      />

      <Pointer
        top={pointers.pointer2.y}
        left={pointers.pointer2.x}
        onMouseDown={() => handleMouseDown("pointer2")}
      />

      <Pointer
        top={pointers.pointer3.y}
        left={pointers.pointer3.x}
        onMouseDown={() => handleMouseDown("pointer3")}
      />

      <Pointer
        top={pointers.pointer4.y}
        left={pointers.pointer4.x}
        onMouseDown={() => handleMouseDown("pointer4")}
      />

      <Lines>
        <svg width={width} height={height} strokeWidth="2">
          <line
            x1={pointers.pointer1.x + 5}
            y1={pointers.pointer1.y + 5}
            x2={pointers.pointer2.x + 5}
            y2={pointers.pointer2.y + 5}
            stroke="white"
          />

          <line
            x1={pointers.pointer2.x + 5}
            y1={pointers.pointer2.y + 5}
            x2={pointers.pointer3.x + 5}
            y2={pointers.pointer3.y + 5}
            stroke="white"
          />

          <line
            x1={pointers.pointer3.x + 5}
            y1={pointers.pointer3.y + 5}
            x2={pointers.pointer4.x + 5}
            y2={pointers.pointer4.y + 5}
            stroke="white"
          />
          <line
            x1={pointers.pointer4.x + 5}
            y1={pointers.pointer4.y + 5}
            x2={pointers.pointer1.x + 5}
            y2={pointers.pointer1.y + 5}
            stroke="white"
          />
        </svg>
      </Lines>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  canvas {
    border-radius: 25px;
  }
`;

const Pointer = styled.span.attrs(({ top, left }) => ({
  style: {
    top: `${top}px`,
    left: `${left}px`,
  },
}))`
  position: absolute;
  background-color: #ffffff;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  cursor: pointer;
  z-index: 2;
`;

const Lines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export default ColorPicker;
