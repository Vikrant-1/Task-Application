import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View , ActivityIndicator, Alert, TouchableOpacity, Animated } from 'react-native';
import { Appbar,useTheme, Button , Portal,Modal,TextInput,Text,Switch,  Title, Surface, Card, Avatar, Checkbox} from 'react-native-paper';
import GlobalStyles from '../../Styles/GlobalStyles';
import {AuthContext} from '../../Context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const HomeScreen = () => {
    
    const {signout,setTodo,todo} = useContext(AuthContext);
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
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    



    if (loading) {
        return <ActivityIndicator />;
      }
    
    const onTextHandler = (text,value) => {
        if(value === 'title')setTitle(text);
        if(value ===  'description' ) setDescription(text);
        
    }
    

    return(
        <>
        <View style={GlobalStyles.fullScreen} >
            <Appbar.Header  >
                <Appbar.Content title="Todos" />
                <Switch 
                style={{left:-10}}
                    value={PaperTheme}
                    onValueChange={()=>{setIsDarkTheme(!isDarkTheme)}}
                />
                <Icon onPress={()=>{signout()}} style={{}} name='logout' size={25} color={'#fff'} />
                
            </Appbar.Header>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={todo}
                contentContainerStyle={
                    {
                       marginBottom:20
                        
                    }
                }
                keyExtractor={(item) => item.key}
                renderItem={({item})=>{

                    return(
                    <TouchableOpacity onPress={()=>{onHandleUpdation(item.key)}} >
                        <Card.Title
                            style={[GlobalStyles.surface]}
                            theme={PaperTheme.dark}
                            title={item.title}
                            titleNumberOfLines={50}
                            subtitle={item.description}
                            subtitleNumberOfLines={1000}
                            left={(props) => <Avatar.Icon {...props} icon="folder" />}
                            right={() => <Icon color={PaperTheme.colors.text} size={22} name="delete" onPress={()=>ondeleteHandler(item.key)} />}
                        />
                    </TouchableOpacity>
                    )
                }
            }
            />            

           <View style={{alignItems:'center', position:'absolute',bottom:30,right:30,alignSelf:'center',elevation:10}}>
                <Button onPress={showModal} icon={'plus'} labelStyle={{fontSize:22}} contentStyle={{height:60,width:60,}} mode='contained' compact={true}>

                </Button>
           </View>
        </View>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} >
                <TextInput
                    style={{marginVertical:10}}
                    label="Title"
                    value={title}
                    onChangeText={text => setTitle(text)}
                    
                />
                <TextInput
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
                style = {{marginVertical:10}}
                value = {title}
                onChangeText = {text => onTextHandler(text,'title')}
                
            />
            <TextInput
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
