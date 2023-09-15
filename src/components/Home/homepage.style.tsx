import styled from "styled-components";

export const LocationMainContainer = styled.div`
  width: 100vw;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.15);
  padding: 0 50px;
`;
