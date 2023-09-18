import styled from "styled-components";

type LocationDropdownProps = {
  active?: boolean;
};

export const LocationDropdown = styled.div<LocationDropdownProps>`
  width: 100%;
  height: fit-content;
  opacity: ${(props: LocationDropdownProps) => (props.active ? "1" : "0")};
  font-size: 16px;
  border-radius: 0 0 20px 20px;
  outline: none;
  border: none;
  overflow: hidden;
  border-collapse: collapse;
  background-color: white;
  transition: all 0.2s ease-in-out;
`;

type DropdownOptionProps = {
  currentLocation?: boolean;
};

export const DropdownOption = styled.div<DropdownOptionProps>`
  width: 100%;
  padding: 10px;
  background-color: ${(props: DropdownOptionProps) =>
    props.currentLocation ? "gray" : "transparent"};
  cursor: pointer;

  &:not(:first-child) {
    border-top: 1px solid black;
  }

  &:hover {
    color: gray;
  }
`;
