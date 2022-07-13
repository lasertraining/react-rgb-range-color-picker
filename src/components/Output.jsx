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
  margin-top: 2rem;
  line-height: 1.7;
  text-align: center;

  padding: 1.5rem 1rem;

  @media (min-width: 400px) {
    padding: 2rem 2.5rem;
  }
`;

export default Output;
