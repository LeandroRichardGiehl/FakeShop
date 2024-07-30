import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useCartContext } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const { addProduct } = useCartContext();
  const navigation = useNavigation<any>();

  const handleAddToCart = () => {
    addProduct(product);
    Alert.alert('Produto adicionado ao carrinho', `${product.title} foi adicionado ao carrinho.`);
    navigation.goBack(); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.rating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#121212", 
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    backgroundColor: "#2C2C2C", 
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EAEAEA", 
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00BFAE", 
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#B0B0B0", 
    textAlign: "center",
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: "#EAEAEA", 
    marginTop: 10,
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: "#00BFAE", 
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: "#db7093",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addToCartText: {
    color: "#fff", 
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
