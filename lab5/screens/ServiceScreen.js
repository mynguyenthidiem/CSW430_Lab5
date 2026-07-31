import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Styles from '../styles/Styles';

export default function ServiceScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const handleAddService = async () => {
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

      await axios.post(
        'https://kami-backend-5rs0.onrender.com/services',
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Service added successfully.');

      setName('');
      setPrice(0);

      navigation.goBack();
    } catch (error) {
      console.log(error.response?.data || error);
      alert('Failed to add service.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header style={Styles.backContainer} statusBarHeight={0}>
        <Appbar.BackAction
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title="Service" titleStyle={{ color: '#fff' }} />
      </Appbar.Header>

      <View style={Styles.serviceGroup}>
        <View style={Styles.inputGroup}>
          <Text style={Styles.nameLable}>Service Name *</Text>
          <TextInput
            style={Styles.nameInput}
            placeholder="Input a service name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={Styles.inputGroup}>
          <Text style={Styles.nameLable}>Price *</Text>
          <TextInput
            style={Styles.nameInput}
            keyboardType="numeric"
            value={price === 0 ? '' : price.toString()}
            onChangeText={(text) => setPrice(Number(text))}
          />
        </View>

        <TouchableOpacity
          style={Styles.addButton}
          onPress={handleAddService}>
          <Text style={Styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}