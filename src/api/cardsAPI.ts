import axios from "axios";

//dal
const instance = axios.create({
	baseURL: "https://products-cards-api.vercel.app",
	headers: {
		"Content-Type": "application/json",
	},
});

export const cardsAPI = {
	getAllCards() {
		return instance.get<GetCardType[]>("");
	},
};

//types
export type GetCardType = {
	name: string;
	category: string;
	price: number;
};
