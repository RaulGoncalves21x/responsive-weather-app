import styled from "styled-components";

type LocationDropdownProps = {
  active?: boolean;
};

export const LocationDropdown = styled.div<LocationDropdownProps>`
  width: 100%;
  /*   opacity: ${(props: LocationDropdownProps) => (props.active ? "1" : "0")};
 */
  box-shadow: 0 4px 10px rgb(10, 10, 10, 0.7);
  font-size: 16px;
  border-radius: 0 0 20px 20px;
  outline: none;
  border: none;
  overflow: hidden;
  background-color: white;
  transition: opacity 0.2s ease-in-out;
`;

export const BaseDropdownOption = styled.div`
  width: 100%;
  padding: 20px 10px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: gray;
  }

  &:first-child::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: rgb(10, 10, 10, 0.2);
    filter: blur(2px);
  }
`;

export const CurrentLocationDropdownOption = styled(BaseDropdownOption)`
  background-color: rgba(10, 10, 10, 0.1);
`;
