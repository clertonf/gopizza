import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: S.TypeProps;
  isLoading?: boolean;
};

export function Button({
  title,
  type = "primary",
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <S.Container type={type} {...props}>
      {isLoading ? <S.Loading /> : <S.Title>{title}</S.Title>}
    </S.Container>
  );
}
