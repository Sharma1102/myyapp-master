import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface RegistrationButtonProps {
    title: string;
    onPress: () => void;
}

const RegistrationButton: React.FC<RegistrationButtonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF', // Change to your preferred color
        padding: 10,
        paddingBottom:10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
    },
});

export default RegistrationButton;
