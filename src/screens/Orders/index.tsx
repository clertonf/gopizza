import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { useAuth } from "../../hooks/auth";

import { OrderCard, OrderProps } from "../../components/OrderCard";
import { ItemSeparator } from "../../components/ItemSeparator";

import * as S from "./styles";

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        }) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  function handlePizzaDelivered(id: string) {
    Alert.alert("Pedido", "Confirmar que a pizza foi entregue?", [
      {
        text: "Não",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: () => {
          firestore().collection("orders").doc(id).update({
            status: "Entregue"
          });
        }
      }
    ]);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Pedidos feitos</S.Title>
      </S.Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrderCard
            index={index}
            data={item}
            disabled={item.status === "Entregue"}
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        contentContainerStyle={{ paddingBottom: 125, paddingHorizontal: 24 }}
      />
    </S.Container>
  );
}
