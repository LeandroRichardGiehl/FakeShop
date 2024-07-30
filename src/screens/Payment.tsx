import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5'; 

const Payment = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 2) {
      return cleaned;
    } else {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
  };

  const handlePayment = () => {
    if (cardNumber.length !== 16) {
      alert('O número do cartão deve ter 16 dígitos.');
      return;
    }
    
    if (cvv.length !== 3) {
      alert('O CVV deve ter 3 dígitos.');
      return;
    }

    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Pagamento e Entrega</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Endereço de entrega:</Text>
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          placeholderTextColor="#B0B0B0"
          value={address}
          onChangeText={setAddress}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.city]}
            placeholder="Cidade"
            placeholderTextColor="#B0B0B0"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={[styles.input, styles.state]}
            placeholder="Estado"
            placeholderTextColor="#B0B0B0"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Dados de pagamento:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome no cartão"
          placeholderTextColor="#B0B0B0"
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />
        <TextInput
          style={styles.input}
          placeholder="Número do cartão"
          placeholderTextColor="#B0B0B0"
          value={cardNumber}
          onChangeText={text => setCardNumber(text.replace(/[^0-9]/g, ''))}
          keyboardType="numeric"
          maxLength={16}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.expiry]}
            placeholder="Data de validade (MM/AA)"
            placeholderTextColor="#B0B0B0"
            value={formatExpiry(expiry)}
            onChangeText={text => setExpiry(text)}
            keyboardType="numeric"
            maxLength={5}
          />
          <TextInput
            style={[styles.input, styles.cvv]}
            placeholder="CVV"
            placeholderTextColor="#B0B0B0"
            value={cvv}
            onChangeText={text => setCvv(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>{cardHolderName || 'Nome do Titular'}</Text>
        <Text style={styles.cardNumber}>
          {cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : '**** **** **** ****'}
        </Text>
        <Text style={styles.cardText}>Expiração: {formatExpiry(expiry) || 'MM/AA'}</Text>
      </View>

      <Button title="Finalizar pedido" onPress={handlePayment} color="#28a745" />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={50} color="#28a745" style={{ marginBottom: 20 }} />
            <Text style={styles.modalText}>Compra efetuada com sucesso!</Text>
            <Text style={styles.modalText}>As informações serão enviadas para seu email.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Voltar para a tela principal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EAEAEA', 
    marginBottom: 20,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EAEAEA', 
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#444', 
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    color: '#EAEAEA', 
    backgroundColor: '#3C3C3C', 
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  city: {
    flex: 2,
    marginRight: 10,
  },
  state: {
    flex: 1,
  },
  expiry: {
    flex: 2,
    marginRight: 10,
  },
  cvv: {
    flex: 1,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#2C2C2C', 
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardText: {
    color: '#EAEAEA', 
    fontSize: 16,
    marginBottom: 5,
  },
  cardNumber: {
    color: '#EAEAEA', 
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#1E1E1E', 
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#EAEAEA', 
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#007bff', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff', 
    fontSize: 16,
  },
});

export default Payment;
