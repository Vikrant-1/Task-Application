import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import Route from './Src/Navigation/Routes';
import { AuthProvider } from './Src/Context/AuthContext';



const App = () => {

  return(
    <AuthProvider>
      <Route/>
    </AuthProvider>
  )
}

export default App;
