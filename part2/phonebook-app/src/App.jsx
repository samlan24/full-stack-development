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

  // Adding a new person to the phonebook
  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const result = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`);
      if (result) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        phoneService
          .updateNumber(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            console.error("Error updating number:", error);
            alert("An error occurred while updating the number.");
          });
      }
    } else {
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
  };

  // Deleting a person from the phonebook
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    const result = window.confirm(`Delete ${person.name} ?`);
    if (result) {
      phoneService
        .deleteNumber(id)
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
      <Person addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />
      <h2>Numbers</h2>
      <Show personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
