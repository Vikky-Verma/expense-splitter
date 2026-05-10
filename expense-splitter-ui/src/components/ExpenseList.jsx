import { useEffect, useState } from 'react'
import axios from 'axios'

function ExpenseList() {
  const [expenses, setExpenses] = useState([])

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/expenses/'
      )

      setExpenses(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/expenses/${id}/`
      )

      fetchExpenses()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card">
      <h2>💸 All Expenses</h2>

      {expenses.length === 0 ? (
        <p>No Expenses Found</p>
      ) : (
        expenses.map((expense) => (
          <div
            className="expense-item"
            key={expense.id}
          >
            <p>
              <strong>
                {expense.title}
              </strong>
            </p>

            <p>₹ {expense.amount}</p>

            <button
              className="delete-btn"
              onClick={() =>
                deleteExpense(expense.id)
              }
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default ExpenseList