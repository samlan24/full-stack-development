import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Person from './components/Person';
import Show from './components/Show';
import phoneService from './services/Phones';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');


  useEffect(() => {
    phoneService
    .getAll()
    .then(initialBook => {
      setPersons(initialBook);
    });
  }, []);




  // checks if name exists
  const nameExists = new Set(persons.map(person => person.name));

  const addPerson = (event) => {
    event.preventDefault();
    // if the name exists, there's an alert
    if (nameExists.has(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    phoneService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    const result = window.confirm(`Delete ${person.name} ?`);
    if (result) {
      phoneService
        .deleteNUmber(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  // Filtering persons based on the search input
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h2>Add New User</h2>
      <Person addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}/>
      <h2>Numbers</h2>
      <Show personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
