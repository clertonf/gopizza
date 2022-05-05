import React from "react";
import { FlatList } from "react-native";

import { OrderCard } from "../../components/OrderCard";
import { ItemSeparator } from "../../components/ItemSeparator";

import * as S from "./styles";

export function Orders() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Pedidos feitos</S.Title>
      </S.Header>

      <FlatList
        data={["1", "2", "3"]}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => <OrderCard index={index} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
      />
    </S.Container>
  );
}
