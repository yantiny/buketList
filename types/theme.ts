export const lightTheme = {
  background: "#F9FAFB",
  text: "#111827",
  card: "#FFFFFF",
  border: "#E5E7EB",
  placeholder: "#A1A1AA",
  button: "#fc81b4ff",
  primary: "#e472baff"
};

export const darkTheme = {
  background: "#b96fa8ff",
  text: "#F3F4F6",
  card: "#52264cff",
  border: "#522746ff",
  placeholder: "#9CA3AF",
  button: "#8d2d5dff",
  primary: "#bb477fff"
};

export interface Bouquet {
  id: string;
  name: string;
  price: number;
  image?: string;
  purchased: boolean;
  isSold: boolean;
  size?: string;
  category?: string;
  description?: string;
}