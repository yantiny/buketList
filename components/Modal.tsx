import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBouquetStore } from "@/store/useBouquetStore";
import { useThemeStore } from "@/store/themeStore";
import { darkTheme, lightTheme } from "@/types/theme";

interface AddBouquetModalProps {
  visible: boolean;
  onClose: () => void;
  editItem?: {
    id: string;
    name: string;
    price: number;
    image?: string;
    purchased: boolean;
    isSold: boolean;
  } | null;
}

export default function AddBouquetModal({
  visible,
  onClose,
  editItem,
}: AddBouquetModalProps) {
  const { addBouquet, updateBouquet } = useBouquetStore();
  const { darkMode } = useThemeStore();
  const theme = darkMode ? darkTheme : lightTheme;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [purchased, setPurchased] = useState(false);

  // 🔄 Sinkronisasi data saat modal dibuka
  useEffect(() => {
    if (visible) {
      if (editItem) {
        setName(editItem.name);
        setPrice(editItem.price.toString());
        setImage(editItem.image || "");
        setPurchased(editItem.purchased); // ✅ sinkron checkbox
      } else {
        resetForm();
      }
    }
  }, [editItem, visible]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setPurchased(false);
  };

  const handleSubmit = () => {
    if (!name || !price) return;

    if (editItem) {
      updateBouquet(editItem.id, {
        name,
        price: parseFloat(price),
        image,
        purchased,
      });
    } else {
      addBouquet({
        name,
        price: parseFloat(price),
        image,
        purchased,
        isSold: false,
      });
    }

    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
          {/* Header Modal */}
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {editItem ? "Edit Bouquet" : "Tambah Bouquet"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                resetForm();
                onClose();
              }}
            >
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Input Nama */}
          <TextInput
            placeholder="Nama Bouquet"
            placeholderTextColor={theme.text + "80"}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.border },
            ]}
            value={name}
            onChangeText={setName}
          />

          {/* Input Harga */}
          <TextInput
            placeholder="Harga"
            placeholderTextColor={theme.text + "80"}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.border },
            ]}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          {/* Input URL Gambar */}
          <TextInput
            placeholder="URL Gambar (opsional)"
            placeholderTextColor={theme.text + "80"}
            style={[
              styles.input,
              { color: theme.text, borderColor: theme.border },
            ]}
            value={image}
            onChangeText={setImage}
          />

          {/* Checkbox (Switch) Status Pembelian */}
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: theme.text }]}>
              Sudah Dibeli?
            </Text>
            <Switch
              value={purchased}
              onValueChange={setPurchased}
              thumbColor={purchased ? "#4CAF50" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>

          {/* Tombol Tambah / Simpan */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, { backgroundColor: theme.primary }]}
          >
            <Text style={[styles.buttonText, { color: theme.card }]}>
              {editItem ? "Simpan Perubahan" : "Tambah"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 16,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
