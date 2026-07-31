import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Styles from '../styles/Styles';

export default function EditScreen({ route, navigation }) {
  const { id } = route.params;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  // Load service information
  useEffect(() => {
    axios
      .get(`https://kami-backend-5rs0.onrender.com/services/${id}`)
      .then((response) => {
        setName(response.data.name);
        setPrice(response.data.price);
      })
      .catch((error) => {
        console.log(error);
        alert('Failed to load service.');
      });
  }, []);

  // Update service
  const handleUpdateService = async () => {
    if (name.trim() === '' || price <= 0) {
      alert('Please enter a valid service name and price.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('TOKEN');

      const serviceData = {
        name,
        price,
      };

      await axios.put(
        `https://kami-backend-5rs0.onrender.com/services/${id}`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Service updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.log(error.response?.data || error);
      alert('Failed to update service.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header
        style={Styles.backContainer}
        statusBarHeight={0}>
        <Appbar.BackAction
          color="#fff"
          onPress={() => navigation.goBack()}
        />

        <Appbar.Content
          title="Edit Service"
          titleStyle={{ color: '#fff' }}
        />
      </Appbar.Header>

      <View style={Styles.serviceGroup}>
        <View style={Styles.inputGroup}>
          <Text style={Styles.nameLable}>Service Name *</Text>

          <TextInput
            style={Styles.nameInput}
            placeholder="Input service name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={Styles.inputGroup}>
          <Text style={Styles.nameLable}>Price *</Text>

          <TextInput
            style={Styles.nameInput}
            keyboardType="numeric"
            value={price.toString()}
            onChangeText={(text) => setPrice(Number(text))}
          />
        </View>

        <TouchableOpacity
          style={Styles.addButton}
          onPress={handleUpdateService}>
          <Text style={Styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}