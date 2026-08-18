import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Styles from '../styles/Styles';

export default function ServiceList({
    service,
    selectedServices,
    setSelectedServices,
}) {
    const selectedService = selectedServices.find(
        item => item._id === service._id
    );

    const isSelected = Boolean(selectedService);

    const handleSelectService = () => {
        if (isSelected) {
            setSelectedServices(
                selectedServices.filter(
                    item => item._id !== service._id
                )
            );
        } else {
            setSelectedServices([
                ...selectedServices,
                {
                    ...service,
                    quantity: 1,
                    executor: '',
                },
            ]);
        }
    };

    const increaseQuantity = () => {
        setSelectedServices(
            selectedServices.map(item => {
                if (item._id === service._id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            })
        );
    };

    const decreaseQuantity = () => {
        if (!selectedService) {
            return;
        }

        if (selectedService.quantity <= 1) {
            return;
        }

        setSelectedServices(
            selectedServices.map(item => {
                if (item._id === service._id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
                return item;
            })
        );
    };

    const price = Number(service.price || 0);
    const quantity = selectedService?.quantity || 1;
    const totalPrice = price * quantity;

    return (
        <View style={Styles.serviceListContainer}>
            <TouchableOpacity
                onPress={handleSelectService}
                activeOpacity={0.7}
                style={Styles.serviceItem}
            >
                <View
                    style={[
                        Styles.serviceCircle,
                        isSelected && Styles.serviceCircleSelected,
                    ]}
                >
                    {isSelected && (
                        <Icon
                            name="check"
                            size={13}
                            color="#fff"
                        />
                    )}
                </View>

                <Text style={Styles.serviceName}>
                    {service.name}
                </Text>
            </TouchableOpacity>

            {isSelected && (
                <View style={Styles.serviceDetail}>
                    <View style={Styles.serviceActionRow}>
                        <View style={Styles.quantityContainer}>
                            <TouchableOpacity
                                onPress={decreaseQuantity}
                                activeOpacity={0.7}
                                style={Styles.quantityButton}
                            >
                                <Text style={Styles.quantityButtonText}>
                                    -
                                </Text>
                            </TouchableOpacity>

                            <View style={Styles.quantityNumber}>
                                <Text style={Styles.quantityText}>
                                    {selectedService.quantity}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={increaseQuantity}
                                activeOpacity={0.7}
                                style={Styles.quantityButton}
                            >
                                <Text style={Styles.quantityButtonText}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={Styles.executorButton}
                        >
                            <View style={Styles.executorContent}>
                                <Text
                                    style={[
                                        Styles.executorText,
                                        selectedService.executor &&
                                            Styles.executorSelectedText,
                                    ]}
                                >
                                    {selectedService.executor || 'Executor'}
                                </Text>

                                <Icon
                                    name="arrow-drop-down"
                                    size={20}
                                    color="#777"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={Styles.servicePrice}>
                        Price:{' '}
                        <Text style={Styles.servicePriceValue}>
                            {totalPrice.toLocaleString('vi-VN')} đ
                        </Text>
                    </Text>
                </View>
            )}
        </View>
    );
}