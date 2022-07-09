import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import Hue from "./components/Hue";
import styled from "styled-components";

function App() {
  const [colorHSL, setColorHSL] = useState([0, 100, 50]);

  return (
    <Wrapper>
      <Container>
        <ColorPicker colorHSL={colorHSL} />
        <Hue colorHSL={colorHSL} setColorHSL={setColorHSL} />
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
