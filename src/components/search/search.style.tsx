import styled from "styled-components";

export const LocationMainContainer = styled.div`
  width: 100vw;
  height: 23.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
`;

export const LocationInputContainer = styled.div`
  width: 500px;
  height: 45px;
  position: relative;

  & > i {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: gray;
  }
`;

export const LocationInputField = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border-radius: 20px;
  outline: none;
  border: none;
  box-shadow: 0 0 10px rgb(10, 10, 10, 0.7);
  padding: 0 50px;

  transition: all 0.2s ease-in-out;

  &:focus {
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -4px 10px rgb(0, 0, 0, 0.4);
  }
`;
