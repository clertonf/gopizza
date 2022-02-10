import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";

export type TypeProps = "primary" | "secondary";

type Props = {
  type: TypeProps;
};

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 8px;
  background-color: black;
`;

export const BoxIcon = styled.View`
  width: 55px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
`;

export const InputText = styled(TextInput).attrs<Props>(({ theme, type }) => ({
  placeholderTextColor:
    type === "primary" ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50,
}))<Props>`
  flex: 1;
  width: 100%;
  height: 56px;
  background-color: transparent;
  border-radius: 12px;
  font-size: 14px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 16px;

  ${({ theme, type }) => css`
    font-family: ${theme.FONTS.TEXT};
    border: 1px solid ${theme.COLORS.SHAPE};
    color: ${type === "primary"
      ? theme.COLORS.SECONDARY_900
      : theme.COLORS.TITLE};
  `}
`;
