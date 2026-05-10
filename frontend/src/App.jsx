import { useEffect, useState } from "react"

function App() {

  const [budgetData, setBudgetData] = useState(null)

  useEffect(() => {

    async function fetchBudget() {

      try {

        const response = await fetch(
          "http://127.0.0.1:8000/trips/1/budget"
        )

        const data = await response.json()

        console.log(data)

        setBudgetData(data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchBudget()

  }, [])

  if (!budgetData) {
    return <h1>Loading...</h1>
  }

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Traveloop Dashboard
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-[400px]">

        <h2 className="text-2xl font-semibold mb-4">
          Europe Trip
        </h2>

        <p className="mb-2">
          Trip Budget: ₹{budgetData.trip_budget}
        </p>

        <p className="mb-2">
          Total Spent: ₹{budgetData.total_spent}
        </p>

        <p className="mb-2 text-green-600 font-bold">
          Remaining Budget: ₹{budgetData.remaining_budget}
        </p>

      </div>

    </div>

  )

}

export default App