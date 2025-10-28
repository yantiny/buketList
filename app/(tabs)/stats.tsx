import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBouquetStore } from "@/store/useBouquetStore";
import { useThemeStore } from "@/store/themeStore";

// Extended type untuk menghindari error
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

export default function StatsScreen() {
  const { bouquets } = useBouquetStore();
  const { darkMode } = useThemeStore();
  const router = useRouter();

  // Gunakan type assertion
  const extendedBouquets = bouquets as ExtendedBouquet[];

  // Hitung statistik
  const totalBouquets = extendedBouquets.length;
  const purchasedBouquets = extendedBouquets.filter((b) => b.purchased).length;
  const notPurchasedBouquets = extendedBouquets.filter(
    (b) => !b.purchased
  ).length;

  // Hitung berdasarkan kategori dengan optional chaining
  const categoryStats = extendedBouquets.reduce((acc, bouquet) => {
    const category = bouquet?.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {} as Record<string, number>);

  // Urutkan kategori berdasarkan jumlah terbanyak
  const sortedCategories = Object.entries(categoryStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Ambil 5 kategori teratas

  const handleBack = () => {
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#2b1b2f" : "#fff0f5" },
      ]}
      edges={["right", "left", "bottom"]}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: darkMode ? "#3a2642" : "#ffcce0",
            borderBottomColor: darkMode ? "#b48ec6" : "#f8a5c2",
          },
        ]}
      >
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
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
          📊 Statistik Bouquet
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Overview Cards */}
        <View style={styles.overviewContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: darkMode ? "#f3cfff" : "#d63384" },
            ]}
          >
            📈 Ringkasan Koleksi
          </Text>

          <View style={styles.cardsContainer}>
            {/* Total Bouquets Card */}
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                  borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                },
              ]}
            >
              <View style={styles.statIcon}>
                <Ionicons
                  name="flower"
                  size={24}
                  color={darkMode ? "#b48ec6" : "#f8a5c2"}
                />
              </View>
              <Text
                style={[
                  styles.statNumber,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                {totalBouquets}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                Total Bouquet
              </Text>
            </View>

            {/* Purchased Bouquets Card */}
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                  borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                },
              ]}
            >
              <View style={styles.statIcon}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              </View>
              <Text
                style={[
                  styles.statNumber,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                {purchasedBouquets}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                Sudah Dibeli
              </Text>
            </View>

            {/* Not Purchased Bouquets Card */}
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                  borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                },
              ]}
            >
              <View style={styles.statIcon}>
                <Ionicons
                  name="time"
                  size={24}
                  color={darkMode ? "#b48ec6" : "#f8a5c2"}
                />
              </View>
              <Text
                style={[
                  styles.statNumber,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                {notPurchasedBouquets}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                Belum Dibeli
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Bar Section */}
        {totalBouquets > 0 && (
          <View
            style={[
              styles.progressContainer,
              {
                backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
              },
            ]}
          >
            <Text
              style={[
                styles.progressTitle,
                { color: darkMode ? "#f3cfff" : "#d63384" },
              ]}
            >
              Progress Pembelian
            </Text>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBarBackground,
                  { backgroundColor: darkMode ? "#4a3452" : "#ffd6e7" },
                ]}
              >
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${(purchasedBouquets / totalBouquets) * 100}%`,
                      backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2",
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.progressText,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                {Math.round((purchasedBouquets / totalBouquets) * 100)}% Terbeli
                ({purchasedBouquets}/{totalBouquets})
              </Text>
            </View>
          </View>
        )}

        {/* Category Stats */}
        {sortedCategories.length > 0 && (
          <View
            style={[
              styles.categoryContainer,
              {
                backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
              },
            ]}
          >
            <Text
              style={[
                styles.categoryTitle,
                { color: darkMode ? "#f3cfff" : "#d63384" },
              ]}
            >
              🏷️ Kategori Terpopuler
            </Text>

            {sortedCategories.map(([category, count], index) => (
              <View key={category} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View
                    style={[
                      styles.categoryRank,
                      { backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.rankText,
                        { color: darkMode ? "#2b1b2f" : "#ffffff" },
                      ]}
                    >
                      #{index + 1}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.categoryName,
                      { color: darkMode ? "#f3cfff" : "#d63384" },
                    ]}
                  >
                    {category}
                  </Text>
                </View>
                <View
                  style={[
                    styles.categoryCount,
                    { backgroundColor: darkMode ? "#4a3452" : "#ffd6e7" },
                  ]}
                >
                  <Text
                    style={[
                      styles.countText,
                      { color: darkMode ? "#f3cfff" : "#d63384" },
                    ]}
                  >
                    {count} bouquet
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Empty State */}
        {totalBouquets === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="stats-chart"
              size={60}
              color={darkMode ? "#b48ec6" : "#f8a5c2"}
            />
            <Text
              style={[
                styles.emptyTitle,
                { color: darkMode ? "#f3cfff" : "#d63384" },
              ]}
            >
              Belum Ada Data
            </Text>
            <Text
              style={[
                styles.emptyText,
                { color: darkMode ? "#e6d7f5" : "#6c567b" },
              ]}
            >
              Tambahkan bouquet pertama kamu{"\n"}untuk melihat statistik!
            </Text>
            <TouchableOpacity
              style={[
                styles.emptyButton,
                { backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2" },
              ]}
              onPress={handleBack}
            >
              <Text
                style={[
                  styles.emptyButtonText,
                  { color: darkMode ? "#2b1b2f" : "#ffffff" },
                ]}
              >
                Tambah Bouquet Pertama
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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
    borderBottomWidth: 2,
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
  overviewContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  progressContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  progressBarContainer: {
    alignItems: "center",
  },
  progressBarBackground: {
    width: "100%",
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  categoryContainer: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryRank: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    fontSize: 12,
    fontWeight: "700",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  categoryCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
