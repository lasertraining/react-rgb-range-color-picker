import styled from "styled-components";

const GitHub = () => {
  return (
    <Container>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          fill="none"
        >
          <path
            d="M6.69 16.024c0 .081-.093.145-.21.145-.133.012-.226-.052-.226-.145 0-.081.093-.145.21-.145.121-.012.226.052.226.145zm-1.254-.181c-.028.081.052.173.173.198.105.04.226 0 .25-.081s-.052-.173-.173-.21c-.105-.028-.222.012-.25.093zm1.782-.069c-.117.028-.198.105-.185.198.012.081.117.133.238.105s.198-.105.185-.185-.121-.129-.238-.117zM9.871.323C4.278.323 0 4.568 0 10.161c0 4.472 2.815 8.298 6.835 9.645.516.093.698-.226.698-.488l-.012-2.476s-2.823.605-3.415-1.202c0 0-.46-1.173-1.121-1.476 0 0-.923-.633.065-.621a2.13 2.13 0 0 0 1.556 1.04c.883 1.557 2.363 1.109 2.94.843.093-.645.355-1.093.645-1.359-2.254-.25-4.528-.577-4.528-4.456 0-1.109.306-1.665.952-2.375-.105-.262-.448-1.343.105-2.738C5.56 4.238 7.5 5.589 7.5 5.589c.806-.226 1.673-.343 2.532-.343s1.726.117 2.532.343c0 0 1.939-1.355 2.782-1.089.552 1.399.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.629 4.456.371.319.686.923.686 1.871l-.012 3.371c0 .262.185.581.698.488C17.266 18.46 20 14.633 20 10.161 20 4.568 15.464.323 9.871.323zM3.919 14.23c-.052.04-.04.133.028.21.065.065.157.093.21.04.052-.04.04-.133-.028-.21-.065-.064-.157-.093-.21-.04zm-.435-.327c-.028.052.012.117.093.157.065.04.145.028.173-.028s-.012-.117-.093-.157c-.081-.024-.145-.012-.173.028zm1.306 1.435c-.065.053-.04.173.052.25.093.093.21.105.262.04.052-.053.028-.173-.052-.25-.089-.093-.21-.105-.262-.04zm-.46-.593c-.065.04-.065.145 0 .238s.173.133.226.093c.065-.052.065-.157 0-.25-.056-.093-.161-.133-.226-.081z"
            fill="#fff"
          />
        </svg>
      </a>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1;

  a {
    display: flex;
  }
`;

export default GitHub;
