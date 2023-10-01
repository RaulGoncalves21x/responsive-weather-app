import styled from "styled-components";

export const NavigationContainer = styled.div`
  width: 100vw;
  height: 6.5vh;
  display: flex;
  padding: 10px 15px;

  @media only screen and (max-width: 767px) {
    justify-content: center;
  }
`;

export const LogoContainer = styled.div`
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img {
    height: 100%;
    aspect-ratio: 1 / 1;
  }

  & > span {
    color: #ffffff;
    font-size: 20px;
    letter-spacing: 1.4px;
    text-align: center;
    margin-left: 10px;
    text-shadow: 1px 1px 1px #000000;
  }
`;
