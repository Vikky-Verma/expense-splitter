import { useEffect, useState } from 'react'
import axios from 'axios'

function AddUser() {
  const [name, setName] = useState('')
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://expense-splitter-maaa.onrender.com/api/users/'
      )

      setUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = async (e) => {
    e.preventDefault()

    if (!name) return

    try {
      await axios.post(
        'https://expense-splitter-maaa.onrender.com/api/users/',
        {
          name,
        }
      )

      setName('')

      fetchUsers()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `https://expense-splitter-maaa.onrender.com/api/users/${id}/`
      )

      fetchUsers()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card">
      <h2>👤 Manage Users</h2>

      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Enter user name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button type="submit">
          Add User
        </button>
      </form>

      {users.map((user) => (
        <div
          className="expense-item"
          key={user.id}
        >
          <p>{user.name}</p>

          <button
            className="delete-btn"
            onClick={() =>
              deleteUser(user.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default AddUser