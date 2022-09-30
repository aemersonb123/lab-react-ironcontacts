// src/App.js
import "./App.css";
import { useState } from "react";
import contactsData from "./contacts.json";

function App() {
  const [remainingContacts, setRemainingContacts] = useState(
    contactsData.slice(5, contactsData.length -1)
    );
    const [contacts, setContacts] = useState((contactsData.slice(0,5)));

    const handleNewRandomCharacter = () => {
      const randomIndex =
      Math.floor(Math.random() * 1000) % remainingContacts.length;
      const randomContact = remainingContacts[randomIndex];

      setContacts([randomContact, ...contacts]);
      setRemainingContacts(
        remainingContacts.filter((contact) => contact.id !== randomContact.id)
      );
    }

    const handleSortBy = (property) => {
      const sorted = contacts.sort(
        property === 'name'
        ?(a,b) => (a[property] > b[property] ? 1 : -1)
        : (a, b) => a[property] - b[property]
      );

      setContacts([...sorted]);
    };

    const handleDelete = (id) => {
      setContacts(contacts.filter((contact) => contact.id !== id));
      setRemainingContacts(remainingContacts.filter((c) => c.id !==id));
    };

  return (
    <div className="App">
    <button onClick={handleNewRandomCharacter}>Add random contact</button>
    <button onClick={() => handleSortBy('popularity')}>
      Sort by popularity
    </button>
    <button onClick={() => handleSortBy('name')}>Sort by name</button>
    <table className='table'>
      <tr>
        <th className='table-header'>Picture</th>
        <th className='table-header'>Name</th>
        <th className='table-header'>Popularity</th>
        <th className='table-header'>Won Oscar</th>
        <th className='table-header'>Won Emmy</th>
        <th className='table-header'>Actions</th>
      </tr>
      {contacts.slice(0, 5).map((contact) => (
        <tr>
          <td className='table-cell'>
            <img className='contact-picture' src={contact.pictureUrl} />
          </td>
          <td className='table-cell'>{contact.name}</td>
          <td className='table-cell'>{contact.popularity}</td>
          <td className='table-cell'>{contact.wonOscar ? "🏆" : null}</td>
          <td className='table-cell'>{contact.wonEmmy ? "🏆" : null}</td>
          <td className='table-cell'>
            <button 
            onClick={() => {
              handleDelete(contact.id);
            }}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </table>
    </div>
  );
      }
export default App;
