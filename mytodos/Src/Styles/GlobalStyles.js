import { Dimensions, StyleSheet, View } from 'react-native';

export const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default StyleSheet.create({
    fullScreen:{
        width:WIDTH,
        height:HEIGHT,
        
    },
    centerAlignment:{
        justifyContent:'center',
        alignItems:'center',
    },
    // Buttons
    button_1:{
        width:WIDTH/2,
        height:50,
        borderRadius:24,
        marginTop:10,

    },
    // fontColors
    fontColor1:{
        color:'#fff'
    },
    fontColor2:{
        color:'#000'
    },

    // Login Screen
    
    loginUpper:{
        width:WIDTH,
        height:HEIGHT*0.3,
        borderBottomLeftRadius:34,
        borderBottomRightRadius:34,
        justifyContent:'center',
        alignItems:'center',

    },
    loginBottom:{
        width:WIDTH,
        height:HEIGHT*0.7,
        paddingVertical:10,
        alignItems:'center',


    },
    inputField:{
        width:WIDTH-50,
        height:50,
        borderWidth:1,
        borderRadius:24,
        marginVertical:10,
        paddingHorizontal:10
    },

    separatorView:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:20,
    },
    separatorLine:{
        width:WIDTH/2-30,
        borderBottomWidth:1,
    },

    // SignUp

    // Home
    surface: {
        padding: 8,
        width: WIDTH-40,
        alignSelf:'center',
        marginVertical:10,
        borderRadius:12,
        elevation:20
        
      },


    





    



})