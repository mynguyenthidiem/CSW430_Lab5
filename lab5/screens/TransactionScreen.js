import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionList from './TransactionList';
import Styles from '../styles/Styles';
import axios from 'axios';

export default function TransactionScreen({ navigation }) {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        axios
            .get('https://kami-backend-5rs0.onrender.com/transactions')
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const TotalPrice = transactions.reduce((total, transaction) => total + transaction.price, 0);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.headerContainer}>
                <Text style={Styles.headerText}>Transaction</Text>
            </View>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TransactionList
                        id={item.id}
                        createdAt={item.createdAt}
                        services={item.services}
                        name={item.customer.name}
                        status={item.status}
                        price={item.price}
                        showCustomerName={true}
                        onPress={() =>
                            navigation.navigate('TransactionDetail', {
                                id: item._id,
                            })
                        }
                    />
                )}
            />
            <TouchableOpacity
                style={Styles.addCustomerButton}
                onPress={() => {navigation.navigate('AddTransaction')}}
            >
                <Text style={Styles.buttonAddCusText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
}