import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user , setUser] = useState();
    const [isDarkTheme , setIsDarkTheme] = useState(false);
    const [ todo, setTodo ] = useState([]);

    return(
        <AuthContext.Provider
        value={{
            
            user,
            setUser,
            isDarkTheme,
            setIsDarkTheme,
            todo,
            setTodo,
            
            login: async (email,password) => {
                try {
                    await auth().signInWithEmailAndPassword(email,password).catch(
                        (error)=>{
                            switch (error.code) {
                                case 'auth/invalid-email':
                                    alert('Invalid Email address.');
                                    break;
                                case 'auth/user-disabled ':
                                    alert('User is temporary disable.');
                                    break;
                                case 'auth/user-not-found':
                                    alert('User not found.');
                                    break;
                                case 'auth/wrong-password':
                                    alert('Wrong Password.');
                                    break;
                                default:
                                    break;
                            }
                        }
                    )
                } catch (error) {
                    alert(error.message);
                    
                }
            },
            
            signup: async(email,password,name) => {
                try {
                    await auth().createUserWithEmailAndPassword(email,password).catch(
                        async() => {
                            switch (error.code) {
                                case 'auth/email-already-in-use':
                                    alert('Email address already in use.');
                                    break;
                                case 'auth/invalid-email ':
                                    alert('Invalid Email address.');
                                    break;
                                case 'auth/operation-not-allowed':
                                    alert('operator not allowed.');
                                    break;
                                case 'auth/weak-password':
                                    alert('Use Strong Password.');
                                    break;
                                default:
                                    break;
                            }
                        }
                    )
                    .then(
                        async() => {
                            await auth().currentUser.updateProfile({
                                displayName:name,
                            });
                        }
                    ).then(
                        async()=>{
                           await auth().currentUser.sendEmailVerification();

                        }
                    )
                    
                } catch (error) {
                    alert(error.message);
                    
                }

            },
            signout : async()=>{
                await auth().signOut();
            },

        }}
        >
            {children}

        </AuthContext.Provider>
    )
}

