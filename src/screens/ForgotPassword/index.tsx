import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/auth";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import brandImg from "../../assets/brand.png";

import * as S from "./styles";
import { BackButton } from "../../components/BackButton";

export function ForgotPassword() {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState("");

  const { signIn, isLogging } = useAuth();

  function handleSignIn() {}

  return (
    <S.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <BackButton onPress={navigation.goBack} />
        <S.Content>
          <S.Brand source={brandImg} />
          <S.Title>Recuperar senha</S.Title>
          <Input
            placeholder="E-mail"
            type="secondary"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <Button
            type="primary"
            title="Enviar"
            onPress={handleSignIn}
            isLoading={isLogging}
          />
        </S.Content>
      </KeyboardAvoidingView>
    </S.Container>
  );
}
