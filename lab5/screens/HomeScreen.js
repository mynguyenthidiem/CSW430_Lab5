import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, Avatar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import Styles, { AppTheme } from '../styles/Styles';

export default function HomeScreen({ navigation }) {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const getName = async () => {
      const userName = await AsyncStorage.getItem('NAME');
      if (userName) {
        setName(userName);
      }
    };

    getName();
  }, []);

  const fetchServices = () => {
    axios
      .get('https://kami-backend-5rs0.onrender.com/services')
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log('Error fetching services:', error);
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchServices();
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={Styles.card}
      onPress={() =>
        navigation.navigate('ServiceDetail', {
          id: item._id,
        })
      }>
      <Text style={Styles.serviceItem}>{item.name}</Text>
      <Text style={Styles.servicePrice}>{item.price} đ</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.headerContainer}>
        <Text style={Styles.headerText}>{name}</Text>

        <Avatar.Icon
          size={50}
          icon="account"
          color={AppTheme.colors.primary}
          style={Styles.icon}
        />
      </View>

      <View style={Styles.homeContainer}>
        <View style={Styles.homeImg}>
          <Image source={require('../assets/logo.png')} />
        </View>

        <View style={Styles.sectionHeader}>
          <Text style={Styles.serviceTitle}>Danh sách dịch vụ</Text>

          <IconButton
            icon="plus-circle"
            iconColor={AppTheme.colors.primary}
            color={AppTheme.colors.surface}
            size={40}
            onPress={() => navigation.navigate('Service')}
          />
        </View>

        <FlatList
          data={services}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}