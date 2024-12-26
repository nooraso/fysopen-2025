export const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input 
                name="name" 
                value={newName} 
                onChange={handleNameChange} 
                autoComplete="off" 
              />
      </div>
      <div>
        number: <input 
                name="number" 
                value={newNumber} 
                onChange={handleNumberChange} 
                autoComplete="off" 
              />
      </div>    
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}