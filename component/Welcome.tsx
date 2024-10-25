import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Welcome: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20, 

    },
    welcomeText: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#008CBA", 
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});

export default Welcome;
