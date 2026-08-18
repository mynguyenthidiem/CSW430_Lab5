import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Alert,
    FlatList,
    ActivityIndicator
} from 'react-native';
import TransactionList from './TransactionList';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Menu } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Styles, { AppTheme } from '../styles/Styles';

export default function CustomerDetail({ route, navigation }) {

    const { id } = route.params;

    const [customer, setCustomer] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        let isMounted = true;

        const getCustomerDetail = async () => {

            setLoading(true);
            setError(null);

            try {
                const customerResponse = await axios.get(
                    `https://kami-backend-5rs0.onrender.com/customers/${id}`
                );
                const transactionResponse = await axios.get(
                    'https://kami-backend-5rs0.onrender.com/transactions'
                );

                if (!isMounted) return;

                const customerData = customerResponse.data;
                const allTransactions = transactionResponse.data;
                const customerTransactions =
                    allTransactions.filter(
                        transaction =>
                            String(transaction.customer?._id) ===
                            String(id)
                    );
                const validTransactions =
                    customerTransactions.filter(
                        transaction =>
                            transaction.status?.toLowerCase() !==
                            'cancelled'
                    );
                const total =
                    validTransactions.reduce(
                        (sum, transaction) =>
                            sum + Number(transaction.price || 0),
                        0
                    );

                setCustomer(customerData);
                setTransactions(customerTransactions);
                setTotalSpent(total);

            } catch (err) {

                console.log(
                    'ERROR:',
                    err.response?.data ||
                    err.message
                );
                if (isMounted) {
                    setError(
                        'Failed to load customer details. Pull down or go back and try again.'
                    );
                }

            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        getCustomerDetail();

        return () => {
            isMounted = false;
        };

    }, [id]);


    const formatDate = (dateString) => {

        if (!dateString) {
            return '';
        }

        return new Date(dateString).toLocaleString('vi-VN');
    };
    const hasCustomer = Boolean(customer?._id);

    const handleEdit = () => {

        setVisible(false);

        if (!hasCustomer) {
            Alert.alert('Please wait', 'Customer data is not loaded yet.');
            return;
        }

        navigation.navigate('EditCustomer', {
            id: customer._id
        });
    };


    const handleDelete = () => {

        setVisible(false);

        if (!hasCustomer) {
            Alert.alert('Please wait', 'Customer data is not loaded yet.');
            return;
        }

        Alert.alert(
            'Delete Customer',
            'Are you sure you want to remove this data client? This will not be possible to return',
            [
                {
                    text: 'Delete',
                    style: 'Delete',
                    
                    onPress: async () => {

                        try {

                            const token =
                                await AsyncStorage.getItem('TOKEN');

                            await axios.delete(
                                `https://kami-backend-5rs0.onrender.com/customers/${customer._id}`,
                                {
                                    headers: {
                                        Authorization:
                                            `Bearer ${token}`
                                    }
                                }
                            );

                            Alert.alert(
                                'Success',
                                'Customer deleted successfully.'
                            );

                            navigation.goBack();

                        } catch (err) {

                            console.log(
                                err.response?.data ||
                                err.message
                            );

                            Alert.alert(
                                'Error',
                                'Failed to delete customer.'
                            );
                        }
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ]
        );
    };


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
                    title="Customer Detail"
                    titleStyle={{ color: '#fff' }}
                />

                <Menu
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    anchor={
                        <Appbar.Action
                            icon="dots-vertical"
                            color="#fff"
                            disabled={!hasCustomer}
                            onPress={() => setVisible(true)}
                        />
                    }
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: 10,
                    }}
                >
                    <Menu.Item
                        onPress={handleEdit}
                        title="Edit"
                        leadingIcon="pencil"
                        titleStyle={{
                            color: '#EF506B',
                        }}
                    />

                    <Menu.Item
                        onPress={handleDelete}
                        title="Delete"
                        leadingIcon="delete"
                        titleStyle={{
                            color: '#EF506B',
                        }}
                    />
                </Menu>

            </Appbar.Header>
            {loading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={AppTheme.colors.primary} />
                    <Text style={{ marginTop: 12 }}>Loading customer...</Text>
                </View>
            ) : error ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                    <Text style={{ textAlign: 'center', color: 'red', marginBottom: 4 }}>
                        {error}
                    </Text>
                </View>
            ) : (
                <>
                    <View style={Styles.generalContainer}>

                        <Text style={Styles.detailTransactionHeader}>
                            General Information
                        </Text>


                        <View style={Styles.customerDetail}>

                            <Text style={Styles.detailText}>
                                Name:
                            </Text>

                            <Text style={Styles.customerDetailText}>
                                {customer?.name}
                            </Text>

                        </View>

                        <View style={Styles.customerDetail}>

                            <Text style={Styles.detailText}>
                                Phone:
                            </Text>

                            <Text style={Styles.customerDetailText}>
                                {customer?.phone}
                            </Text>

                        </View>


                        <View style={Styles.customerDetail}>

                            <Text style={Styles.detailText}>
                                Total Spent:
                            </Text>

                            <Text
                                style={[
                                    Styles.customerDetailText,
                                    {
                                        color:
                                            AppTheme.colors.primary,
                                        fontWeight: 'bold'
                                    }
                                ]}
                            >
                                {totalSpent.toLocaleString('vi-VN')} đ
                            </Text>

                        </View>


                        <View style={Styles.customerDetail}>

                            <Text style={Styles.detailText}>
                                Time:
                            </Text>

                            <Text style={Styles.customerDetailText}>
                                {formatDate(customer?.createdAt)}
                            </Text>

                        </View>


                        <View style={Styles.customerDetail}>

                            <Text style={Styles.detailText}>
                                Last Updated:
                            </Text>

                            <Text style={Styles.customerDetailText}>
                                {formatDate(customer?.updatedAt)}
                            </Text>

                        </View>

                    </View>

                    <View style={Styles.generalContainer}>

                        <Text style={Styles.detailTransactionHeader}>
                            Transaction History
                        </Text>

                        <FlatList
                            data={transactions}
                            keyExtractor={item => item._id}

                            renderItem={({ item }) => (
                                <TransactionList
                                    id={item.id}
                                    createdAt={item.createdAt}
                                    services={item.services}
                                    status={item.status}
                                    price={item.price}
                                    cancelTextStyle={{ fontSize: 12 }}
                                    subsContainerStyle={{ right: 25, bottom: -50, color: 'red', fontSize: 14, fontWeight: 'bold' }}
                                    showCustomerName={false}
                                    onPress={() => navigation.navigate('TransactionDetail', {
                                        transactionId: item._id
                                    })}
                                />

                            )}
                        />

                    </View>
                </>
            )}

        </SafeAreaView>
    );
}