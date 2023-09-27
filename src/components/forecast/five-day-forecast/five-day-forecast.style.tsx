import styled from "styled-components";

export const FiveDayForecastWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  padding-bottom: 10px;
`;

export const FiveDayComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 9.5%;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 20px 40px;
  background-color: rgba(200, 200, 200, 0.4);
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  &:not(:last-child) {
    margin-right: 0.5%;
  }

  & > .hour {
    margin-bottom: 15px;
  }

  & > .weather {
    margin-bottom: 15px;
  }
`;
