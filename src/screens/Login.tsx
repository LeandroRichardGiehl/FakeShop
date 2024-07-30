import { StyleSheet, TextInput, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("karn.yong@melivecode.com");
  const [password, setPassword] = useState("melivecode");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TECHDEVS</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>LOGIN</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholder="Insira seu email"
          placeholderTextColor="#B0B0B0"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Insira sua senha"
          placeholderTextColor="#B0B0B0"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin(email, password)}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#db7093",
    letterSpacing: 2,
    textTransform: "uppercase",
    borderBottomWidth: 2,
    borderBottomColor: "#fffafa",
    paddingBottom: 10,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#f5fffa",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00000",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
    color: "#EAEAEA",
    backgroundColor: "#3C3C3C",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
