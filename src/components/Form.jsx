import styled from "styled-components";

const Form = ({ colorRange, setColorRange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setColorRange((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Container>
      <Description>Red channel (R)</Description>
      <InputGroup>
        <Label>
          Min.
          <Input
            type="number"
            min="0"
            max="255"
            value={colorRange.redChannelMin}
            onChange={handleChange}
            name="redChannelMin"
          />
        </Label>

        <Label>
          Max.
          <Input
            type="number"
            min="0"
            max="255"
            value={colorRange.redChannelMax}
            onChange={handleChange}
            name="redChannelMax"
          />
        </Label>
      </InputGroup>

      <Description>Green channel (G)</Description>
      <InputGroup>
        <Label>
          Min.
          <Input
            type="number"
            min="0"
            max="255"
            value={colorRange.greenChannelMin}
            onChange={handleChange}
            name="greenChannelMin"
          />
        </Label>

        <Label>
          Max.
          <Input
            type="number"
            min="0"
            max="255"
            value={colorRange.greenChannelMax}
            onChange={handleChange}
            name="greenChannelMax"
          />
        </Label>
      </InputGroup>

      <Description>Blue channel (B)</Description>
      <InputGroup>
        <Label>
          Min.
          <Input
            type="number"
            min="0"
            max="255"
            value={colorRange.blueChannelMin}
            onChange={handleChange}
            name="blueChannelMin"
          />
        </Label>

        <Label>
          Max.
          <Input
            type="number"
            min="0"
            max="255"
            value={colorRange.blueChannelMax}
            onChange={handleChange}
            name="blueChannelMax"
          />
        </Label>
      </InputGroup>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2.5rem;
`;

const InputGroup = styled.div`
  display: flex;
`;

const Label = styled.label`
  display: flex;
  margin: 0 0.5rem;
  background-color: #222222;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  max-width: 110px;
`;

const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  color: #97adad;
  width: 100%;
  padding-left: 0.25rem;
  font-size: 15px;
  text-align: center;
`;

const Description = styled.div`
  text-align: center;
  margin: 2rem 0 1.25rem 0;
`;

export default Form;
