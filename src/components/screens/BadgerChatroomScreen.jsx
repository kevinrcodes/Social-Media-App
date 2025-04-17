import { StyleSheet, Text, View, FlatList, Modal, Button, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import BadgerChatMessage from "../helper/BadgerChatMessage"
import * as SecureStore from 'expo-secure-store';


function BadgerChatroomScreen(props) {

    const [messages, setMessages] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");

    const [token, setToken] = useState("");
    const [user, setUser] = useState("");


    const fetchMessages = async () => {
        console.log("room: " + props.chatroomName);
        try {
            const response = await fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?chatroom=${props.chatroomName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_26fc3560c8ebe8fef8aa98f5c388075445f56b265e2a8538acaf9c44dd10b451"
                }
            });
            // no messages are being fetched
            console.log("Data adsfs: " + JSON.stringify(response.json(), null, 2));

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg);
            }

            const data = await response.json();
            setMessages(data.messages);
        } catch (error) {
            console.error("Error fetching messages 1:", error, props.chatroomName);
        }
    };

    useEffect(() => {
        console.log("useEffect run with name: " + props.chatroomName);
        if (props.chatroomName !== undefined) fetchMessages();
    }, [props.chatroomName, refreshing]); // Only run when the chatroom name changes
    
    // Function to refresh messages manually
    const handleRefresh = () => {
        console.log("Refreshing...");
        fetchMessages(); // Call the fetchMessages function
    };

    useEffect(() => { // get the user and the token
        console.log("useEffect run with name: " + props.chatroomName);
        const getCurrentUser = async () => {
            const token = await SecureStore.getItemAsync("token");
            setToken(token);
            if (token) {
                // Fetch user details using the token
                fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/whoami", {
                    method: "GET",
                    headers: {
                        "X-CS571-ID": "bid_26fc3560c8ebe8fef8aa98f5c388075445f56b265e2a8538acaf9c44dd10b451",
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Data mnmn,: " + JSON.stringify(data, null, 2));
                    if (data.isLoggedIn) {
                        setUser(data.user.username);
                    }
                });
            }
            console.log("User: " + user);
        };
        getCurrentUser();
    }, []);

    const handlePost = () => {
        console.log("Handling post...");
        fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?chatroom=${props.chatroomName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_26fc3560c8ebe8fef8aa98f5c388075445f56b265e2a8538acaf9c44dd10b451",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                title: modalTitle,
                content: modalContent
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.json().msg);
            }
            return response.json();
        })
        .then(() => {
            Alert.alert("Post created successfully");
            // clear the modal for next time
            setModalTitle("");
            setModalContent("");
            setModalVisible(false);
        })
    }

    const handleDelete = (id) => {
        console.log("Deleting post with the following id... " + id);
        fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?id=${id}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": "bid_26fc3560c8ebe8fef8aa98f5c388075445f56b265e2a8538acaf9c44dd10b451",
                "Authorization": "Bearer " + token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.json().msg);
            }
            Alert.alert("Post deleted successfully");
            setRefreshing(true);
            return response.json();
        })
    }

    return <View style={{ flex: 1 }}>
    <FlatList
        data={messages}
        renderItem={({ item }) => (
            <BadgerChatMessage
                title={item.title}
                poster={item.poster}
                content={item.content}
                created={item.created}
                onDelete={() => handleDelete(item.id)}
                currentUser={user}
            />
        )}
        keyExtractor={item => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
    />

    <View style={{ margin: 10, height: 60 }}>
        <Button title="Add Post" onPress={() => setModalVisible(true)} />
    </View>

    <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Create a New Post</Text>
                <TextInput
                    placeholder="Title"
                    value={modalTitle}
                    onChangeText={setModalTitle}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Content"
                    value={modalContent}
                    onChangeText={setModalContent}
                    style={styles.input}
                />
                <Button
                    title="Create Post"
                    onPress={handlePost}
                    disabled={!modalTitle || !modalContent}
                />
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
        </TouchableWithoutFeedback>
    </Modal>
    </View>
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default BadgerChatroomScreen;