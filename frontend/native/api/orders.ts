import { useAuth } from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_API_URL
let token = ''
// const token = useAuth.getState().token
// const token = useAuth((state: any) => state.token);
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3NzIyMzM2LCJleHAiOjE3NDAzMTQzMzZ9.XG8VZshQlt09FRN8TuEgHOXm7T9IezFrVHiyzkgs7Ik"

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('auth-store');
      console.log(jsonValue);
      
      token = jsonValue != null ? await JSON.parse(jsonValue).state.token : null;
      console.log(token);
      
        return token;
    } catch (e) {
      console.log(e);
      
    }
};
getData()


export async function createOrder(items: any) {
    try {
        const response = await fetch(
          `${API_URL}/orders`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization : token,
            },
            body: JSON.stringify({
                order: {},
                items: items
            })
          }
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        throw Error('Failed to create order')
    }
    
}