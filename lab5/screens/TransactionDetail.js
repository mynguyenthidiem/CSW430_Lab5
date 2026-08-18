import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Menu } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Styles, { AppTheme } from '../styles/Styles';

export default function TransactionDetail({ route, navigation }) {
    const { id } = route.params;

    const [transaction, setTransaction] = useState({});
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axios
            .get(`https://kami-backend-5rs0.onrender.com/transactions/${id}`)
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);


    const handleCancel = () => {
        setVisible(false);

        Alert.alert(
            'Warning',
            'Are you sure you want to cancel this transaction? This will affect the customer transaction information.',
            [{

                text: 'Yes',
                style: 'yes',
                onPress: async () => {
                    try {
                        const token = await AsyncStorage.getItem('TOKEN');

                        await axios.delete(
                            `https://kami-backend-5rs0.onrender.com/transactions/${transaction._id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );

                        alert('Transaction deleted successfully.');
                        navigation.goBack();
                    } catch (error) {
                        console.log(error.response?.data || error);
                        alert('Failed to delete transaction.');
                    }
                },
            },
            {
                text: 'Cancel',
                style: 'Cancel',
            },
            ]
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString('en-VN');
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header style={Styles.backContainer} statusBarHeight={0}>
                <Appbar.BackAction
                    color="#fff"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title="Transaction Detail"
                    titleStyle={{ color: '#fff' }}
                />
                <Menu
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    anchor={
                        <Appbar.Action
                            icon="dots-vertical"
                            color="#fff"
                            onPress={() => setVisible(true)}
                        />
                    }>
                    <Menu.Item
                        onPress={() => { }}
                        title="See More Details"
                        titleStyle={{
                            color: '#EF506B',
                        }}
                    />

                    <Menu.Item
                        onPress={handleCancel}
                        title="Cancel Transaction"
                        titleStyle={{
                            color: '#EF506B',
                        }} S
                    />
                </Menu>
            </Appbar.Header>

            <View style={Styles.generalContainer}>
                <Text style={Styles.detailTransactionHeader}>
                    General Information
                </Text>
                <View style={Styles.detail}>
                    <Text style={Styles.detailTransText}>
                        Transaction Code
                    </Text>

                    <Text style={Styles.detailText}>
                        {transaction.id}
                    </Text>
                </View>


                <View style={Styles.detail}>
                    <Text style={Styles.detailTransText}>
                        Customer
                    </Text>

                    <Text style={Styles.detailText}>
                        {transaction.customer?.name}
                    </Text>
                </View>


                <View style={Styles.detail}>
                    <Text style={Styles.detailTransText}>
                        Creation Time
                    </Text>

                    <Text style={Styles.detailText}>
                        {formatDate(transaction.createdAt)}
                    </Text>
                </View>

            </View>
            <View style={Styles.generalContainer}>
                <Text style={Styles.detailTransactionHeader}>
                    Services List
                </Text>
                <View style={Styles.detailServices}>

                    {transaction.services?.map(service => (
                        <View key={service._id} style={Styles.detailServiceItem}>
                            <Text style={Styles.serviceText}>
                                {service.name}
                            </Text>
                            <Text style={Styles.serviceQuantityText}>
                                x {service.quantity}
                            </Text>
                            <Text style={Styles.detailText}>
                                {service.price?.toLocaleString('vi-VN')} đ
                            </Text>
                        </View>
                    ))}
                    <View style={Styles.detailServiceLine}>
                        <Text style={Styles.detailTransText}> Total</Text>
                        <Text style={Styles.detailText}>
                            {transaction.price?.toLocaleString('vi-VN')} đ
                        </Text>
                    </View>
                </View>
            </View>
            <View style={Styles.generalContainer}>
                <Text style={Styles.detailTransactionHeader}>
                    Cost
                </Text>
                <View style={Styles.detail}>
                    <Text style={Styles.detailTransText}>
                        Amount of money
                    </Text>

                    <Text style={Styles.detailText}>
                        {transaction.price?.toLocaleString('vi-VN')} đ
                    </Text>
                </View>
                <View style={Styles.detail}>
                    <Text style={Styles.detailTransText}>
                        Discount
                    </Text>

                    <Text style={Styles.detailText}>{transaction.discount == null ? '0' : transaction.discount.toLocaleString('vi-VN')} đ
                    </Text>
                </View>

                <View style={Styles.detailServiceLine}>
                    <Text style={Styles.detailText}> Total Payment</Text>
                    <Text style={{ color: AppTheme.colors.primary, fontWeight: 'bold', fontSize: 20 }}>
                        {transaction.price?.toLocaleString('vi-VN')} đ
                    </Text>
                </View>
            </View>
        </SafeAreaView >
    );
}