import styled from "styled-components";

const Output = ({ colorRGBRange }) => {
  const { redMin, redMax, greenMin, greenMax, blueMin, blueMax } =
    colorRGBRange;

  return (
    <Code>
      {`{ redMin: ${redMin}, redMax: ${redMax},
        greenMin: ${greenMin}, greenMax: ${greenMax},
        blueMin: ${blueMin}, blueMax: ${blueMax} }`}
    </Code>
  );
};

const Code = styled.code`
  margin-top: 5rem;
  line-height: 1.7;
  text-align: center;
`;

export default Output;
