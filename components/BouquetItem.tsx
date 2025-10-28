import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/themeStore";
import { darkTheme, lightTheme } from "@/types/theme";
import ReactNativeModal from "react-native-modal";
import { useRouter } from "expo-router";

export const BouquetItem = ({ item, onEdit, onDelete }: any) => {
  const { darkMode } = useThemeStore();
  const theme = darkMode ? darkTheme : lightTheme;
  const [confirmVisible, setConfirmVisible] = useState(false);
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/detail/${item.id}`)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Image
          source={{ uri: item.image || "https://via.placeholder.com/50" }}
          style={styles.image}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.price, { color: theme.text }]}>
            Rp {item.price}
          </Text>
        </View>

        <TouchableOpacity onPress={() => onEdit(item)} style={styles.icon}>
          <Ionicons name="create-outline" size={24} color={theme.text} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setConfirmVisible(true)}
          style={styles.icon}
        >
          <Ionicons name="trash-outline" size={24} color="#EF4444" />
        </TouchableOpacity>

        {/* Modal Konfirmasi Delete */}
        <ReactNativeModal
          isVisible={confirmVisible}
          onBackdropPress={() => setConfirmVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Hapus bouquet ini?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setConfirmVisible(false)}
                style={[styles.btn, { backgroundColor: "#6B7280" }]}
              >
                <Text style={styles.btnText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onDelete(item.id);
                  setConfirmVisible(false);
                }}
                style={[styles.btn, { backgroundColor: "#EF4444" }]}
              >
                <Text style={styles.btnText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ReactNativeModal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    opacity: 0.7,
  },
  icon: {
    marginHorizontal: 5,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
