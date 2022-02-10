import React, { useState } from "react";
import { Input } from "../../components/Input";

import { Feather } from "@expo/vector-icons";

import * as S from "./styles";

export function SignIn() {
  const [hidePassword, setHidePasswords] = useState(false);

  return (
    <S.Container>
      <Input
        placeholder="E-mail"
        type="secondary"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Input
        placeholder="Senha"
        type="secondary"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={hidePassword}
      />

      {/* <Feather
        name={hidePassword ? "eye-off" : "eye"}
        size={24}
        color="#000"
        onPress={() => setHidePasswords(!hidePassword)}
      /> */}
    </S.Container>
  );
}
