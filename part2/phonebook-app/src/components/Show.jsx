import React from 'react';

const PersonsList = ({ personsToShow, deletePerson }) => {
  return (
    <ul>
      {personsToShow.map((person, index) => (
        <li key={index}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PersonsList;