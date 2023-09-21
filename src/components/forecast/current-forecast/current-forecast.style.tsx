import styled from "styled-components";

export const CurrentForecastWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ForecastPrimaryData = styled.div`
  width: 50%;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(2, 1fr);
  background-color: rgba(194, 9, 9, 0.8);
  grid-gap: 10px;
  flex-direction: row;

  & > div {
    background-color: rgb(5, 219, 191);
  }

  & > div:nth-child(1) {
    grid-area: 1 / 1 / span 2;
  }
`;

export const ForecastSecondaryData = styled.div`
  width: 50%;
  display: grid;
  grid-template: repeat(2, 1fr) / repeat(3, 1fr);
  grid-gap: 10px;
  background-color: rgba(21, 9, 194, 0.8);

  & > div {
    background-color: rgb(108, 219, 5);
  }
`;
