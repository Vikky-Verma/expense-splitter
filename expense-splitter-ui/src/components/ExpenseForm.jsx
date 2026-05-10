import { useEffect, useState } from 'react'
import axios from 'axios'

function ExpenseForm() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [participants, setParticipants] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await axios.get(
      'http://127.0.0.1:8000/api/users/'
    )

    setUsers(response.data)
  }

  const handleCheckbox = (id) => {
    if (participants.includes(id)) {
      setParticipants(
        participants.filter((item) => item !== id)
      )
    } else {
      setParticipants([...participants, id])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const expenseData = {
      title,
      amount,
      paid_by: paidBy,
      participants,
    }

    await axios.post(
      'http://127.0.0.1:8000/api/expenses/',
      expenseData
    )

    alert('Expense Added Successfully')

    setTitle('')
    setAmount('')
    setPaidBy('')
    setParticipants([])
  }

  return (
    <div className="card">
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          <option value="">Paid By</option>

          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <h3>Participants</h3>

        {users.map((user) => (
          <div className="checkbox-item" key={user.id}>
            <input
              type="checkbox"
              checked={participants.includes(user.id)}
              onChange={() => handleCheckbox(user.id)}
            />

            <label>{user.name}</label>
          </div>
        ))}

        <button type="submit">Add Expense</button>
      </form>
    </div>
  )
}

export default ExpenseForm