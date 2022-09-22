import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer , DefaultTheme as NavigationDefaultTheme ,DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import auth from '@react-native-firebase/auth'
import { AuthContext } from '../Context/AuthContext';
import HomeNavigation from './HomeNavigation';


import {
    Provider as PaperProvider , 
    DarkTheme as PaperDarkTheme , 
    DefaultTheme as PaperDefaultTheme
  } from 'react-native-paper';
  

const Route = () => {
    const {user , setUser,isDarkTheme} = useContext(AuthContext);


    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);

    // // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(
        () =>{
            const subscribe = auth().onAuthStateChanged(onAuthStateChanged);
            return subscribe;
        },[]
    )
    
    if(initializing) return null;



    const CustomDarkTheme = {
        ...NavigationDarkTheme,
        ...PaperDarkTheme,
        colors:{
          ...NavigationDarkTheme.colors,
          ...PaperDarkTheme.colors,
          background:'#333333',
          text:'#ffffff',
        }
      }
    
      const CustomDefaultTheme = {
        ...NavigationDefaultTheme,
        ...PaperDefaultTheme,
        colors:{
          ...NavigationDefaultTheme.colors,
          ...PaperDefaultTheme.colors,
          background:'#ffffff',
          text:'#333333',
          
        }
      }
      const theme = isDarkTheme? CustomDarkTheme :CustomDefaultTheme;

    return(
        <PaperProvider theme={theme} >
            <NavigationContainer theme={theme}>
                {user ? <HomeNavigation /> : <AuthNavigation/> }
            </NavigationContainer>
        </PaperProvider>


    )
}

export default Route;