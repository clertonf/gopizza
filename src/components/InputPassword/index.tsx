import React, { useState } from "react";
import { Button, TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

import * as S from "./styles";
import theme from "../../theme";

type Props = TextInputProps & {
  iconName?: React.ComponentProps<typeof Feather>["name"];
  type?: S.TypeProps;
};

export function InputPassword({ type = "primary", iconName, ...rest }: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <S.Container>
      <S.InputText secureTextEntry={isPasswordVisible} type={type} {...rest} />

      <RectButton onPress={handlePasswordVisibilityChange}>
        <S.BoxIcon>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.COLORS.SUCCESS_50}
          />
        </S.BoxIcon>
      </RectButton>
    </S.Container>
  );
}
