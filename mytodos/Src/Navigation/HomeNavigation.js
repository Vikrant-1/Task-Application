import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreens/Home';
import Splash from '../Splash/splash';



const Stack  = createStackNavigator(); 
const HomeNavigation = () => {



    return(
            <Stack.Navigator screenOptions={{
                headerShown:false
            }}>
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='Home' component={ HomeScreen } /> 
            </Stack.Navigator>   
    )
}

export default HomeNavigation;