export interface Apple {
  sweetness: number;
  quality: {
    isBad: boolean;
    weight: number;
  };
  color: "red" | "green";
}
export interface Cart {
  items: Apple[];
  price: number;
}
