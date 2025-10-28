import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useBouquetStore } from "@/store/useBouquetStore";
import { useThemeStore } from "@/store/themeStore";

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
    size?: string;
    category?: string;
    description?: string;
  } | null;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function AddBouquetModal({
  visible,
  onClose,
  editItem,
}: AddBouquetModalProps) {
  const { addBouquet, updateBouquet } = useBouquetStore();
  const { darkMode } = useThemeStore();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [purchased, setPurchased] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    "Romantic",
    "Birthday",
    "Anniversary",
    "Congratulations",
    "Get Well Soon",
    "Wedding",
    "Funeral",
    "Custom",
  ];

  // 🔄 Reset form ketika modal dibuka
  useEffect(() => {
    if (visible) {
      if (editItem) {
        setName(editItem.name || "");
        setPrice(editItem.price?.toString() || "");
        setSize(editItem.size || "");
        setCategory(editItem.category || "");
        setDescription(editItem.description || "");
        setImage(editItem.image || "");
        setSelectedImage(editItem.image || null);
        setPurchased(editItem.purchased || false);
      } else {
        resetForm();
      }
    }
  }, [editItem, visible]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setSize("");
    setCategory("");
    setDescription("");
    setImage("");
    setSelectedImage(null);
    setPurchased(false);
  };

  // Fungsi untuk memilih gambar dari galeri
  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Izin diperlukan", "Butuh izin untuk mengakses galeri foto!");
      return;
    }

    // Buka image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setSelectedImage(selectedAsset.uri);
      setImage(selectedAsset.uri); // Juga set ke state image untuk konsistensi
    }
  };

  // Fungsi untuk mengambil foto dengan kamera
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Izin diperlukan", "Butuh izin untuk mengakses kamera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setSelectedImage(selectedAsset.uri);
      setImage(selectedAsset.uri);
    }
  };

  const handleSubmit = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Error", "Harap isi nama dan harga bouquet!");
      return;
    }

    const bouquetData = {
      name: name.trim(),
      price: parseFloat(price) || 0,
      size: size.trim(),
      category: category.trim(),
      description: description.trim(),
      image:
        selectedImage ||
        image.trim() ||
        "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=400",
      purchased,
      isSold: false,
    };

    if (editItem) {
      updateBouquet(editItem.id, bouquetData);
    } else {
      addBouquet(bouquetData);
    }

    resetForm();
    onClose();
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImage("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: darkMode ? "#2b1b2f" : "#fff0f5",
              maxHeight: SCREEN_HEIGHT * 0.85, // Tinggi sedikit karena tambah fitur gambar
            },
          ]}
        >
          {/* Header */}
          <View
            style={[
              styles.modalHeader,
              {
                borderBottomColor: darkMode ? "#b48ec6" : "#f8a5c2",
                backgroundColor: darkMode ? "#3a2642" : "#ffcce0",
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: darkMode ? "#f3cfff" : "#d63384" },
              ]}
            >
              {editItem ? "Edit Bouquet" : "Tambah Bouquet"}
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons
                name="close"
                size={24}
                color={darkMode ? "#f3cfff" : "#d63384"}
              />
            </TouchableOpacity>
          </View>

          {/* Form Content */}
          <View style={styles.formContainer}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Image Picker Section */}
              <View style={styles.inputGroup}>
                <Text
                  style={[
                    styles.label,
                    { color: darkMode ? "#f3cfff" : "#d63384" },
                  ]}
                >
                  Gambar Bouquet
                </Text>

                {/* Tampilkan gambar yang dipilih */}
                {selectedImage ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.imagePreview}
                    />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={removeImage}
                    >
                      <Ionicons name="close-circle" size={24} color="#ff4444" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons
                      name="image-outline"
                      size={40}
                      color={darkMode ? "#b48ec6" : "#f8a5c2"}
                    />
                    <Text
                      style={[
                        styles.imagePlaceholderText,
                        { color: darkMode ? "#b48ec6" : "#f8a5c2" },
                      ]}
                    >
                      Belum ada gambar
                    </Text>
                  </View>
                )}

                {/* Tombol Pilih Gambar */}
                <View style={styles.imageButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.imageButton,
                      { backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2" },
                    ]}
                    onPress={pickImage}
                  >
                    <Ionicons
                      name="images"
                      size={18}
                      color={darkMode ? "#2b1b2f" : "#ffffff"}
                    />
                    <Text
                      style={[
                        styles.imageButtonText,
                        { color: darkMode ? "#2b1b2f" : "#ffffff" },
                      ]}
                    >
                      Dari Galeri
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.imageButton,
                      { backgroundColor: darkMode ? "#4a3452" : "#ffb6d5" },
                    ]}
                    onPress={takePhoto}
                  >
                    <Ionicons
                      name="camera"
                      size={18}
                      color={darkMode ? "#f3cfff" : "#d63384"}
                    />
                    <Text
                      style={[
                        styles.imageButtonText,
                        { color: darkMode ? "#f3cfff" : "#d63384" },
                      ]}
                    >
                      Ambil Foto
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Atau input URL manual */}
                <Text
                  style={[
                    styles.helperText,
                    {
                      color: darkMode ? "#b48ec6" : "#f8a5c2",
                      textAlign: "center",
                      marginVertical: 8,
                    },
                  ]}
                >
                  atau
                </Text>

                <TextInput
                  placeholder="Masukkan URL gambar (opsional)"
                  placeholderTextColor={darkMode ? "#b48ec6" : "#f8a5c2"}
                  style={[
                    styles.input,
                    {
                      backgroundColor: darkMode ? "#3a2642" : "#ffffff",
                      borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                      color: darkMode ? "#f3cfff" : "#333333",
                    },
                  ]}
                  value={image}
                  onChangeText={(text) => {
                    setImage(text);
                    if (text && !text.startsWith("file://")) {
                      setSelectedImage(null);
                    }
                  }}
                />
                <Text
                  style={[
                    styles.helperText,
                    { color: darkMode ? "#b48ec6" : "#f8a5c2" },
                  ]}
                >
                  Kosongkan untuk menggunakan gambar default
                </Text>
              </View>

              {/* Nama Bouquet */}
              <View style={styles.inputGroup}>
                <Text
                  style={[
                    styles.label,
                    { color: darkMode ? "#f3cfff" : "#d63384" },
                  ]}
                >
                  Nama Bouquet *
                </Text>
                <TextInput
                  placeholder="Masukkan nama bouquet"
                  placeholderTextColor={darkMode ? "#b48ec6" : "#f8a5c2"}
                  style={[
                    styles.input,
                    {
                      backgroundColor: darkMode ? "#3a2642" : "#ffffff",
                      borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                      color: darkMode ? "#f3cfff" : "#333333",
                    },
                  ]}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Harga & Ukuran */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfInput]}>
                  <Text
                    style={[
                      styles.label,
                      { color: darkMode ? "#f3cfff" : "#d63384" },
                    ]}
                  >
                    Harga *
                  </Text>
                  <TextInput
                    placeholder="Rp 150.000"
                    placeholderTextColor={darkMode ? "#b48ec6" : "#f8a5c2"}
                    style={[
                      styles.input,
                      {
                        backgroundColor: darkMode ? "#3a2642" : "#ffffff",
                        borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                        color: darkMode ? "#f3cfff" : "#333333",
                      },
                    ]}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>

                <View style={[styles.inputGroup, styles.halfInput]}>
                  <Text
                    style={[
                      styles.label,
                      { color: darkMode ? "#f3cfff" : "#d63384" },
                    ]}
                  >
                    Ukuran
                  </Text>
                  <TextInput
                    placeholder="Small/Medium/Large"
                    placeholderTextColor={darkMode ? "#b48ec6" : "#f8a5c2"}
                    style={[
                      styles.input,
                      {
                        backgroundColor: darkMode ? "#3a2642" : "#ffffff",
                        borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                        color: darkMode ? "#f3cfff" : "#333333",
                      },
                    ]}
                    value={size}
                    onChangeText={setSize}
                  />
                </View>
              </View>

              {/* Kategori */}
              <View style={styles.inputGroup}>
                <Text
                  style={[
                    styles.label,
                    { color: darkMode ? "#f3cfff" : "#d63384" },
                  ]}
                >
                  Kategori
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoriesContainer}
                  contentContainerStyle={styles.categoriesContent}
                >
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryChip,
                        {
                          backgroundColor:
                            category === cat
                              ? darkMode
                                ? "#b48ec6"
                                : "#f8a5c2"
                              : darkMode
                              ? "#3a2642"
                              : "#ffffff",
                          borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                        },
                      ]}
                      onPress={() => handleCategorySelect(cat)}
                    >
                      <Text
                        style={[
                          styles.categoryText,
                          {
                            color:
                              category === cat
                                ? darkMode
                                  ? "#2b1b2f"
                                  : "#ffffff"
                                : darkMode
                                ? "#f3cfff"
                                : "#d63384",
                          },
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TextInput
                  placeholder="Atau ketik kategori custom"
                  placeholderTextColor={darkMode ? "#b48ec6" : "#f8a5c2"}
                  style={[
                    styles.input,
                    {
                      backgroundColor: darkMode ? "#3a2642" : "#ffffff",
                      borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                      color: darkMode ? "#f3cfff" : "#333333",
                      marginTop: 8,
                    },
                  ]}
                  value={category}
                  onChangeText={setCategory}
                />
              </View>

              {/* Deskripsi */}
              <View style={styles.inputGroup}>
                <Text
                  style={[
                    styles.label,
                    { color: darkMode ? "#f3cfff" : "#d63384" },
                  ]}
                >
                  Deskripsi
                </Text>
                <TextInput
                  placeholder="Deskripsi bouquet (jenis bunga, makna, dll)"
                  placeholderTextColor={darkMode ? "#b48ec6" : "#f8a5c2"}
                  style={[
                    styles.textArea,
                    {
                      backgroundColor: darkMode ? "#3a2642" : "#ffffff",
                      borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                      color: darkMode ? "#f3cfff" : "#333333",
                    },
                  ]}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              {/* Purchased Switch */}
              <View
                style={[
                  styles.switchContainer,
                  {
                    backgroundColor: darkMode ? "#3a2642" : "#ffffff",
                    borderColor: darkMode ? "#b48ec6" : "#f8a5c2",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.switchLabel,
                    { color: darkMode ? "#f3cfff" : "#d63384" },
                  ]}
                >
                  Sudah Dibeli?
                </Text>
                <Switch
                  value={purchased}
                  onValueChange={setPurchased}
                  thumbColor={purchased ? "#f465a8ff" : "#f4f3f4"}
                  trackColor={{ false: "#767577", true: "#ffcdebff" }}
                />
              </View>
            </ScrollView>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              {
                backgroundColor: darkMode ? "#b48ec6" : "#f8a5c2",
              },
            ]}
          >
            <Ionicons
              name={editItem ? "checkmark" : "add"}
              size={20}
              color={darkMode ? "#2b1b2f" : "#ffffff"}
            />
            <Text
              style={[
                styles.submitButtonText,
                { color: darkMode ? "#2b1b2f" : "#ffffff" },
              ]}
            >
              {editItem ? "Simpan Perubahan" : "Tambah Bouquet"}
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
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 0,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    height: 500, // Tinggi ditambah untuk fitur gambar
    marginVertical: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  // Styles untuk image picker
  imagePreviewContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 12,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#f8a5c2",
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#f8a5c2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    alignSelf: "center",
  },
  imagePlaceholderText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  imageButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 8,
  },
  imageButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },
  categoriesContainer: {
    maxHeight: 40,
  },
  categoriesContent: {
    paddingVertical: 4,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
