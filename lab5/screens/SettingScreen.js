import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TransactionList from './TransactionList';
import Styles from '../styles/Styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SettingsScreen({ navigation }) {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('TOKEN');
            await AsyncStorage.removeItem('NAME');

            navigation.replace('Login');
        } catch (error) {

            console.log(
                'Logout error:',
                error
            );
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={Styles.headerContainer}>
                <Text style={Styles.headerText}>Settings</Text>
            </View>
            <TouchableOpacity
                style={Styles.signOutButton}
                onPress={handleLogout}
            >
                <Text style={Styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView >
    );
}