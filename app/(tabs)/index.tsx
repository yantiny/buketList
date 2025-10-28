import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
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
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bouquets berdasarkan search query - HANYA berdasarkan name
  const filteredBouquets = bouquets.filter((bouquet) =>
    bouquet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#2b1b2f" : "#fff0f5" },
      ]}
      edges={["right", "left", "bottom"]}
    >
      {/* Header dengan gradient effect */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: darkMode ? "#3a2642" : "#ffcce0",
            borderBottomColor: darkMode ? "#b48ec6" : "#f8a5c2",
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                { color: darkMode ? "#f3cfff" : "#d63384" },
              ]}
            >
              💐 Koleksi Bouquet
            </Text>
            <Text
              style={[
                styles.subtitle,
                { color: darkMode ? "#e6d7f5" : "#6c567b" },
              ]}
            >
              {filteredBouquets.length} bouquet tersimpan
            </Text>
          </View>

          <TouchableOpacity
            onPress={toggleDarkMode}
            style={[
              styles.themeButton,
              { backgroundColor: darkMode ? "#4a3452" : "#ffb6d5" },
            ]}
          >
            <Ionicons
              name={darkMode ? "moon" : "sunny"}
              size={22}
              color={darkMode ? "#f3cfff" : "#d63384"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {/* Search Bar - hanya muncul jika ada bouquet */}
        {bouquets.length > 0 && (
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: darkMode ? "#3a2642" : "#ffe4ec",
                borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
              },
            ]}
          >
            <Ionicons
              name="search"
              size={20}
              color={darkMode ? "#b48ec6" : "#f8a5c2"}
              style={styles.searchIcon}
            />
            <TextInput
              style={[
                styles.searchInput,
                {
                  color: darkMode ? "#f3cfff" : "#4a4a4a",
                },
              ]}
              placeholder="Cari bouquet berdasarkan nama..."
              placeholderTextColor={darkMode ? "#b48ec6" : "#f8a5c2"}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={clearSearch}
                style={styles.clearButton}
              >
                <Ionicons
                  name="close-circle"
                  size={20}
                  color={darkMode ? "#b48ec6" : "#f8a5c2"}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Jika array kosong */}
        {bouquets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: darkMode ? "#3a2642" : "#ffe4ec" },
              ]}
            >
              <Ionicons
                name="flower-outline"
                size={50}
                color={darkMode ? "#b48ec6" : "#f8a5c2"}
              />
            </View>
            <Text
              style={[
                styles.emptyTitle,
                { color: darkMode ? "#f3cfff" : "#d63384" },
              ]}
            >
              Belum Ada Bouquet
            </Text>
            <Text
              style={[
                styles.emptyText,
                { color: darkMode ? "#e6d7f5" : "#6c567b" },
              ]}
            >
              Yuk tambahkan bouquet pertama kamu{"\n"}untuk memulai koleksi!
            </Text>
            <TouchableOpacity
              style={[
                styles.emptyButton,
                { backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2" },
              ]}
              onPress={handleAdd}
            >
              <Ionicons
                name="add"
                size={20}
                color={darkMode ? "#2b1b2f" : "#ffffff"}
              />
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
        ) : (
          <View style={styles.listContainer}>
            {/* List Header dengan info pencarian */}
            <View style={styles.listHeader}>
              <View>
                <Text
                  style={[
                    styles.listTitle,
                    { color: darkMode ? "#f3cfff" : "#d63384" },
                  ]}
                >
                  {searchQuery
                    ? `Hasil pencarian "${searchQuery}"`
                    : "Bouquet Kamu 🌸"}
                </Text>
                {searchQuery && (
                  <Text
                    style={[
                      styles.searchResultText,
                      { color: darkMode ? "#e6d7f5" : "#6c567b" },
                    ]}
                  >
                    Ditemukan {filteredBouquets.length} bouquet
                  </Text>
                )}
              </View>

              <View
                style={[
                  styles.countBadge,
                  { backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2" },
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    { color: darkMode ? "#2b1b2f" : "#ffffff" },
                  ]}
                >
                  {filteredBouquets.length}
                </Text>
              </View>
            </View>

            {/* Jika tidak ada hasil pencarian */}
            {searchQuery && filteredBouquets.length === 0 ? (
              <View style={styles.noResultsContainer}>
                <Ionicons
                  name="search-outline"
                  size={60}
                  color={darkMode ? "#b48ec6" : "#f8a5c2"}
                />
                <Text
                  style={[
                    styles.noResultsTitle,
                    { color: darkMode ? "#f3cfff" : "#d63384" },
                  ]}
                >
                  Bouquet tidak ditemukan
                </Text>
                <Text
                  style={[
                    styles.noResultsText,
                    { color: darkMode ? "#e6d7f5" : "#6c567b" },
                  ]}
                >
                  Tidak ada bouquet dengan nama{"\n"}"{searchQuery}"
                </Text>
                <TouchableOpacity
                  onPress={clearSearch}
                  style={[
                    styles.noResultsButton,
                    { backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2" },
                  ]}
                >
                  <Text
                    style={[
                      styles.noResultsButtonText,
                      { color: darkMode ? "#2b1b2f" : "#ffffff" },
                    ]}
                  >
                    Tampilkan Semua
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* List Bouquet */
              <FlatList
                data={filteredBouquets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <BouquetItem
                    item={item}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item.id)}
                    onTogglePurchased={() => {}}
                  />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        )}

        {/* Floating Add Button - hanya muncul jika ada bouquet */}
        {bouquets.length > 0 && (
          <TouchableOpacity
            style={[
              styles.fab,
              {
                backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2",
                shadowColor: darkMode ? "#000" : "#f5a4c7",
              },
            ]}
            onPress={handleAdd}
          >
            <Ionicons
              name="add"
              size={30}
              color={darkMode ? "#2b1b2f" : "#ffffff"}
            />
          </TouchableOpacity>
        )}
      </View>

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

// Styles tetap sama seperti sebelumnya...
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.8,
  },
  themeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  clearButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 22,
    marginBottom: 30,
  },
  emptyButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    gap: 8,
  },
  emptyButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
    paddingTop: 8,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  searchResultText: {
    fontSize: 12,
    opacity: 0.8,
  },
  countBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 30,
    alignItems: "center",
    marginTop: 2,
  },
  countText: {
    fontSize: 14,
    fontWeight: "700",
  },
  listContent: {
    paddingBottom: 100,
    gap: 12,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  noResultsText: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 24,
  },
  noResultsButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  noResultsButtonText: {
    fontSize: 14,
    fontWeight: "600",
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
