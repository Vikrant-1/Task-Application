import React,{useContext, useState} from 'react';
import { Text, View ,TextInput,TouchableOpacity} from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import GlobalStyles from '../../Styles/GlobalStyles';
import { useTheme } from 'react-native-paper';


const SignupScreen = ({navigation}) => {
    const {signup} = useContext(AuthContext)
    const PaperTheme = useTheme();


    const [name , setName] = useState('');
    const [signUpEmail , setSignInEmail] = useState('');
    const [signUpPassword , setSignUpPassword] = useState('');


    const handleTextChange = (text,valueFor) => {
        if(valueFor === 'signUpEmail') setSignInEmail(text);
        if(valueFor === 'signUpPassword') setSignUpPassword(text);
        if(valueFor === 'name') setName(text);



    }
    return(
        <View style={[GlobalStyles.fullScreen]}>
            <View style={[GlobalStyles.loginBottom]}>
                <TextInput
                    style={GlobalStyles.inputField}
                    value={name}
                    placeholder='Enter your name'
                    onChangeText={(text)=> {handleTextChange(text,'name')}}
                
                />
                <TextInput
                    style={GlobalStyles.inputField}
                    value={signUpEmail}
                    placeholder='Enter your E-mail'
                    onChangeText={(text)=> {handleTextChange(text,'signUpEmail')}}
                
                />
                
                <TextInput
                    style={GlobalStyles.inputField}
                    value={signUpPassword}
                    placeholder='Enter your Password'
                    secureTextEntry={true}
                    onChangeText={(text) => {handleTextChange(text,'signUpPassword')}}

                />
                
                <TouchableOpacity onPress={()=>{signup(signUpEmail,signUpPassword,name)}} style={[GlobalStyles.centerAlignment,GlobalStyles.button_1,{backgroundColor:PaperTheme.colors.primary}]}>
                    <Text style={{color:PaperTheme.colors.background}}>
                        Registor
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignupScreen;

