import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Styles from '../styles/Styles';

export default function EditCustomer({ route, navigation }) {

    const { id } = route.params;

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    useEffect(() => {
        const getCustomer = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://kami-backend-5rs0.onrender.com/customers/${id}`
                );
                console.log('CUSTOMER:', response.data);
                setName(response.data.name || '');
                setPhone(
                    response.data.phone
                        ? String(response.data.phone)
                        : ''
                );
            } catch (error) {
                console.log(
                    'GET CUSTOMER ERROR:',
                    error.response?.data || error.message
                );
                Alert.alert(
                    'Error',
                    'Failed to load customer.'
                );
            } finally {
                setLoading(false);
            }
        };
        getCustomer();
    }, [id]);
    const handleUpdateCustomer = async () => {
        if (name.trim() === '' || phone.trim() === '') {
            Alert.alert(
                'Invalid information',
                'Please enter a valid customer name and phone number.'
            );
            return;
        }
        try {
            setUpdating(true);
            const token = await AsyncStorage.getItem('TOKEN');
            console.log('TOKEN:', token ? 'Exists' : 'Missing');
            console.log('CUSTOMER ID:', id);
            const customerData = {
                name: name.trim(),
                phone: phone.trim(),
            };
            console.log('UPDATE DATA:', customerData);
            await axios.put(
                `https://kami-backend-5rs0.onrender.com/customers/${id}`,
                customerData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            Alert.alert(
                'Success',
                'Customer updated successfully.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (error) {
            console.log(
                'UPDATE CUSTOMER ERROR:',
                error.response?.data || error.message
            );
            console.log(
                'STATUS:',
                error.response?.status
            );
            if (error.response?.status === 401) {
                Alert.alert(
                    'Unauthorized',
                    'Your login session has expired. Please login again.'
                );
            } else if (error.response?.status === 403) {
                Alert.alert(
                    'Forbidden',
                    'You do not have permission to update this customer.'
                );
            } else if (error.response?.status === 404) {
                Alert.alert(
                    'Not Found',
                    'Customer was not found.'
                );
            } else if (error.response?.status === 400) {
                Alert.alert(
                    'Invalid Data',
                    'The customer information is invalid.'
                );
            } else {
                Alert.alert(
                    'Error',
                    'Failed to update customer.'
                );
            }
        } finally {

            setUpdating(false);
        }
    };
    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Appbar.Header
                    style={Styles.backContainer}
                    statusBarHeight={0}
                >
                    <Appbar.BackAction
                        color="#fff"
                        onPress={() => navigation.goBack()}
                    />
                    <Appbar.Content
                        title="Edit Customer"
                        titleStyle={{ color: '#fff' }}
                    />
                </Appbar.Header>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ActivityIndicator
                        size="large"
                    />
                    <Text style={{ marginTop: 10 }}>
                        Loading customer...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header
                style={Styles.backContainer}
                statusBarHeight={0}
            >
                <Appbar.BackAction
                    color="#fff"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title="Edit Customer"
                    titleStyle={{ color: '#fff' }}
                />
            </Appbar.Header>
            <View style={Styles.serviceGroup}>
                <View style={Styles.inputGroup}>
                    <Text style={Styles.nameLable}>
                        Customer Name *
                    </Text>
                    <TextInput
                        style={Styles.nameInput}
                        placeholder="Input customer name"
                        value={name}
                        onChangeText={setName}
                        editable={!updating}
                    />
                </View>
                <View style={Styles.inputGroup}>
                    <Text style={Styles.nameLable}>
                        Phone *
                    </Text>
                    <TextInput
                        style={Styles.nameInput}
                        placeholder="Input phone number"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                        editable={!updating}
                    />
                </View>
                <TouchableOpacity
                    style={[
                        Styles.addButton,
                        {
                            opacity: updating ? 0.6 : 1,
                        },
                    ]}
                    onPress={handleUpdateCustomer}
                    disabled={updating}
                >
                    {updating ? (
                        <ActivityIndicator
                            color="#fff"
                        />
                    ) : (
                        <Text style={Styles.buttonText}>
                            Update
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}