import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "@/store/themeStore";
import { darkTheme, lightTheme } from "@/types/theme";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { darkMode } = useThemeStore();
  const theme = darkMode ? darkTheme : lightTheme;
  const router = useRouter();

  const handleNavigateToBouquet = () => {
    // Navigate ke index.tsx (bouquet screen)
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
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
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
          <Text
            style={[styles.title, { color: darkMode ? "#f3cfff" : "#d63384" }]}
          >
            🌸 BuketList
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: darkMode ? "#e6d7f5" : "#6c567b" },
            ]}
          >
            Kelola koleksi bouquet favoritmu
          </Text>
        </View>

        {/* Hero Image dengan gambar lokal */}
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/bouquet-hero.jpg")}
            style={styles.image}
          />
          <View
            style={[
              styles.imageOverlay,
              {
                backgroundColor: darkMode
                  ? "rgba(43, 27, 47, 0.7)"
                  : "rgba(255, 240, 245, 0.7)",
              },
            ]}
          >
            <Text
              style={[
                styles.imageText,
                { color: darkMode ? "#f3cfff" : "#d63384" },
              ]}
            >
              Temukan Keindahan dalam Setiap Buket
            </Text>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <Text
            style={[
              styles.sectionTitle,
              { color: darkMode ? "#f3cfff" : "#d63384" },
            ]}
          >
            ✨ Fitur Unggulan
          </Text>

          {/* Feature Card 1 */}
          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
              },
            ]}
          >
            <View style={styles.featureIcon}>
              <Text style={{ fontSize: 24 }}>📝</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text
                style={[
                  styles.featureTitle,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                Tambah & Kelola
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                Tambahkan bouquet baru lengkap dengan gambar, harga, dan ukuran.
                Edit dan hapus kapan saja.
              </Text>
            </View>
          </View>

          {/* Feature Card 2 */}
          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
              },
            ]}
          >
            <View style={styles.featureIcon}>
              <Text style={{ fontSize: 24 }}>🌙</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text
                style={[
                  styles.featureTitle,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                Mode Gelap
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                Aktifkan mode gelap untuk tampilan yang lebih nyaman di malam
                hari.
              </Text>
            </View>
          </View>

          {/* Feature Card 3 */}
          <View
            style={[
              styles.featureCard,
              {
                backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
              },
            ]}
          >
            <View style={styles.featureIcon}>
              <Text style={{ fontSize: 24 }}>💝</Text>
            </View>
            <View style={styles.featureTextContainer}>
              <Text
                style={[
                  styles.featureTitle,
                  { color: darkMode ? "#f3cfff" : "#d63384" },
                ]}
              >
                Koleksi Pribadi
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  { color: darkMode ? "#e6d7f5" : "#6c567b" },
                ]}
              >
                Simpan semua bouquet favoritmu dalam satu aplikasi yang mudah
                digunakan.
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <TouchableOpacity
          onPress={handleNavigateToBouquet}
          style={[
            styles.ctaContainer,
            {
              backgroundColor: darkMode ? "#3a2642" : "#ffcce0",
              borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
            },
          ]}
        >
          <Text
            style={[
              styles.ctaText,
              { color: darkMode ? "#f3cfff" : "#d63384" },
            ]}
          >
            Mulai koleksi bouquetmu sekarang! 🌸
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  imageContainer: {
    position: "relative",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    alignItems: "center",
  },
  imageText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  featureCard: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  ctaContainer: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
