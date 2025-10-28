import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBouquetStore } from "@/store/useBouquetStore";
import { useThemeStore } from "@/store/themeStore";
import { darkTheme, lightTheme } from "@/types/theme";
import { Ionicons } from "@expo/vector-icons";

export default function DetailBouquetScreen() {
  const { id } = useLocalSearchParams();
  const { bouquets } = useBouquetStore();
  const bouquet = bouquets.find((b) => b.id === id);
  const router = useRouter();

  const { darkMode } = useThemeStore();
  const theme = darkMode ? darkTheme : lightTheme;

  if (!bouquet) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.notFound, { color: theme.text }]}>
          Bouquet tidak ditemukan 😢
        </Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: bouquet.image || "https://via.placeholder.com/300" }}
        style={styles.image}
      />

      <Text style={[styles.name, { color: theme.text }]}>{bouquet.name}</Text>
      <Text style={[styles.price, { color: theme.text }]}>
        Rp {bouquet.price}
      </Text>

      {/* ✅ Status mengikuti checkbox “Sudah Dibeli” */}
      <View
        style={[
          styles.statusBox,
          {
            borderColor: bouquet.purchased ? "#4CAF50" : "#F44336",
            backgroundColor: bouquet.purchased
              ? "rgba(76, 175, 80, 0.1)"
              : "rgba(244, 67, 54, 0.1)",
          },
        ]}
      >
        <Text style={{ color: theme.text }}>
          Status:{" "}
          <Text
            style={{
              fontWeight: "bold",
              color: bouquet.purchased ? "#4CAF50" : "#F44336",
            }}
          >
            {bouquet.purchased ? "Sudah Dibeli" : "Belum Dibeli"}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  statusBox: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
  },
  notFound: {
    fontSize: 18,
    marginBottom: 12,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  backText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },
});
