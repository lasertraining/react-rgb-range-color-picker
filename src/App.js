import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import Hue from "./components/Hue";
import Output from "./components/Output";
import styled from "styled-components";

function App() {
  const [colorHSL, setColorHSL] = useState([0, 100, 50]);
  const [colorRGBRange, setColorRGBRange] = useState({
    redMin: 0,
    redMax: 0,
    greenMin: 0,
    greenMax: 0,
    blueMin: 0,
    blueMax: 0,
  });

  return (
    <Wrapper>
      <Container>
        <ColorPicker colorHSL={colorHSL} setColorRGBRange={setColorRGBRange} />
        <Hue colorHSL={colorHSL} setColorHSL={setColorHSL} />
        <Output colorRGBRange={colorRGBRange} />
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
  padding: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
