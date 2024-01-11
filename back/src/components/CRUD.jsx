import React ,{ useEffect, useState } from 'react';
import { db, } from "../config/firebaseConfig";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";



function CRUD(){
 //begin the room display
 const [rooms, setRooms] = useState([]);

 //new room states ie Create
 const [newRoomName, setNewRoomName] = useState('')
 const [newRoomDescription, setNewRoomDescription] = useState('')
 const [newRoomRent, setNewRoomRent] = useState(0)
 const [newRoomCapacity, setNewRoomCapacity] = useState(0)
 const [newBookValue, setNewBookValue] = useState(false)
 const [currentBooking, setCurrentBooking] = useState(false)
 const [newImage, setNewImage] =useState('')

 //update room name state
 const[updatedName, setUpdatedName] = useState('')

//getting the rooms from firestore
 const roomsCollectionRef = collection(db, "rooms")



 //update room name
 const updateRoomName= async (id)=>{
   const roomDoc = doc(db, 'rooms', id);
   await updateDoc(roomDoc, {name: updatedName});
 }
 
 
 //NewRoom Submission
 const onSubmitRoom = async()=>{
 try {
   await addDoc(roomsCollectionRef,
     {
       name: newRoomName,
       description: newRoomDescription,
       rent: newRoomRent,
       capacity: newRoomCapacity,
       book_value: newBookValue,
       current_booking: currentBooking,
       image: newImage,
   
 
     });

     
 } catch (error) {
   console.error(error)
 }
 }

  //delete room
  const deleteRoom = async (id)=>{
    const roomDoc = doc(db, 'rooms', id);
    await deleteDoc(roomDoc);
  }
   
  
  useEffect(() => {
   //render the rooms
   const getRooms = async () => {
    //read data
    try {
      const data = await getDocs(roomsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRooms(filteredData);
    }
    catch (err) {
      console.error(err)
    }
  
  }
   getRooms();
   
  }, [onSubmitRoom])



 return (
   <div>
    
  {/* dummy ui */}
     <div className='create'>
     
       <input placeholder='room name...' onChange={(e)=>setNewRoomName(e.target.value)}/>
       <input placeholder='image url...' onChange={(e)=>setNewImage(e.target.value)}/>
       <input placeholder=' description...' onChange={(e)=>setNewRoomDescription(e.target.value)}/>
       <input placeholder='rent...' type='number' onChange={(e)=>setNewRoomRent(e.target.value)} />
       <input placeholder='capacity...' type='number' onChange={(e)=>setNewRoomCapacity(e.target.value)} />
       <label>room booked?</label><input type="checkbox" checked={currentBooking} onChange={(e)=>setCurrentBooking(e.target.checked)}/>
       <label>book value</label><input type="checkbox" checked={newBookValue} onChange={(e)=>setNewBookValue(e.target.checked)}/>
       <button onClick={onSubmitRoom}>add room</button> 
     </div>

     <div className='firestore-room-render'>
       {rooms.map((room) => (
         <div >
          {/* displaying the rooms */}
           <div key={room.id}>
           <h2 style={{color: room.book_value ? 'red' : 'green'}} >{room.name}</h2>
           <h3 >{room.description}</h3>
           <h3 >{room.rent}</h3>
           <h3 >{room.book_value}</h3>
           <h3 >{room.current_booking}</h3>
           <h3 >{room.capacity}</h3>
           <img
            src={room.image}
            className="img-fluid rounded-top"
            alt=""
            />
           </div>

           {/* delete room */}
           <button onClick={()=>deleteRoom(room.id)}> delete room</button>

            {/* room name update */}
           <div>
             <input type="text" placeholder='new room name' onChange={(e)=>setUpdatedName(e.target.value) }/>
             <button onClick={()=>updateRoomName(room.id)}>update room name</button>
           </div>
         
         </div>
       )
       )}
     </div>
   </div>
 )
}
export default CRUD
