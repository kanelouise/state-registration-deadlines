'use client'
import { useEffect, useState } from 'react'

const LOCAL_API = 'http://localhost:3000/api/states'

export default function Page() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(LOCAL_API)
      const json = await res.json()
      setData(json)
    }

    fetchData()
  }, [])

  const filtered = data.filter((state) =>
    state.State.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Voter Registration Deadlines</h1>

      <input
        type="text"
        placeholder="Search by state..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 mb-4 w-full"
      />

      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">State</th>
            <th className="border px-2 py-1 text-left">In Person</th>
            <th className="border px-2 py-1 text-left">By Mail</th>
            <th className="border px-2 py-1 text-left">Online</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((state) => (
            <tr key={state.State}>
              <td className="border px-2 py-1">{state.State}</td>
              <td className="border px-2 py-1">{state.DeadlineInPerson}</td>
              <td className="border px-2 py-1">{state.DeadlineByMail}</td>
              <td className="border px-2 py-1">{state.DeadlineOnline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

