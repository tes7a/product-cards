import {
    CardsListReducer,
    CardsWithIdType,
    getCardsAC,
    initialStateType,
    modalDataType,
    selectedCardAC, selectedCheapestCardAC, setStatusAC
} from "./cards-list-reducer";

let initialState: initialStateType;

beforeEach(() => {
    initialState = {cards: [], modalData: {} as modalDataType, initialStatus: "loading"};
});

test("cards are displayed", () => {
    const state: CardsWithIdType[] = [
        {
            name: "Milk",
            category: "Drinks",
            price: 1.99
        },
        {
            name: "Bear",
            category: "Drinks",
            price: 2.99
        }
    ];

    const endState = CardsListReducer(initialState, getCardsAC(state));

    expect(initialState.cards.length).toBe(0);
    expect(endState.cards.length).toBe(2);
});

test("select the desired card", () => {
    const state: initialStateType = {
        cards: [
            {
                name: "Milk",
                category: "Drinks",
                price: 1.99,
                id: "1"
            },
            {
                name: "Bear",
                category: "Drinks",
                price: 2.99,
                id: "2"
            }
        ],
        modalData: {} as modalDataType,
        initialStatus: "loading"
    };

    const endState = CardsListReducer(state, selectedCardAC("2"));

    expect(endState.modalData.name).toBe("Bear");
    expect(endState.modalData.price).toBe(2.99);
});

test("find the cheapest card", () => {
    const state: initialStateType = {
        cards: [
            {
                name: "Milk",
                category: "Drinks",
                price: 1.99,
                id: "1"
            },
            {
                name: "Bear",
                category: "Drinks",
                price: 2.99,
                id: "2"
            },
            {
                name: "Lemonade",
                category: "Drinks",
                price: 0.99,
                id: "3"
            },
            {
                name: "Whiskey",
                category: "Drinks",
                price: 5.99,
                id: "4"
            }
        ],
        modalData: {} as modalDataType,
        initialStatus: "loading"
    };

    const endState = CardsListReducer(state, selectedCheapestCardAC());

    expect(endState.modalData.name).toBe("Lemonade");
    expect(endState.modalData.price).toBe(0.99);
});

test("", () => {
    const state: initialStateType = {
        cards: [
            {
                name: "Milk",
                category: "Drinks",
                price: 1.99,
                id: "1"
            },
            {
                name: "Bear",
                category: "Drinks",
                price: 2.99,
                id: "2"
            },
            {
                name: "Lemonade",
                category: "Drinks",
                price: 0.99,
                id: "3"
            },
            {
                name: "Whiskey",
                category: "Drinks",
                price: 5.99,
                id: "4"
            }
        ],
        modalData: {} as modalDataType,
        initialStatus: "loading"
    };

    const endState = CardsListReducer(state, setStatusAC("succeeded"));

    expect(endState.initialStatus).toBe("succeeded")
})
