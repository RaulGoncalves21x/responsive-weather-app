import styled from "styled-components";

export const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessage = styled.div`
  width: 500px;
  height: 125px;
  background-color: rgba(206, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > p:first-child {
    text-transform: uppercase;
    margin-bottom: 10px;
  }
`;
