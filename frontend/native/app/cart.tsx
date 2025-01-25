import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useCart } from "@/store/cartStore";
import { FlatList } from "react-native";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";

export default function CartScreen() {
  const items = useCart((state: any) => state.items)
  const resetCart = useCart((state: any) => state.resetCart) 

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder(items.map((item: any) => ({
      productId: item.product.id, 
      quantity: item.quantity,
      price: item.product.price
    }))),
    onSuccess: (data) => {
      console.log("Order Created", data)
      resetCart()
    },
    onError: (error) => {
      console.log("Order Failed", error)
    }
  })

  const onCheckout = async () => {
    // Send Order to Server
    createOrderMutation.mutate()
  }

  if (items.length === 0) {
    return <Redirect href={'/'}/>
  }

  return (
    <FlatList 
      data={items} 
      contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
      renderItem={({item})=> {
        return (
          <HStack className="justify-between bg-white p-3">
            <VStack space="sm">
              <Text>{item.product.name}</Text>
              <Text>${item.product.price}</Text>
            </VStack>
              
            <Text>{item.quantity}</Text>
          </HStack>
        )
      }}
      ListFooterComponent={()=>(
        <Button onPress={onCheckout} className="w-full p-3 bg-primary-500">
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
