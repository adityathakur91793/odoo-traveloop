import { useEffect, useState } from "react"
import axios from "axios"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

function App() {

  const [budgetData, setBudgetData] = useState(null)
  const [expenses, setExpenses] = useState([])

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")

  const COLORS = [
    "#7C3AED",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
  ]

  // FETCH BUDGET

  const fetchBudget = async () => {
    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/trips/1/budget"
      )

      setBudgetData(response.data)

    } catch (error) {
      console.error(error)
    }
  }

  // FETCH EXPENSES

  const fetchExpenses = async () => {
    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/expenses"
      )

      setExpenses(response.data)

    } catch (error) {
      console.error(error)
    }
  }

  // ADD EXPENSE

  const addExpense = async () => {

    if (!title || !amount) {
      alert("Please fill all fields")
      return
    }

    try {

      await axios.post(
        "http://127.0.0.1:8000/expenses",
        {
          title: title,
          amount: parseInt(amount),
          category: category,
          trip_id: 1,
        }
      )

      setTitle("")
      setAmount("")
      setCategory("Food")

      fetchBudget()
      fetchExpenses()

    } catch (error) {
      console.error(error)
    }
  }

  // DELETE EXPENSE

  const deleteExpense = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/expenses/${id}`
      )

      fetchBudget()
      fetchExpenses()

    } catch (error) {
      console.error(error)
      alert("Delete API not added in backend yet")
    }
  }

  useEffect(() => {
    fetchBudget()
    fetchExpenses()
  }, [])

  // CHART DATA

  const chartData = expenses.map((expense) => ({
    name: expense.category,
    value: expense.amount,
  }))

  if (!budgetData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-3xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-slate-100 p-4 md:p-8 overflow-x-hidden">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          Traveloop Dashboard
        </h1>

        <p className="text-slate-500 mt-2 text-lg">
          Smart Travel Expense Management
        </p>

      </div>

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* TOTAL BUDGET */}

        <div className="bg-white rounded-3xl shadow-md p-6">

          <p className="text-slate-500 text-lg mb-2">
            Trip Budget
          </p>

          <h2 className="text-4xl font-bold text-slate-800">
            ₹{budgetData.trip_budget}
          </h2>

        </div>

        {/* TOTAL SPENT */}

        <div className="bg-white rounded-3xl shadow-md p-6">

          <p className="text-slate-500 text-lg mb-2">
            Total Spent
          </p>

          <h2 className="text-4xl font-bold text-red-500">
            ₹{budgetData.total_spent}
          </h2>

        </div>

        {/* REMAINING */}

        <div className="bg-white rounded-3xl shadow-md p-6">

          <p className="text-slate-500 text-lg mb-2">
            Remaining Budget
          </p>

          <h2 className="text-4xl font-bold text-green-600">
            ₹{budgetData.remaining_budget}
          </h2>

        </div>

      </div>

      {/* PROGRESS BAR */}

      <div className="bg-white rounded-3xl shadow-md p-6 mb-10">

        <div className="flex justify-between mb-4">

          <h2 className="text-2xl font-bold text-slate-800">
            Budget Usage
          </h2>

          <p className="text-lg text-slate-500">
            {Math.round(
              (budgetData.total_spent /
                budgetData.trip_budget) *
                100
            )}%
          </p>

        </div>

        <div className="w-full bg-slate-200 rounded-full h-5">

          <div
            className="bg-purple-600 h-5 rounded-full transition-all duration-500"
            style={{
              width: `${
                (budgetData.total_spent /
                  budgetData.trip_budget) *
                100
              }%`,
            }}
          ></div>

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT SIDE */}

        <div>

          {/* ADD EXPENSE */}

          <div className="bg-white rounded-3xl shadow-md p-6 mb-8">

            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              Add Expense
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Expense Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border border-slate-300 rounded-2xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                className="w-full border border-slate-300 rounded-2xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full border border-slate-300 rounded-2xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >

                <option>Food</option>
                <option>Hotel</option>
                <option>Transport</option>
                <option>Entertainment</option>
                <option>Shopping</option>
                <option value="Others">Others</option>

              </select>

              <button
                onClick={addExpense}
                className="w-full bg-purple-600 hover:bg-purple-700 transition text-white rounded-2xl p-4 text-xl font-bold"
              >
                Add Expense
              </button>

            </div>

          </div>

          {/* CHART */}

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              Expense Analytics
            </h2>

            <div className="w-full h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >

                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />
                    ))}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div>

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              Expense History
            </h2>

            <div className="space-y-4 max-h-[850px] overflow-y-auto pr-2">

              {expenses.map((expense) => (

                <div
                  key={expense.id}
                  className="border border-slate-200 rounded-2xl p-5 flex justify-between items-center hover:shadow-md transition"
                >

                  <div>

                    <h3 className="text-2xl font-bold text-slate-800">
                      {expense.title}
                    </h3>

                    <p className="text-slate-500 mt-1">
                      {expense.category}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-bold text-slate-800">
                      ₹{expense.amount}
                    </p>

                    <button
                      onClick={() =>
                        deleteExpense(expense.id)
                      }
                      className="mt-2 text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default App