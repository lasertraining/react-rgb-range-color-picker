import { useState } from "react";
import GitHub from "./components/GitHub";
import ColorPicker from "./components/ColorPicker";
import Hue from "./components/Hue";
import Output from "./components/Output";
import styled from "styled-components";

function App() {
  const [colorHSLHue, setColorHSLHue] = useState([0, 100, 50]);
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
      <GitHub />
      <ColorPicker
        colorHSLHue={colorHSLHue}
        setColorRGBRange={setColorRGBRange}
      />
      <Hue setColorHSLHue={setColorHSLHue} />
      <Output colorRGBRange={colorRGBRange} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
