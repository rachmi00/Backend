// RoomComponent.js
import React from 'react';
import firebase from './firebase'; // Import the initialized firebase

const RoomComponent = ({ name, book_value}) => {
  const handleBookRoom = async () => {
    try {
      // Update the room document in Firestore
      await firebase.firestore().collection('rooms').doc(name).update({
        book_value: true,
      });
      console.log(`${name} booked successfully!`);
    } catch (error) {
      console.error('Error booking room:', error.message);
    }
  };
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

  return (
    <div className='firestore-room-render'>
       {rooms.map((room) => (
    <div>
      <p>Room Name: {room.name}</p>
      <p>Status: {room.book_value ? 'Booked' : 'Available'}</p>
      <button onClick={handleBookRoom} disabled={book_value}>
        Book Room
      </button>
    </div>
       )
  )};
  </div>
  )
};

export default RoomComponent;