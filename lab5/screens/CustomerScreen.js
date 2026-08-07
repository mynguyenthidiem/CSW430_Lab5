import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, Avatar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import CustomerList from './CustomerList';

import Styles, { AppTheme } from '../styles/Styles';

export default function CustomerScreen({ navigation }) {
    const [user, setUser] = useState([]);
    useFocusEffect(
        useCallback(() => {

            axios
                .get('https://kami-backend-5rs0.onrender.com/customers')
                .then((response) => {
                    const customers = response.data;
                    customers.sort(
                        (a, b) =>
                            new Date(b.createdAt) -
                            new Date(a.createdAt)
                    );
                    setUser(customers);
                })
                .catch((error) => {
                    console.log(
                        'Error fetching customers:',
                        error
                    );
                });
        }, [])
    );
    const renderItem = ({ item }) => (
        <CustomerList
            name={item.name}
            phone={item.phone}
            price={item.totalSpent}
            loyal={item.loyal}
            onPress={() => navigation.navigate('CustomerDetail', { id: item._id })}
        />
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.headerContainer}>
                <Text style={Styles.headerText}>Customer</Text>
            </View>
            <FlatList
                data={user.slice(0, 4)}
                renderItem={renderItem}
            />
            <TouchableOpacity
                style={Styles.addCustomerButton}
                onPress={() => navigation.navigate('AddCustomer')}
            >
                <Text style={Styles.buttonAddCusText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}