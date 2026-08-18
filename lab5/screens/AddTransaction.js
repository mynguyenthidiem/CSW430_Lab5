import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
    FlatList,
    Modal,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Menu } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ServiceList from './ServiceList';
import Styles from '../styles/Styles';

export default function AddTransaction({ navigation }) {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [showCustomers, setShowCustomers] = useState(false);

    const [services, setServices] = useState([]);
    const [transactionId, setTransactionId] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    const [loading, setLoading] = useState(false);

    const [showSummary, setShowSummary] = useState(false);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const getCustomers = async () => {
            try {
                const token = await AsyncStorage.getItem('TOKEN');

                const response = await axios.get(
                    'https://kami-backend-5rs0.onrender.com/customers',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                console.log('CUSTOMERS:', response.data);
                setCustomers(response.data);
            } catch (error) {
                console.log(
                    'GET CUSTOMERS ERROR:',
                    error.response?.data || error.message
                );

                Alert.alert('Error', 'Failed to load customers.');
            }
        };

        const getServices = async () => {
            try {
                const response = await axios.get(
                    'https://kami-backend-5rs0.onrender.com/services'
                );

                console.log('SERVICES:', response.data);
                setServices(response.data);
            } catch (error) {
                console.log(
                    'GET SERVICES ERROR:',
                    error.response?.data || error.message
                );

                Alert.alert('Error', 'Failed to load services.');
            }
        };

        const getTransactionId = async () => {
            try {
                const token = await AsyncStorage.getItem('TOKEN');
            } catch (error) {
                console.log('GET TRANSACTION ID ERROR:', error.message);
            }
        };

        getCustomers();
        getServices();
        getTransactionId();
    }, []);

    const handleSelectCustomer = (customer) => {
        setSelectedCustomer(customer);
        setName(customer.name || '');
        setPhone(customer.phone ? String(customer.phone) : '');
        setShowCustomers(false);
    };
    const handleOpenSummary = () => {
        if (!selectedCustomer) {
            Alert.alert('Missing Customer', 'Please select a customer.');
            return;
        }

        if (selectedServices.length === 0) {
            Alert.alert('Missing Service', 'Please select at least one service.');
            return;
        }

        setShowSummary(true);
    };

    const handleAddTransaction = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem('TOKEN');

            const transactionData = {
                customerId: selectedCustomer._id,
                services: selectedServices.map(service => ({
                    serviceId: service._id,
                    quantity: service.quantity,
                    executor: service.executor,
                })),
            };

            console.log('TRANSACTION DATA:', JSON.stringify(transactionData, null, 2));

            await axios.post(
                'https://kami-backend-5rs0.onrender.com/transactions',
                transactionData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setShowSummary(false);

            Alert.alert(
                'Success',
                'Transaction added successfully.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        } catch (error) {
            console.log('ADD TRANSACTION ERROR');
            console.log('STATUS:', error.response?.status);
            console.log('DATA:', error.response?.data);
            console.log('MESSAGE:', error.message);

            Alert.alert(
                'Error',
                JSON.stringify(error.response?.data || error.message)
            );
        } finally {
            setLoading(false);
        }
    };

    const totalPrice = selectedServices.reduce((sum, service) => {
        const price = Number(service.price || 0);
        const quantity = Number(service.quantity || 1);
        return sum + price * quantity;
    }, 0);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header style={Styles.backContainer} statusBarHeight={0}>
                <Appbar.BackAction
                    color="#fff"
                    onPress={() => navigation.goBack()}
                />

                <Appbar.Content
                    title="Add Transaction"
                    titleStyle={{ color: '#fff' }}
                />
            </Appbar.Header>

            <View style={[Styles.serviceGroup, { flex: 1 }]}>
                <View style={Styles.inputGroup}>
                    <Text style={Styles.nameLable}>Customer *</Text>

                    <TouchableOpacity
                        onPress={() => setShowCustomers(!showCustomers)}
                    >
                        <View style={Styles.addTransactionInput}>
                            <TextInput
                                placeholder="Select customer"
                                value={name}
                                editable={false}
                                pointerEvents="none"
                            />

                            {showCustomers ? (
                                <Icon name="arrow-drop-up" size={20} color="#000" />
                            ) : (
                                <Icon name="arrow-drop-down" size={20} color="#000" />
                            )}
                        </View>
                    </TouchableOpacity>

                    {showCustomers && (
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderRadius: 8,
                                marginTop: 5,
                                maxHeight: 200,
                                backgroundColor: '#fff',
                            }}
                        >
                            <FlatList
                                data={customers}
                                keyExtractor={(item) => item._id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => handleSelectCustomer(item)}
                                        style={{
                                            padding: 15,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#eee',
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                            {item.name}
                                        </Text>

                                        <Text style={{ color: '#777', marginTop: 3 }}>
                                            {item.phone}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                </View>

                <Text style={Styles.nameLable}>Services *</Text>

                <FlatList
                    data={services}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ServiceList
                            service={item}
                            selectedServices={selectedServices}
                            setSelectedServices={setSelectedServices}
                        />
                    )}
                />
                <TouchableOpacity style={Styles.addButton}>
                    <Text style={Styles.buttonText}> See Summary ({totalPrice.toLocaleString('vi-VN')} đ)</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
}