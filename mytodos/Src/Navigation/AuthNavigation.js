import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/AuthScreens/Login';
import SignupScreen from '../Screens/AuthScreens/Signup';
import Splash from '../Splash/splash';
import { useTheme } from 'react-native-paper';

const Stack  = createStackNavigator(); 

const AuthNavigation = () => {
    const PaperTheme = useTheme();
    return(

            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name='Splash'  component={Splash} />
                <Stack.Screen name='Login' component={LoginScreen}/>
                <Stack.Screen options={{
                    headerShown:true,
                    title:'Registration',
                    headerTintColor:PaperTheme.colors.background,
                    headerStyle:{backgroundColor: PaperTheme.colors.primary }
                }} name='Signup' component={SignupScreen}/>
            </Stack.Navigator>
        
    )
}

export default AuthNavigation;