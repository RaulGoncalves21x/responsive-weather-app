import styled from "styled-components";

export const CurrentForecastWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 75px;
`;

export const ForecastPrimaryData = styled.div`
  width: 50%;
  min-width: 450px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;

  & div {
    &:first-child {
      width: 50%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    &:last-child {
      width: 50%;
      display: flex;
      flex-direction: column;

      & span {
        &:first-child {
          font-size: 88px;
          font-weight: bold;
        }

        &:last-child {
          font-size: 24px;
          text-transform: capitalize;
        }
      }
    }
  }
`;

export const ForecastSecondaryData = styled.div`
  width: 50%;
  min-width: 450px;

  @media only screen and (max-width: 970px) {
    width: 100%;
  }

  display: grid;
  grid-template: repeat(2, 1fr) / repeat(3, 1fr);
  grid-gap: 50px 20px;
  background-color: rgba(200, 200, 200, 0.4);
  padding: 50px 20px;
  border-radius: 5px;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > span {
      &:first-child {
        font-weight: bold;
        font-size: 24px;
      }

      &:last-child {
        text-transform: capitalize;
        font-size: 16px;
      }
    }
  }
`;
