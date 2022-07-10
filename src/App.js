import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import Hue from "./components/Hue";
import Form from "./components/Form";
import styled from "styled-components";

function App() {
  const [colorHSL, setColorHSL] = useState([0, 100, 50]);
  const [colorRange, setColorRange] = useState({
    redChannelMin: 145,
    redChannelMax: 231,
    greenChannelMin: 13,
    greenChannelMax: 63,
    blueChannelMin: 13,
    blueChannelMax: 63,
  });

  return (
    <Wrapper>
      <Container>
        <ColorPicker colorHSL={colorHSL} setColorRange={setColorRange} />
        <Hue colorHSL={colorHSL} setColorHSL={setColorHSL} />
        <Form colorRange={colorRange} setColorRange={setColorRange} />
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
`;

export default App;
