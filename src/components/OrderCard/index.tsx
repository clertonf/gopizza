import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

type OrderCardProps = TouchableOpacityProps & {
  index: number;
};

export function OrderCard({ index, ...rest }: OrderCardProps) {
  return (
    <S.Container index={index} {...rest}>
      <S.Image source={{ uri: "https://github.com/clertonf.png" }} />

      <S.Name>4 Queijos</S.Name>

      <S.Description>Mesa 5 ● Qnt: 1</S.Description>

      <S.StatusContainer status="Preparando">
        <S.StatusLabel status="Preparando">Preparando</S.StatusLabel>
      </S.StatusContainer>
    </S.Container>
  );
}
