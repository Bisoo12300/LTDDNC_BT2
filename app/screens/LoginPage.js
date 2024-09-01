import React, { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Correct navigation import
import {auth} from './firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

const logo = require("../../assets/logo.png");
const facebook = require("../../assets/facebook.png");
const google = require("../../assets/search.png");
const twitter = require("../../assets/twitter.png");

export default function LoginForm() {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState(""); // Email will be used as username
  const [password, setPassword] = useState("");
  
  const navigation = useNavigation(); // Get navigation instance

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        Alert.alert('Login Successful!', 'Welcome back!');
      })
      .catch(error => {
        console.error('Login error:', error); // Log the complete error for debugging

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'Invalid email address.');
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('Error', 'User not found.');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Error', 'Incorrect password.');
        } else {
          Alert.alert('Error', 'Login failed. Please try again.'); // Generic error for unknown issues
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='EMAIL'
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='PASSWORD'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{ true: 'green', false: 'gray' }}
          />
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
        <View>
          <Pressable onPress={() => Alert.alert('Forget Password!')}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
        <Text style={styles.optionsText}>OR LOGIN WITH</Text>
      </View>
      
      <View style={styles.mediaIcons}>
        <Image source={facebook} style={styles.icons} />
        <Image source={twitter} style={styles.icons} />
        <Image source={google} style={styles.icons} />
      </View>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Text style={styles.register} onPress={() => navigation.navigate('Register')}> {/* Navigate to Register */}
          Register
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 70,
  },
  image : {
    height : 160,
    width : 170
  },
  title : {
    fontSize : 30,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    paddingVertical : 40,
    color : "#2596be"
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "#2596be",
    borderWidth : 1,
    borderRadius: 7
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 8
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
    
  },
  rememberText : {
    fontSize: 13
  },
  forgetText : {
    fontSize : 11,
    color : "#2596be"
  },
  button : {
    backgroundColor : "#2596be",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center"
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  }, 
  buttonView :{
    width :"100%",
    paddingHorizontal : 50
  },
  optionsText : {
    textAlign : "center",
    paddingVertical : 10,
    color : "gray",
    fontSize : 13,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 30,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 23
  },
  icons : {
    width : 40,
    height: 40,
  },
  footerText : {
    textAlign: "center",
    color : "gray",
  },
  register : {
    color : "#2596be",
    fontSize : 13
  }
})
