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

  const API_URL = "https://odoo-traveloop.onrender.com"

  const fetchBudget = async () => {
    try {
      const response = await axios.get(`${API_URL}/trips/1/budget`)
      setBudgetData(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/expenses`)
      setExpenses(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBudget()
    fetchExpenses()
  }, [])

  const addExpense = async () => {
    if (!title || !amount) return

    try {
      await axios.post(`${API_URL}/expenses`, {
        title,
        amount: Number(amount),
        category,
        trip_id: 1,
      })

      setTitle("")
      setAmount("")
      setCategory("Food")

      fetchBudget()
      fetchExpenses()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/expenses/${id}`)

      fetchBudget()
      fetchExpenses()
    } catch (error) {
      console.log(error)
    }
  }

  if (!budgetData) {
    return <div className="p-10 text-2xl">Loading...</div>
  }

  const chartData = expenses.map((expense) => ({
    name: expense.category,
    value: expense.amount,
  }))

  const COLORS = [
    "#7c3aed",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
  ]

  const budgetPercentage = Math.min(
    (budgetData.total_spent / budgetData.trip_budget) * 100,
    100
  )

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          🌍 Traveloop Dashboard
        </h1>

        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg mb-2">Trip Budget</h2>

            <p className="text-4xl font-bold text-purple-600">
              ₹{budgetData.trip_budget}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg mb-2">Total Spent</h2>

            <p className="text-4xl font-bold text-red-500">
              ₹{budgetData.total_spent}
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg mb-2">
              Remaining Budget
            </h2>

            <p className="text-4xl font-bold text-green-600">
              ₹{budgetData.remaining_budget}
            </p>
          </div>
        </div>

        {/* Budget Usage */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex justify-between mb-3">
            <h2 className="text-2xl font-bold">Budget Usage</h2>

            <span className="text-xl text-gray-500">
              {budgetPercentage.toFixed(0)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 h-5 rounded-full overflow-hidden">
            <div
              className="h-5 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
              style={{ width: `${budgetPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Expense */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-6">
              Add Expense
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Expense Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Food">Food</option>
                <option value="Hotel">Hotel</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Others">Others</option>
              </select>

              <button
                onClick={addExpense}
                className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white py-4 rounded-2xl font-bold text-xl hover:scale-[1.02] transition"
              >
                Add Expense
              </button>
            </div>
          </div>

          {/* Expense History */}
          <div className="bg-white rounded-3xl shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-6">
              Expense History
            </h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="border border-gray-200 rounded-2xl p-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-2xl font-bold">
                      {expense.title}
                    </h3>

                    <p className="text-gray-500 text-lg">
                      {expense.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-3xl font-bold">
                      ₹{expense.amount}
                    </p>

                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-500 font-semibold mt-2 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">
          <h2 className="text-3xl font-bold mb-6">
            Expense Analytics
          </h2>

          <div className="w-full h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={150}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
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
    </div>
  )
}

export default App