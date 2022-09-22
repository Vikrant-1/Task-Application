import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/AuthScreens/Login';
import SignupScreen from '../Screens/AuthScreens/Signup';
import Splash from '../Splash/splash';

const Stack  = createStackNavigator(); 

const AuthNavigation = () => {
    return(

            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name='Splash'  component={Splash} />
                <Stack.Screen name='Login' component={LoginScreen}/>
                <Stack.Screen options={{
                    headerShown:true,
                    title:'Registration',
                    headerStyle:{backgroundColor:'#88D690'}
                }} name='Signup' component={SignupScreen}/>
            </Stack.Navigator>
        
    )
}

export default AuthNavigation;