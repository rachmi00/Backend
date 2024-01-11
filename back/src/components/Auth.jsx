import { useState } from 'react'
import { auth, googleProvider }  from '../config/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithPopup, signOut,} from 'firebase/auth'
import { db } from "../config/firebaseConfig";
import {  collection, addDoc } from "firebase/firestore";
import 'firebase/firestore';



export const Auth = () =>{

      const [email,setEmail]=useState('');
      const [password, setPassword] = useState('')
      const [userName, setUserName] = useState('')

      //getting the users from firestore
       const usersCollectionRef = collection(db, "users")

        //NewRoom Submission
 
 
  

      const signUp = async ()=>{
      await createUserWithEmailAndPassword(auth, email, password)
      try {
        await addDoc(usersCollectionRef,
          {
           userName: userName,
           email: email,
           
           
          });
     
          
      } catch (error) {
        console.error(error)
      }
  
      }



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