import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import CustomerList from './CustomerList';
import Styles from '../styles/Styles';

export default function CustomerScreen({ navigation }) {
    const [user, setUser] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const getCustomers = async () => {
                try {
                    // Lấy danh sách customer
                    const customerResponse = await axios.get(
                        'https://kami-backend-5rs0.onrender.com/customers'
                    );

                    // Lấy danh sách transaction
                    const transactionResponse = await axios.get(
                        'https://kami-backend-5rs0.onrender.com/transactions'
                    );

                    const customers = customerResponse.data;
                    const transactions = transactionResponse.data;

                    // Tính Total Spent cho từng customer
                    const customersWithTotal = customers.map(customer => {

                        const totalSpent = transactions
                            .filter(transaction =>
                                String(transaction.customer?._id) ===
                                String(customer._id) &&
                                transaction.status !== 'cancelled'
                            )
                            .reduce(
                                (total, transaction) =>
                                    total + Number(transaction.price || 0),
                                0
                            );

                        return {
                            ...customer,
                            totalSpent,
                        };
                    });

                    // Customer mới nhất lên trước
                    customersWithTotal.sort(
                        (a, b) =>
                            new Date(b.createdAt) -
                            new Date(a.createdAt)
                    );

                    setUser(customersWithTotal);

                } catch (error) {
                    console.log(
                        'Error fetching customers/transactions:',
                        error.response?.data || error.message
                    );
                }
            };

            getCustomers();
        }, [])
    );

    const renderItem = ({ item }) => (
        <CustomerList
            name={item.name}
            phone={item.phone}
            totalMoney={item.totalSpent}
            loyal={item.loyalty}
            onPress={() =>
                navigation.navigate('CustomerDetail', {
                    id: item._id,
                    totalSpent: item.totalSpent,
                })
            }
        />
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.headerContainer}>
                <Text style={Styles.headerText}>
                    Customer
                </Text>
            </View>

            <FlatList
                data={user}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />

            <TouchableOpacity
                style={Styles.addCustomerButton}
                onPress={() => navigation.navigate('AddCustomer')}
            >
                <Text style={Styles.buttonAddCusText}>
                    +
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}