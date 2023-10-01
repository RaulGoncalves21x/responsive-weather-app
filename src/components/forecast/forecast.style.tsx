import styled from "styled-components";

export const WeatherForecastMainContainer = styled.div`
  width: 100%;
  padding: 15px 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;

  @media only screen and (max-width: 767px) {
    padding: 15px 10px;
  }
`;

export const WeatherForecastWrapper = styled.div`
  width: 100%;
  max-width: 1800px;
  height: 100%;
`;
