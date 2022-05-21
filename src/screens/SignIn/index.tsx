import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { useAuth } from "../../hooks/auth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import brandImg from "../../assets/brand.png";

import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isLogging } = useAuth();
  const { navigate } = useNavigation();

  function handleSignIn() {
    signIn(email, password);
  }

  function handleRecoverPassword() {
    navigate("forgotpassword");
  }

  return (
    <S.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <S.Content>
          <S.Brand source={brandImg} />
          <S.Title>Login</S.Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Input
            placeholder="Senha"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setPassword}
          />

          <S.ForgotPasswordButton onPress={handleRecoverPassword}>
            <S.ForgotPasswordLabel>Esqueci minha senha</S.ForgotPasswordLabel>
          </S.ForgotPasswordButton>

          <Button
            type="primary"
            title="Entrar"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  );
}
