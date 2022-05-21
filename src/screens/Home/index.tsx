import React, { useEffect, useState, useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "styled-components";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { useAuth } from "../../hooks/auth";

import { Search } from "../../components/Search";
import { ProductCard, ProductProps } from "../../components/ProductCard";

import happyEmoji from "../../assets/happy.png";

import * as S from "./styles";

export function Home() {
  const { COLORS } = useTheme();
  const { user, signOut } = useAuth();
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  async function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        }) as ProductProps[];

        setPizzas(data);
      })
      .catch(() =>
        Alert.alert("Consulta", "Não foi possível realizar a consulta")
      );
  }

  async function handleSearch() {
    fetchPizzas(search);
  }

  async function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  function handleOpen(id: string) {
    const route = user?.isAdmin ? "product" : "order";

    navigation.navigate(route, {
      id
    });
  }

  function handleAdd() {
    navigation.navigate("product", {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Greeting>
          <S.GreetingEmoji source={happyEmoji} />
          <S.GreetingText>Olá, Admin</S.GreetingText>
        </S.Greeting>

        <TouchableOpacity onPress={signOut}>
          <MaterialIcons name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </S.Header>

      <Search
        value={search}
        onChangeText={setSearch}
        onSearch={handleSearch}
        onClear={handleSearchClear}
      />

      <S.MenuHeader>
        <S.Title>Cardápio</S.Title>

        <S.MenuItemsNumber>{pizzas.length} pizzas</S.MenuItemsNumber>
      </S.MenuHeader>

      <FlatList
        keyExtractor={(item) => item.id}
        data={pizzas}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24
        }}
      />

      {user?.isAdmin && (
        <S.NewProductButton title="Cadastrar pizza" onPress={handleAdd} />
      )}
    </S.Container>
  );
}
