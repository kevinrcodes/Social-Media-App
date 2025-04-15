import { Alert, Button, StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";

function BadgerLoginScreen(props) {

    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={{ fontSize: 36, marginBottom: 30 }}>BadgerChat Login</Text>

                <Text>Username</Text>
                <TextInput
                    placeholder="Username"
                    value={username}
                    autoCapitalize="none"
                    onChangeText={setUsername}
                    style={styles.input}
                />
                <Text>PIN</Text>
                <TextInput
                    placeholder="Pin"
                    value={pin}
                    onChangeText={setPin}
                    keyboardType="numeric"
                    maxLength={7}
                    secureTextEntry={true}
                    style={styles.input}
                />


                <Button color="crimson" title="Login" onPress={() => {
                    // Alert.alert("Hmmm...", "I should check the user's credentials!");
                    props.handleLogin(username, pin)
                }} />
                <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
                <Button color="grey" title="Continue as Guest" onPress={() => props.handleGuestAccess()} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5
    }

});

export default BadgerLoginScreen;