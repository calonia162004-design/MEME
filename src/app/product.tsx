
import { useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

const products: Product[] = [
  {
    id: "1",
    name: "Nike Sneakers",
    price: 2500,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: "2",
    name: "Headphones",
    price: 1800,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: "3",
    name: "Backpack",
    price: 950,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
  },
  {
    id: "4",
    name: "Classic Watch",
    price: 1500,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: "5",
    name: "T-Shirt",
    price: 450,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
  },
  {
    id: "6",
    name: "Sunglasses",
    price: 650,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
  },
];

const categories = [
  "All",
  "Shoes",
  "Electronics",
  "Bags",
  "Accessories",
  "Clothing",
];

export default function ProductScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (id: string) => {
    setCart((previous) => ({
      ...previous,
      [id]: (previous[id] || 0) + 1,
    }));
  };

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>MY STORE</Text>
          <Text style={styles.subtitle}>
            Discover your favorite products
          </Text>
        </View>

        <View style={styles.cart}>
          <Text style={styles.cartText}>🛒 {cartCount}</Text>
        </View>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search products..."
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.heading}>Categories</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        style={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item &&
                styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item &&
                  styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.heading}>Our Products</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.productRow}
        ListEmptyComponent={
          <Text style={styles.empty}>No products found.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="cover"
            />

            <View style={styles.productDetails}>
              <Text style={styles.productCategory}>
                {item.category}
              </Text>

              <Text style={styles.productName}>
                {item.name}
              </Text>

              <Text style={styles.price}>
                ₱{item.price.toLocaleString("en-PH")}
              </Text>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item.id)}
              >
                <Text style={styles.addButtonText}>
                  + Add to Cart
                </Text>
              </TouchableOpacity>

              {(cart[item.id] || 0) > 0 && (
                <Text style={styles.quantity}>
                  Added: {cart[item.id]}
                </Text>
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingTop: 10,
  },
  header: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 27,
    fontWeight: "900",
    color: "#25264D",
  },
  subtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  cart: {
    backgroundColor: "#25264D",
    padding: 12,
    borderRadius: 12,
  },
  cartText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  search: {
    backgroundColor: "#FFF",
    marginHorizontal: 18,
    marginBottom: 15,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E4EC",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#25264D",
    marginHorizontal: 18,
    marginVertical: 10,
  },
  categoryList: {
    flexGrow: 0,
    marginBottom: 8,
  },
  categoryButton: {
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 12,
  },
  selectedCategory: {
    backgroundColor: "#25264D",
  },
  categoryText: {
    color: "#333",
    fontWeight: "600",
  },
  selectedCategoryText: {
    color: "#FFF",
  },
  productList: {
    paddingHorizontal: 12,
    paddingBottom: 25,
  },
  productRow: {
    justifyContent: "space-between",
  },
  productCard: {
    width: "48.5%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E8E8EE",
  },
  productImage: {
    width: "100%",
    height: 145,
    backgroundColor: "#EEE",
  },
  productDetails: {
    padding: 11,
  },
  productCategory: {
    color: "#888",
    fontSize: 11,
  },
  productName: {
    color: "#25264D",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
  },
  price: {
    color: "#25264D",
    fontSize: 18,
    fontWeight: "900",
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: "#25264D",
    padding: 10,
    borderRadius: 9,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 12,
    color: "#28834A",
    marginTop: 8,
  },
  empty: {
    margin: 20,
    color: "#777",
  },
});