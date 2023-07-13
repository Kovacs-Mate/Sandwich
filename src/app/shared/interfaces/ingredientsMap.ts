import { Ingredient } from "./ingredients";

export const IngredientsMap = new Map<string, Array<Ingredient>>([
    [
        "bread",
        [
            { name: "white bread", price: 100 },
            { name: "brown bread", price: 100 },
            { name: "whole wheat bread", price: 150 },
            { name: "rye bread", price: 120 },
            { name: "multigrain bread", price: 200 },
            { name: "burger buns", price: 100 },
            { name: "ciabatta", price: 130 }
        ]
    ],
    [
        "meat",
        [
            { name: "none", price: 0 },
            { name: "ham", price: 150 },
            { name: "chicken breast ham", price: 150 },
            { name: "turkey", price: 200 },
            { name: "roast chicken", price: 170 },
            { name: "roast beef", price: 250 },
            { name: "burger meat", price: 500 },
            { name: "bacon", price: 150 }
        ]
    ],
    [
        "cheese",
        [
            { name: "none", price: 0 },
            { name: "cheddar", price: 100 },
            { name: "swiss", price: 120 },
            { name: "mozzarella", price: 50 },
            { name: "trapista", price: 100 },
            { name: "pepper jack", price: 120 },
            { name: "american style", price: 120 },
            { name: "brie", price: 110 }
        ]
    ],
    [
        "vegetables",
        [
            { name: "none", price: 0 },
            { name: "lettuce", price: 20 },
            { name: "tomato", price: 50 },
            { name: "cucumber", price: 30 },
            { name: "onion", price: 20 },
            { name: "hungarian yellow pepper", price: 20 },
            { name: "bell pepper", price: 30 }
        ]
    ],
    [
        "sauce",
        [
            { name: "none", price: 0 },
            { name: "ketchup", price: 20 },
            { name: "mayonnaise", price: 20 },
            { name: "mustard", price: 20 },
            { name: "honey mustard", price: 20 },
            { name: "ranch dressing", price: 20 },
            { name: "BBQ", price: 20 }
        ]
    ]
]);
