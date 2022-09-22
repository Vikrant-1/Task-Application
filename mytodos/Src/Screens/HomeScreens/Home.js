import React, { useContext, useEffect, useState } from 'react';
import {  View , ActivityIndicator, Alert, TouchableOpacity, Animated, StatusBar, FlatList, ImageBackground,   } from 'react-native';
import { Appbar,useTheme, Button,Modal,TextInput,Switch, Card, Avatar, Checkbox,  IconButton, Surface, Title, Paragraph, withTheme, Divider} from 'react-native-paper';
import GlobalStyles, { WIDTH } from '../../Styles/GlobalStyles';
import {AuthContext} from '../../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const HomeScreen = () => {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const {signout,setTodo,todo,user} = useContext(AuthContext);
    const PaperTheme = useTheme();
    const {isDarkTheme,setIsDarkTheme} = useContext(AuthContext);
    const [loading, setLoading] = useState(true); 
    const [title , setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [isDone , setIsDone] = useState(false);


// updation code 

    const [getkey , setkey] = useState('');
    const [updationModalVisible, setupdationModalVisible] = React.useState(false);
    const showUpdationModal = () => setupdationModalVisible(true);


//  get data
            useEffect(() => {
                const subscriber = firestore()
                  .collection('User')
                  .doc('todos')
                  .collection(auth().currentUser.uid).orderBy('date','desc')
                  .onSnapshot(
                    (querySnapshot)=>{
                        let tempTodos = [];
                        querySnapshot.forEach(
                            documentSnapshot =>{
                                tempTodos.push({
                                    ...documentSnapshot.data(),
                                    key:documentSnapshot.id
                                }) 
                            }
                        )
                        setTodo(tempTodos);
                        setLoading(false);
                    }
                  )
              
                // Unsubscribe from events when no longer in use
                return () => subscriber();
              }, []);
// add data
    const addData = async() => {
        await firestore()
        .collection('User')
        .doc('todos')
        .collection(auth().currentUser.uid)
        .add({  
            date:Date.now(),
            title:title,
            description:description,
            complete:false, 
        }).then(
            console.log('added')
        ).catch(
            (error)=>{
                console.log(error)
            }
        ).then(
            setVisible(false)
        )
        clearData();
    }





// update data
    const updateData = async(itemId) => {
        await firestore().collection('User')
        .doc('todos')
        .collection(auth().currentUser.uid)
        .doc(itemId)
        .update({
            title:title,
            description:description,
            complete:isDone,
        })

    
    }



// get by id

const getById = async(itemId) =>{
    await firestore()
    .collection('User')
    .doc('todos')
    .collection(auth().currentUser.uid)
    .doc(itemId)
    .get()
    .then(
        document => {
            setTitle(document.data().title);
            setDescription(document.data().description);
            setIsDone(document.data().complete);
        }
    )
}

// handleUpdation

const onHandleUpdation = async(itemId) => {
    setkey(itemId);
    await getById(itemId);
    showUpdationModal(); 
}

const clearData = () => {
    setIsDone(false);
    setTitle('');
    setDescription('');
   
}

const hideUpdationModal = () => {
    setupdationModalVisible(false);
    clearData();
    

}

const onupdationSubmit = async() => {
    await updateData(getkey);
    hideUpdationModal();
}

// delete data
    const deleteData = async (itemid) => {
       await firestore()
        .collection('User')
        .doc('todos')
        .collection(auth().currentUser.uid)
        .doc(itemid)
        .delete()
    }

    const ondeleteHandler = (itemid) =>{
        Alert.alert('','Do you want to delete ?',[
            
        { text: "Cancel",
          style: "cancel"
        },

        { text: "OK", onPress: () => console.log(deleteData(itemid))}
        ])
    }



    // Modal 
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => {
        setVisible(false);
        clearData();
    };
    const containerStyle = {backgroundColor: 'white', padding: 20};

    



    if (loading) {
        return <ActivityIndicator  />;
      }
    
    const onTextHandler = (text,value) => {
        if(value === 'title')setTitle(text);
        if(value ===  'description' ) setDescription(text);
        
    }



    return(
        <>
        <View style={GlobalStyles.fullScreen} >
            <Appbar.Header >
                <Appbar.Content title={`Hi , ${auth().currentUser.displayName}`} />
                <Switch 
                    style={{left:-10}}
                    value={PaperTheme}
                    onValueChange={()=>{setIsDarkTheme(!isDarkTheme)}}
                />
                <Icon onPress={()=>{signout()}} style={{}} name='logout' size={25} color={'#fff'} />
                
            </Appbar.Header>
            <ImageBackground blurRadius={50} source={{ uri:'https://tse4.mm.bing.net/th?id=OIP.uF0BVnhQXVOPzn2Qsr3uQAHaNK&pid=Api&P=0' }} >
            <FlatList
               
                showsVerticalScrollIndicator={false}
                data={todo}
                contentContainerStyle={
                    {
                       marginBottom:20,
                       
                    }
                }
                keyExtractor={(item) => item.key}
                renderItem={({item})=>{


                    return(
                    <Surface theme={PaperTheme} style={[GlobalStyles.surface]} >
                        <TouchableOpacity onPress={() => {onHandleUpdation(item.key)}}>
                            <View style={{flexDirection:'row',alignItems:'center',}}>
                                <Avatar.Icon icon={'folder'} size={35} style={{  }} />
                                <Title numberOfLines={1} style={{width:WIDTH-100,paddingHorizontal:10}} >
                                    {item.title}
                                </Title>
                            </View>
                       </TouchableOpacity>
                       <View style={{width:WIDTH-50,borderColor:PaperTheme.colors.text,borderTopWidth:1,marginVertical:7,height:0.1}} ></View>
                        <Paragraph >
                            {item.description}
                        </Paragraph>
                        <IconButton icon={'delete'}  size={20}  style={{ alignSelf:'flex-end' }}  onPress={()=>ondeleteHandler(item.key)} />
                     </Surface>
                    )
                }
            }
            />   
            </ImageBackground>
         

           <View style={{alignItems:'center', position:'absolute',bottom:30,right:30,alignSelf:'center',elevation:10}}>
                <Button onPress={showModal} icon={'plus'} labelStyle={{fontSize:22}} contentStyle={{height:60,width:60,}} mode='contained' compact={true}>

                </Button>
           </View>
        </View>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                <TextInput
                    multiline={true}
                    style={{marginVertical:10}}
                    label="Title"
                    value={title}
                    onChangeText={text => setTitle(text)}
                    
                />
                <TextInput
                    multiline={true}
                    style={{marginVertical:10,marginBottom:30}}
                    label="Description"
                    value={description}
                    onChangeText={text => setDescription(text)}
                />

                <Button theme={PaperTheme.dark}  mode={'contained'} onPress={()=>addData()}>
                    Add
                </Button>
        </Modal>

        <Modal visible={updationModalVisible} onDismiss={hideUpdationModal} contentContainerStyle={containerStyle} >
            <TextInput
                multiline={true}
                style = {{marginVertical:10}}
                value = {title}
                onChangeText = {text => onTextHandler(text,'title')}
                
            />
            <TextInput
                multiline={true}
                style={{marginVertical:10,marginBottom:30}}
                value={description}
                onChangeText={text => onTextHandler(text,'description')}
            />
            <Checkbox.Android 
                onPress={()=>setIsDone(!isDone)}
                status={isDone ? 'checked':'unchecked'}

            />

            <Button theme={PaperTheme.dark}  mode={'contained'} onPress={()=>onupdationSubmit()}>
                Update
            </Button>
            </Modal>
        </>
        
    )

}

export default HomeScreen;
