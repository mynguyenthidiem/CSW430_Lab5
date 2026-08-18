import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles, { AppTheme } from '../styles/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomerList({ name, phone, loyal, totalMoney, onPress }) {
    return (
        <TouchableOpacity style={Styles.customerListContainer} onPress={onPress}>
            <View style={Styles.customerListSub}>
                <Text style={Styles.customerListTitle}>
                    Customer:
                    <Text style={Styles.customerListText}>   {name}</Text>
                </Text>
                <Text style={Styles.customerListTitle}>
                    Phone:
                    <Text style={Styles.customerListText}>   {phone}</Text>
                </Text>
                <Text style={Styles.customerListTitle}>
                    Total money:
                    <Text style={[Styles.customerListText, { color: AppTheme.colors.primary }]}>
                        {Number(totalMoney || 0).toLocaleString('vi-VN')} đ
                    </Text>
                </Text>
            </View>
            <View style={Styles.customerListIcon}>
                <MaterialCommunityIcons name='crown' size={30} color={AppTheme.colors.primary} />
                {loyal === 'normal' ? (
                    <Text style={{ color: AppTheme.colors.primary, fontWeight: 'bold' }}>Guest</Text>
                ) : (
                    <Text style={{ color: AppTheme.colors.primary, fontWeight: 'bold' }}>Member</Text>
                )}
            </View>
        </TouchableOpacity>
    );
}