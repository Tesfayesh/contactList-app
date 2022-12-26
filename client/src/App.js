import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(0)
  //const [newPhone, setNewPhone] = useState(0)
  const [contactList, setContactList] = useState([])

    useEffect(() =>{
    Axios.get('http://localhost:8080/get-contact').then ( res =>{
      setContactList(res.data.data.contactNumbers)
    })
  },[contactList])

  const addNewContact = () => {
    Axios.post('http://localhost:8080/add-contact', {...contactList,name, phone})
    
  }


  const updatePhone = (id) => {
    const newPhone = prompt("Please enter new phone number")

    Axios.put(`http://localhost:8080/update-contact`, {id, newPhone})
  }

  const deletePhone = (id) => {
    Axios.delete(`http://localhost:8080/delete-contact/${id}`, {id, phone})
  }

  return (
    <div className="container">
      <label htmlFor='name'>Name:</label>
      <input type="text" onChange={(e) => {setName(e.target.value)}} /> <br/>
      <label htmlFor='phone'>Phone:</label>
      <input type="number" onChange={(e) => {setPhone(e.target.value)}} /> <br/>

      <button onClick={addNewContact}>Add new Contact</button>

      <h1>Contact List</h1>
      
      {
        contactList.map((val,key) => {
          return (<div key={key} className='phone'>
            <h3>Name :{val.name}</h3>
            <h3>Phone: {val.phone}</h3>
          
                    <button className='update-btn' onClick={() => {updatePhone(val._id)}}>Update</button>
                    <button className='delete-btn' onClick={() => {deletePhone(val._id)}}>Delete</button>
          </div>)
        })
      }
    </div>
  );
}

export default App;
