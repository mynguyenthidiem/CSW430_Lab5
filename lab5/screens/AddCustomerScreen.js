import React, { useState, useCallback } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Styles from '../styles/Styles';

export default function AddCustomerScreen({ navigation }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddCustomer = async () => {
        if (name.trim() === '' || phone.trim() === '') {
            alert('Please enter a valid customer name and phone number.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('TOKEN');

            const customerData = {
                name,
                phone,
            };

            await axios.post(
                'https://kami-backend-5rs0.onrender.com/customers',
                customerData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert('Customer added successfully.');

            setName('');
            setPhone('');

            navigation.goBack();
        } catch (error) {
            console.log(error.response?.data || error);
            alert('Failed to add customer.');
        }
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header style={Styles.backContainer} statusBarHeight={0}>
                <Appbar.BackAction
                    color="#fff"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content title="Add Customer" titleStyle={{ color: '#fff' }} />
            </Appbar.Header>

            <View style={Styles.serviceGroup}>
                <View style={Styles.inputGroup}>
                    <Text style={Styles.nameLable}>Customer Name *</Text>
                    <TextInput
                        style={Styles.nameInput}
                        placeholder="Input your customer's name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={Styles.inputGroup}>
                    <Text style={Styles.nameLable}>Phone *</Text>
                    <TextInput
                        style={Styles.nameInput}
                        placeholder="Input phone number"
                        value={phone}
                        onChangeText={setPhone}
                    />
                </View>

                <TouchableOpacity
                    style={Styles.addButton}
                    onPress={handleAddCustomer}>
                    <Text style={Styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}