import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useBouquetStore } from "@/store/useBouquetStore";
import { useThemeStore } from "@/store/themeStore";
import { darkTheme, lightTheme } from "@/types/theme";
import { Ionicons } from "@expo/vector-icons";

// Buat extended type untuk menghindari error
interface ExtendedBouquet {
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

export default function DetailBouquetScreen() {
  const { id } = useLocalSearchParams();
  const { bouquets } = useBouquetStore();
  const bouquet = bouquets.find((b) => b.id === id) as
    | ExtendedBouquet
    | undefined;
  const router = useRouter();

  const { darkMode } = useThemeStore();
  const theme = darkMode ? darkTheme : lightTheme;

  // Fungsi untuk kembali ke halaman bouquet
  const handleBackToBouquet = () => {
    router.push("/(tabs)"); // Navigate ke index.tsx (bouquet screen)
  };

  if (!bouquet) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: darkMode ? "#2b1b2f" : "#fff0f5" },
        ]}
      >
        <Text
          style={[styles.notFound, { color: darkMode ? "#f3cfff" : "#d63384" }]}
        >
          Bouquet tidak ditemukan 😢
        </Text>
        <TouchableOpacity
          onPress={handleBackToBouquet}
          style={[
            styles.backBtn,
            {
              backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2",
              borderColor: darkMode ? "#b48ec6" : "#f8a5c2", // TAMBAHKAN BORDER COLOR
            },
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={darkMode ? "#2b1b2f" : "#ffffff"}
          />
          <Text
            style={[
              styles.backText,
              { color: darkMode ? "#2b1b2f" : "#ffffff" },
            ]}
          >
            Kembali ke Bouquet
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Gunakan optional chaining untuk menghindari error
  const bouquetCategory = bouquet?.category || "";
  const bouquetSize = bouquet?.size || "";
  const bouquetDescription = bouquet?.description || "";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#2b1b2f" : "#fff0f5" },
      ]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: darkMode ? "#3a2642" : "#ffcce0",
            borderBottomColor: darkMode ? "#b48ec6" : "#f8a5c2", // SUDAH ADA
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBackToBouquet}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={darkMode ? "#f3cfff" : "#d63384"}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: darkMode ? "#f3cfff" : "#d63384" },
          ]}
        >
          Detail Bouquet
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        <Image
          source={{
            uri:
              bouquet.image ||
              "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=400",
          }}
          style={[
            styles.image,
            {
              borderColor: darkMode ? "#b48ec6" : "#f8a5c2", // TAMBAHKAN BORDER COLOR
            },
          ]}
        />

        {/* Main Info Card */}
        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
              borderColor: darkMode ? "#b48ec6" : "#f8a5c2", // SUDAH ADA
            },
          ]}
        >
          <Text
            style={[styles.name, { color: darkMode ? "#f3cfff" : "#d63384" }]}
          >
            {bouquet.name}
          </Text>

          <Text
            style={[styles.price, { color: darkMode ? "#f3cfff" : "#d63384" }]}
          >
            Rp {bouquet.price.toLocaleString("id-ID")}
          </Text>

          {/* Category */}
          {bouquetCategory && (
            <View style={styles.categoryContainer}>
              <View
                style={[
                  styles.categoryBadge,
                  {
                    backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2",
                    borderColor: darkMode ? "#b48ec6" : "#f8a5c2", // SUDAH ADA
                  },
                ]}
              >
                <Ionicons
                  name="pricetag"
                  size={14}
                  color={darkMode ? "#2b1b2f" : "#ffffff"}
                />
                <Text
                  style={[
                    styles.categoryText,
                    { color: darkMode ? "#2b1b2f" : "#ffffff" },
                  ]}
                >
                  {bouquetCategory}
                </Text>
              </View>
            </View>
          )}

          {/* Size */}
          {bouquetSize && (
            <View style={styles.detailRow}>
              <Ionicons
                name="resize"
                size={18}
                color={darkMode ? "#b48ec6" : "#f8a5c2"}
              />
              <Text
                style={[
                  styles.detailLabel,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                Ukuran:
              </Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                {bouquetSize}
              </Text>
            </View>
          )}

          {/* Status */}
          <View style={styles.detailRow}>
            <Ionicons
              name={bouquet.purchased ? "checkmark-circle" : "time"}
              size={18}
              color={
                bouquet.purchased ? "#4CAF50" : darkMode ? "#b48ec6" : "#f8a5c2"
              }
            />
            <Text
              style={[
                styles.detailLabel,
                { color: darkMode ? "#e6d7f5" : "#6c567b" },
              ]}
            >
              Status:
            </Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: bouquet.purchased
                    ? darkMode
                      ? "rgba(76, 175, 80, 0.2)"
                      : "rgba(76, 175, 80, 0.1)"
                    : darkMode
                    ? "rgba(180, 142, 198, 0.2)"
                    : "rgba(248, 165, 194, 0.2)",
                  borderColor: bouquet.purchased
                    ? "#4CAF50"
                    : darkMode
                    ? "#b48ec6"
                    : "#f8a5c2", // SUDAH ADA
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: bouquet.purchased
                      ? "#4CAF50"
                      : darkMode
                      ? "#b48ec6"
                      : "#f8a5c2",
                  },
                ]}
              >
                {bouquet.purchased ? "Sudah Dibeli" : "Belum Dibeli"}
              </Text>
            </View>
          </View>
        </View>

        {/* Description Card */}
        {bouquetDescription && (
          <View
            style={[
              styles.descriptionCard,
              {
                backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                borderColor: darkMode ? "#b48ec6" : "#f8a5c2", // SUDAH ADA
              },
            ]}
          >
            <View style={styles.descriptionHeader}>
              <Ionicons
                name="document-text"
                size={20}
                color={darkMode ? "#b48ec6" : "#f8a5c2"}
              />
              <Text
                style={[
                  styles.descriptionTitle,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                Deskripsi
              </Text>
            </View>
            <Text
              style={[
                styles.descriptionText,
                { color: darkMode ? "#e6d7f5" : "#6c567b" },
              ]}
            >
              {bouquetDescription}
            </Text>
          </View>
        )}

        {/* Additional Info */}
        <View
          style={[
            styles.additionalInfoCard,
            {
              backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
              borderColor: darkMode ? "#b48ec6" : "#f8a5c2", // SUDAH ADA
            },
          ]}
        >
          <Text
            style={[
              styles.additionalInfoTitle,
              { color: darkMode ? "#f3cfff" : "#d63384" },
            ]}
          >
            Informasi Tambahan
          </Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons
                name="calendar"
                size={16}
                color={darkMode ? "#b48ec6" : "#f8a5c2"}
              />
              <Text
                style={[
                  styles.infoLabel,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                Ditambahkan
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                {new Date().toLocaleDateString("id-ID")}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Ionicons
                name="flower"
                size={16}
                color={darkMode ? "#b48ec6" : "#f8a5c2"}
              />
              <Text
                style={[
                  styles.infoLabel,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                ID Bouquet
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                {bouquet.id.slice(0, 8)}...
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Styles dengan border width yang konsisten
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2, // INI GARIS DI HEADER
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2, // TAMBAHKAN BORDER WIDTH UNTUK GAMBAR
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1, // INI GARIS DI INFO CARD
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  categoryContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1, // INI GARIS DI CATEGORY BADGE
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1, // INI GARIS DI STATUS BADGE
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  descriptionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1, // INI GARIS DI DESCRIPTION CARD
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  additionalInfoCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1, // INI GARIS DI ADDITIONAL INFO CARD
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  additionalInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    alignItems: "center",
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  notFound: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1, // TAMBAHKAN BORDER WIDTH UNTUK TOMBOL
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
