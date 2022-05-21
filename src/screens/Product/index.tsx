import React, { useEffect, useState } from "react";
import {
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  View
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useAuth } from "../../hooks/auth";

import { ProductNavigationProps } from "../../@types/navigation";

import { BackButton } from "../../components/BackButton";
import { Photo } from "../../components/Photo";
import { InputPrice } from "../../components/InputPrice";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { ProductProps } from "../../components/ProductCard";

import * as S from "./styles";

type PizzaResponse = ProductProps & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export function Product() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceSizeP, setPriceSizeP] = useState("");
  const [priceSizeM, setPriceSizeM] = useState("");
  const [priceSizeG, setPriceSizeG] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photoPath, setPhotoPath] = useState("");

  const navigation = useNavigation();

  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as PizzaResponse;

          setName(product.name);
          setImage(product.photo_url);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
          setPhotoPath(product.photo_path);
        });
    }
  }, [id]);

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "denied") {
      Alert.alert(
        "Permissão negada",
        "Vá em configurações e altere a permissão para selecionar as foto"
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 4]
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!name.trim()) {
      return Alert.alert("Cadastro", "Informe o nome da pizza");
    }
    if (!description.trim()) {
      return Alert.alert("Cadastro", "Informe a descrição da pizza");
    }
    if (!image) {
      return Alert.alert("Cadastro", "Selecione a imagem da pizza");
    }

    if (!priceSizeP || !priceSizeM || !priceSizeG) {
      return Alert.alert(
        "Cadastro",
        "Informe o preço de todos os tamanhos da pizza"
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);

    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG
        },
        photo_url,
        photo_path: reference.fullPath
      })
      .then(() => {
        Alert.alert("Cadastro", "Pizza cadastrada com sucesso");
        navigation.navigate("home");
      })
      .catch(() =>
        Alert.alert("Cadastro", "Não foi possível cadastrar a pizza")
      );

    setIsLoading(false);
  }

  async function handleDelete() {
    firestore()
      .collection("pizzas")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Produto", "Pizza deletada com sucesso");
        navigation.navigate("home");
      });
  }

  function handlegoBack() {
    navigation.goBack();
  }

  return (
    <S.Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <S.Header>
          <BackButton onPress={handlegoBack} />

          <S.Title>Cadastrar</S.Title>
          {id ? (
            <TouchableOpacity onPress={handleDelete}>
              <S.DeletLabel>Deletar</S.DeletLabel>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </S.Header>
        <S.Upload>
          <Photo uri={image} />
          {!id && (
            <S.PickImageButton title="Carregar" onPress={handlePickerImage} />
          )}
        </S.Upload>

        <S.Form>
          <S.InputGroup>
            <S.Label>Nome</S.Label>
            <Input value={name} onChangeText={setName} autoCorrect={false} />
          </S.InputGroup>

          <S.InputGroup>
            <S.InputGroupHeader>
              <S.Label>Descrição</S.Label>
              <S.MaxCharacters>0 de 60 caracteres</S.MaxCharacters>
            </S.InputGroupHeader>
            <Input
              multiline
              autoCorrect={false}
              maxLength={60}
              style={{ height: 80 }}
              value={description}
              onChangeText={setDescription}
            />
          </S.InputGroup>

          <S.InputGroup>
            <S.Label>Tamanhos e Preços</S.Label>
            <InputPrice
              size="P"
              value={priceSizeP}
              onChangeText={setPriceSizeP}
            />
            <InputPrice
              size="M"
              value={priceSizeM}
              onChangeText={setPriceSizeM}
            />
            <InputPrice
              size="G"
              value={priceSizeG}
              onChangeText={setPriceSizeG}
            />
          </S.InputGroup>

          {!id && (
            <Button
              title="Cadastrar pizza"
              type="secondary"
              isLoading={isLoading}
              onPress={handleAdd}
            />
          )}
        </S.Form>
      </ScrollView>
    </S.Container>
  );
}
