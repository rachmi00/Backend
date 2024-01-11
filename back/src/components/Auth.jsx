import { useState } from 'react'
import { auth, googleProvider }  from '../config/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword} from 'firebase/auth'
import { db } from "../config/firebaseConfig";
import {  collection } from "firebase/firestore";
import 'firebase/firestore';



export const Auth = () =>{

      const [email,setEmail]=useState('');
      const [password, setPassword] = useState('')
      const [userName, setUserName] = useState('')

      const signUp = async ()=>{
        try{
         await createUserWithEmailAndPassword(auth, email, password,userName)
         //add user to db
         const collectionRef = collection(db, 'user');
         const currentUser = auth().currentUser;
         const documentId = `${currentUser.uid}`;

const dataToAdd = {
  userName: userName,
  email: email,
  role: password,
  // ... other fields
};

collectionRef.doc(documentId).set(dataToAdd)
  .then(() => {
    console.log('Document added with specified ID:', documentId);
  })
  .catch((error) => {
    console.error('Error adding document:', error);
  });
        }
        catch(err) {
            console.log(err)
        }
      };




      const signInWithGoogle = async ()=>{
        try{
         await signInWithPopup(auth, googleProvider)
        }
        catch(err) {
            console.log(err)
        }
      };


      const logout = async ()=>{
        try{
         await signOut(auth)
        }
        catch(err) {
            console.log(err)
        }
      };

      

    return(
        <div>
            <input placeholder="userName" onChange={(e)=>setUserName(e.target.value)} />
            <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
            <input placeholder="password" onChange={(e)=>setPassword(e.target.value)} type='password'/>
            <button onClick={signUp}>sign Up</button>

            <button onClick={signInWithGoogle}> Sign in with google</button>
            <button onClick={logout}>logout</button>
        </div>
    )
}