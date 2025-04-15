import { Alert, Button, StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from 'react'


function BadgerRegisterScreen(props) {

    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confirmPin, setConfirmPin] = useState("");

    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={{ fontSize: 36, marginBottom: 30 }}>Join BadgerChat!</Text>
    
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
                    keyboardType="number-pad"
                    maxLength={7}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Text>Confirm PIN</Text>
                <TextInput
                    placeholder="Pin"
                    value={confirmPin}
                    onChangeText={setConfirmPin}
                    keyboardType="number-pad"
                    maxLength={7}
                    secureTextEntry={true}
                    style={styles.input}
                />
    
                <Button
                    color="crimson"
                    title="Signup"
                    onPress={() => {
                        // before we sign up, check if the PINs are valid
                        if (pin.trim() === "" || confirmPin.trim() === "") {
                            Alert.alert("Error", "PIN cannot be empty");
                            return;
                        }
                        if (pin !== confirmPin) {
                            Alert.alert("Error", "PINs do not match");
                            return;
                        }
                        if (pin.length !== 7 || confirmPin.length !== 7) {
                            Alert.alert("Error", "PIN must be 7 digits");
                            return;
                        }
                        props.handleSignup(username, pin);
                    }}
                />

                <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;