import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles, { AppTheme } from '../styles/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function TransactionList ({ id, createdAt, services, name, status, price , onPress, showCustomerName, subsContainerStyle}) {
    return (
        <TouchableOpacity onPress={onPress}>
        <View style={Styles.transactionListContainer}>
            <View style={Styles.transactionListDetail}>
                <View style={[Styles.transactionListSubsContainer]}>
                    <Text style={Styles.transactionListSubText}> {id}</Text>
                    <Text style={Styles.transactionListSubText}>-</Text>
                    <Text style={Styles.transactionListSubText}>{new Date(createdAt).toLocaleString()}
                    </Text>
                    {status === 'cancelled' && !showCustomerName && (
                        <Text style={[Styles.transactionListCancelText, subsContainerStyle]}>Cancelled</Text>
                    )}
                    {status === 'cancelled' && showCustomerName && (
                        <Text style={[Styles.transactionListCancelText]}>Cancelled</Text>
                    )}
                </View>
                {services && services.map(service => (
                    <Text
                        key={service._id}
                        style={Styles.transactionListText}
                    >
                        - {service.name}
                    </Text>
                ))}
                {showCustomerName && (
                    <Text style={Styles.customerListTitle}>Customer: {name}</Text>
                )}
            </View>
            <View style={Styles.transactionListPriceContainer}>
                <Text style={Styles.transactionListPrice}> {price.toLocaleString('vi-VN')} đ</Text>
            </View>
        </View>
        </TouchableOpacity>
    );
}