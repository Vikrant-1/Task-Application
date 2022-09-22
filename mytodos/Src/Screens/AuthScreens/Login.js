import React, { useContext, useState } from 'react';
import { Text, View ,TextInput, TouchableOpacity} from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import {AuthContext} from '../../Context/AuthContext';

const LoginScreen = ({navigation}) => {
    const {login} = useContext(AuthContext);
    const [loginEmail , setLoginEmail] = useState('');
    const [loginPassword , setLoginPassword] = useState('');

    const handleTextChange = (text,valueFor) => {
        if(valueFor === 'loginEmail') setLoginEmail(text);
        if(valueFor === 'loginPassword') setLoginPassword(text);
    }

    const handleLogin = () => {
        if(loginEmail !== '' && loginPassword !== ''){
            login(loginEmail,loginPassword);
        }else{
            alert('Email or password can not be empty !! ')
        }
    }
    return(
        <View style={[GlobalStyles.fullScreen]}>
            
            <View style={GlobalStyles.loginUpper}>
            </View>

            <View style={[GlobalStyles.loginBottom]}>
                
                <TextInput
                    style={GlobalStyles.inputField}
                    value={loginEmail}
                    placeholder='Enter your E-mail'
                    onChangeText={(text)=> {handleTextChange(text,'loginEmail')}}
                
                />

                <View style={GlobalStyles.inputField}>
                    <TextInput
                    
                        value={loginPassword}
                        placeholder='Enter your Password'
                        secureTextEntry={true}
                        onChangeText={(text) => {handleTextChange(text,'loginPassword')}}/>

                </View>
                
                <TouchableOpacity onPress={handleLogin} style={[GlobalStyles.centerAlignment,GlobalStyles.button_1]}>
                    <Text style={GlobalStyles.fontColor2}>
                        Login
                    </Text>
                </TouchableOpacity>

                <View style = {GlobalStyles.separatorView}>
                    <View style={GlobalStyles.separatorLine}></View>
                    <Text style={{marginHorizontal:5,}}>
                        OR
                    </Text>
                    <View style={GlobalStyles.separatorLine}></View>
                </View>

                <TouchableOpacity style={[GlobalStyles.centerAlignment,{width:'100%'}]}>
                    <Text>
                        Don't Have an Account ? 
                        <Text onPress={()=>{navigation.navigate('Signup')}} style={{fontWeight:'500'}}> Signup</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen;

