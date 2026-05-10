import { useState } from 'react'

import AddUser from './components/AddUser'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Balances from './components/Balances'

function App() {
  const [activeSection, setActiveSection] =
    useState('user')

  return (
    <>
      {/* Stars */}
      <div className="stars">
        {[...Array(80)].map((_, i) => (
          <span
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          🌌 Expense Splitter
        </div>

        <div className="nav-links">

          <button
            type="button"
            className={
              activeSection === 'user'
                ? 'active-nav'
                : ''
            }
            onClick={() =>
              setActiveSection('user')
            }
          >
            Add User
          </button>

          <button
            type="button"
            className={
              activeSection === 'add'
                ? 'active-nav'
                : ''
            }
            onClick={() =>
              setActiveSection('add')
            }
          >
            Add Expense
          </button>

          <button
            type="button"
            className={
              activeSection === 'expenses'
                ? 'active-nav'
                : ''
            }
            onClick={() =>
              setActiveSection('expenses')
            }
          >
            All Expenses
          </button>

          <button
            type="button"
            className={
              activeSection === 'balances'
                ? 'active-nav'
                : ''
            }
            onClick={() =>
              setActiveSection('balances')
            }
          >
            Balances
          </button>

        </div>
      </nav>

      {/* Main */}
      <div className="container">

        <h1>
          🚀 Smart Expense Splitter
        </h1>

        <div className="section-animation">

          {activeSection === 'user' && (
            <AddUser />
          )}

          {activeSection === 'add' && (
            <ExpenseForm />
          )}

          {activeSection === 'expenses' && (
            <ExpenseList />
          )}

          {activeSection === 'balances' && (
            <Balances />
          )}

        </div>

      </div>
    </>
  )
}

export default App