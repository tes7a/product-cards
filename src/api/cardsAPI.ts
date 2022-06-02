import axios from "axios";

//dal
const instance = axios.create({
    baseURL: "https://run.mocky.io/v3/",
})

export const cardsAPI = {
    getAllCards ()  {
        return instance.get<GetCardType[]>("b7d36eea-0b3f-414a-ba44-711b5f5e528e")
    }
}

//types
export type GetCardType = {
    name: string,
    category: string,
    price: number,
}