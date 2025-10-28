export interface BouquetItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image?: string;
    purchased: boolean;
    isSold: boolean
  };
  onTogglePurchased: (id: string) => void;
  onPress: (item: any) => void;
}
