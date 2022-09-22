import React, { useContext, useEffect } from 'react';
import { Image, View } from 'react-native';
import GlobalStyles from '../Styles/GlobalStyles';
import {AuthContext} from '../Context/AuthContext';

const Splash  = ({navigation}) => {
    const {user} = useContext(AuthContext)
    
 
          
            setTimeout(
                () => {
                    user ? navigation.navigate('Home') : navigation.navigate('Login') ;
                },2000
            )
     

    return(
        <View style={[GlobalStyles.fullScreen,GlobalStyles.centerAlignment]}>
            <Image style={{width:100,height:100}} source={require('../Assets/logo.png')} />
            
        </View>
    )
}

export default Splash;
