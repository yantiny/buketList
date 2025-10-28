import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { BouquetItem } from "@/components/BouquetItem";
import BouquetModal from "@/components/Modal";
import { useThemeStore } from "@/store/themeStore";
import { useBouquetStore } from "@/store/useBouquetStore";
import { darkTheme, lightTheme } from "@/types/theme";

export default function IndexScreen() {
  const { bouquets, deleteBouquet } = useBouquetStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  const theme = darkMode ? darkTheme : lightTheme;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleAdd = () => {
    setSelectedItem(null);
    setModalVisible(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    deleteBouquet(id);
    Toast.show({
      type: "success",
      text1: "Berhasil dihapus",
      text2: "Bouquet berhasil dihapus 🗑️",
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>BuketList</Text>

        <TouchableOpacity onPress={toggleDarkMode}>
          <Ionicons
            name={darkMode ? "moon" : "sunny"}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      {/* Jika array kosong */}
      {bouquets.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="flower-outline" size={40} color={theme.text} />
          <Text style={[styles.emptyText, { color: theme.text }]}>
            Belum ada bouquet, yuk tambahkan!
          </Text>
        </View>
      ) : (
        <FlatList
          data={bouquets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BouquetItem
              item={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
              onTogglePurchased={() => {}}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Floating Add Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.button }]}
        onPress={handleAdd}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal Add/Edit */}
      <BouquetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        editItem={selectedItem}
      />

      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    marginTop: 8,
    opacity: 0.8,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});
