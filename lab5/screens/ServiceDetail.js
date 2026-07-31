import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Menu } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Styles from '../styles/Styles';

export default function ServiceDetail({ route, navigation }) {
    const { id } = route.params;

    const [service, setService] = useState({});
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        axios
            .get(`https://kami-backend-5rs0.onrender.com/services/${id}`)
            .then((response) => {
                setService(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        const getName = async () => {
            const userName = await AsyncStorage.getItem('NAME');
            if (userName) {
                setName(userName);
            }
        };

        getName();
    }, []);

    const handleEdit = () => {
        setVisible(false);

        navigation.navigate('Edit', {
            id: service._id,
        });
    };

    const handleDelete = () => {
        setVisible(false);

        Alert.alert(
            'Delete Service',
            'Are you sure you want to delete this service?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('TOKEN');

                            await axios.delete(
                                `https://kami-backend-5rs0.onrender.com/services/${service._id}`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );

                            alert('Service deleted successfully.');
                            navigation.goBack();
                        } catch (error) {
                            console.log(error.response?.data || error);
                            alert('Failed to delete service.');
                        }
                    },
                },
            ]
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString('vi-VN');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header style={Styles.backContainer} statusBarHeight={0}>
                <Appbar.BackAction
                    color="#fff"
                    onPress={() => navigation.goBack()}
                />

                <Appbar.Content
                    title="Service Detail"
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
                        onPress={handleEdit}
                        title="Edit"
                    />

                    <Menu.Item
                        onPress={handleDelete}
                        title="Delete"
                    />
                </Menu>
            </Appbar.Header>

            <View style={Styles.detailContainer}>
                <View style={Styles.detail}>
                    <Text style={Styles.detailText}>Service Name: </Text>
                    <Text>{service.name}</Text>
                </View>

                <View style={Styles.detail}>
                    <Text style={Styles.detailText}>Price: </Text>
                    <Text>{service.price} đ</Text>
                </View>

                <View style={Styles.detail}>
                    <Text style={Styles.detailText}>Creator: </Text>
                    <Text>{name}</Text>
                </View>

                <View style={Styles.detail}>
                    <Text style={Styles.detailText}>Created At: </Text>
                    <Text>{formatDate(service.createdAt)}</Text>
                </View>

                <View style={Styles.detail}>
                    <Text style={Styles.detailText}>Updated At: </Text>
                    <Text>{formatDate(service.updatedAt)}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}