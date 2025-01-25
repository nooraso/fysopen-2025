import { useState, useEffect } from 'react'
import { PersonForm } from './components/PersonForm.jsx'
import { PersonList } from './components/PersonList.jsx'
import Filter from './components/Filter.jsx'
import personService from './services/Persons.js'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        updatePerson(existingPerson.id, updatedPerson)
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    personService
      .create(newPerson)
      .then(savedPerson => {
        setPersons(persons.concat(savedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${newPerson.name}`)
      })
      .catch(error => {
        console.log('Failed to save person:', error)
        showNotification(`Failed to save person ${newPerson.name} to server.`)
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification(`Deleted ${person.name}`, 'success')
        })
        .catch(error => {
          console.log('Failed to delete person:', error)
          showNotification(`Failed to delete person ${person.name} from server.`)
        })
    }
  }

  const updatePerson = (id, newPerson) => {
    personService
      .update(id, newPerson)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Updated ${newPerson.name}`, 'success')
      })
      .catch(error => {
        console.log('Failed to update person:', error)
        showNotification(`Failed to update person ${newPerson.name} to server.`)
      })
  }

  const personsToShow = filterText
    ? persons.filter(person => 
        person.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : persons

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
   }, type === 'success' ? 2000 : 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filterText} handleFilterChange={handleFilterChange} />
      <h2>Add new person</h2>
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
        handleUpdate={updatePerson} 
      />
      <h2>Numbers</h2>
      <PersonList persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App