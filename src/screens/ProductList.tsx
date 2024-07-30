import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useCartContext } from '../contexts/CartContext';
import { ProductDTO } from "../types/Product";

const ProductList = () => {
  const navigation = useNavigation<any>();
  const { addProduct } = useCartContext();
  const [products, setProducts] = useState<ProductDTO[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/category/electronics');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (product: ProductDTO) => {
    navigation.navigate('Details', { product });
  };

  const handleAddToCart = (product: ProductDTO) => {
    addProduct(product);
    Alert.alert('Produto adicionado ao carrinho', `${product.title} foi adicionado ao carrinho.`);
  };

  const renderItem = ({ item }: { item: ProductDTO }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
          <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Produtos</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", 
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#db7093",
    marginBottom: 20,
    alignSelf: "center",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#2C2C2C", 
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: "cover",
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EAEAEA",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00BFAE", 
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#B0B0B0", 
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#db7093", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartText: {
    color: "#fff", 
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase",
  },
});

export default ProductList;
