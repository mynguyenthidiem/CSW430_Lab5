import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Styles from '../styles/Styles';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('0373007856');
  const [password, setPassword] = useState('123');

  const handleLogin = () => {
    const loginData = {
      phone,
      password,
    };

    console.log('Sending:', loginData);

    axios
      .post('https://kami-backend-5rs0.onrender.com/auth', loginData)
      .then(async (response) => {
        const { token, name } = response.data;

        await AsyncStorage.setItem('TOKEN', token);
        await AsyncStorage.setItem('NAME', name);

        navigation.replace('MainTabs');
      })
      .catch((error) => {
        alert('Login failed');
      });
  };
  return (
    <ScrollView
      contentContainerStyle={Styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={Styles.title}>Login</Text>

      <TextInput
        mode="outlined"
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        style={Styles.input}
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.input}
      />

      <TouchableOpacity style={Styles.button} onPress={handleLogin}>
        <Text style={Styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
