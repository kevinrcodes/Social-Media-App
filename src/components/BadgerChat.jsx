import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';

const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isGuest, setIsGuest] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
      fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/chatrooms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": "bid_26fc3560c8ebe8fef8aa98f5c388075445f56b265e2a8538acaf9c44dd10b451",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log("Chatrooms: " + data);
        setChatrooms(data);
      })
  }, []);

  function handleLogin(username, pin) {
    // similar to before, API call after input is validated
    fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CS571-ID": "bid_26fc3560c8ebe8fef8aa98f5c388075445f56b265e2a8538acaf9c44dd10b451"
        },
        body: JSON.stringify({
            username: username,
            pin: pin
        })
    })
    .then(response => {
       if (!response.ok) {
        Alert.alert("Login failed", "Check your username and pin!");
        return;
       }
       return response.json();
    })
    .then(data => {
        // use secure store
        SecureStore.setItemAsync("token", data.token);
        SecureStore.setItemAsync("username", username);
        console.log("Logged in: " + username + " with token " + data.token);
        setIsLoggedIn(true);
    })

  }

  function handleSignup(username, pin) {
    // basically do an API call, check the status
    fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_26fc3560c8ebe8fef8aa98f5c388075445f56b265e2a8538acaf9c44dd10b451"
      },
      body: JSON.stringify({
        username: username,
        pin: pin
      })
    })
    .then(response => {
      if (response.status === 409) {
        Alert.alert("Error", "Username already exists");
        return;
      } else if (response.status === 400) {
        Alert.alert("Error", "PIN mus tbe exactly 7 digits");
        return;
      } // this is probably fine
      return response.json();
    })
    .then(data => {
      SecureStore.setItemAsync("token", data.token);
      SecureStore.setItemAsync("username", username);
      console.log("Registered: " + username + " with token " + data.token);
      setIsLoggedIn(true);
    })
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setIsGuest(false);
  }

  function handleGuestAccess() {
    setIsGuest(true);
    setIsLoggedIn(false);
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {chatrooms.map(chatroomName => (
            <ChatDrawer.Screen key={chatroomName} name={chatroomName}>
              {(props) => <BadgerChatroomScreen {...props} chatroomName={chatroomName} isGuest={false} />}
            </ChatDrawer.Screen>
          ))}
          <ChatDrawer.Screen name="Logout">
            {() => <BadgerLogoutScreen onLogout={handleLogout} />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return (
      <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} handleLogin={handleLogin} />
    );
  } else if (isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
        <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {chatrooms.map(chatroomName => (
              <ChatDrawer.Screen key={chatroomName} name={chatroomName}>
                {(props) => <BadgerChatroomScreen {...props} chatroomName={chatroomName} isGuest={true} />}
              </ChatDrawer.Screen>
            ))}
          <ChatDrawer.Screen name="Signup">
            {() => <BadgerConversionScreen setIsRegistering={setIsRegistering} />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} handleGuestAccess={handleGuestAccess} />
    );
  }
}