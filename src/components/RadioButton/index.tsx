import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

type RadioButtonProps = TouchableOpacityProps &
  S.RadioButtonProps & {
    title: string;
  };

export function RadioButton({
  title,
  selected = false,
  ...rest
}: RadioButtonProps) {
  return (
    <S.Container selected={selected} {...rest}>
      <S.Radio>{selected && <S.Selected />}</S.Radio>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
