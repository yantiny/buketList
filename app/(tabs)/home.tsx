import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "@/store/themeStore";
import { darkTheme, lightTheme } from "@/types/theme";

export default function HomeScreen() {
  const { darkMode } = useThemeStore();
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={{
            uri: "https://i.pinimg.com/736x/da/d1/d1/dad1d17f41c5942c842d12b24587939d.jpg",
          }}
          style={styles.image}
        />

        <Text style={[styles.title, { color: theme.text }]}>🌸 BuketList</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Aplikasi sederhana untuk mencatat, menambah, dan mengelola koleksi
          bouquet favoritmu.
        </Text>

        <View style={styles.card}>
          <Text style={[styles.cardText, { color: theme.text }]}>
            Kamu bisa menambahkan bouquet baru lengkap dengan gambar, harga, dan
            ukuran. Gunakan fitur edit dan hapus untuk memperbarui koleksi kamu
            kapan saja.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.cardText, { color: theme.text }]}>
            Aktifkan juga mode gelap 🌙 untuk tampilan yang lebih nyaman di
            malam hari.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.8,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: "100%",
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
