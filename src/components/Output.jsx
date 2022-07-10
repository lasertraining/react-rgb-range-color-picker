import styled from "styled-components";

const Output = ({ colorRGBRange }) => {
  const {
    redChannelMin,
    redChannelMax,
    greenChannelMin,
    greenChannelMax,
    blueChannelMin,
    blueChannelMax,
  } = colorRGBRange;

  return (
    <Code>
      {`{ redChannelMin: ${redChannelMin}, redChannelMax: ${redChannelMax},
        greenChannelMin: ${greenChannelMin}, greenChannelMax: ${greenChannelMax},
        blueChannelMin: ${blueChannelMin}, blueChannelMax: ${blueChannelMax} }`}
    </Code>
  );
};

const Code = styled.code`
  margin-top: 7rem;
  line-height: 1.7;
  text-align: center;
`;

export default Output;
