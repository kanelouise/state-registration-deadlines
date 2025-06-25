// const LOCAL_API = 'http://localhost:3000/api/sample_api'
'use client'
import { useEffect, useState } from "react";

const LOCAL_API = 'http://localhost:3000/api/states'

export default function Page() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    async function fetchData(){
      const res = await fetch(LOCAL_API);
      const json = await res.json();
      setData(json)
    }
    fetchData()
  }, [])

  const handleSort = (field: keyof VoterInfo) =>{
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const filtered = data
    .filter((state) =>
      state.State.toLowerCase().includes(search.toLowerCase())
     )
    .sort((a,b)=> {
      if (!sortField) return 0;
      const aVal = a[sortField] || ''
      const bVal = b[sortField] || ''
      return sortOrder === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    })

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-6">Voter Registration Deadlines by State</h1>

      <input type="text"
      placeholder="Search by state"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border px-3 py-2 mb-4 w-full
      " />

        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border-b">State</th>
              <th 
                className="p-2 border-b" 
                onClick={() => handleSort('DeadlineInPerson')}
                >
                In-Person {sortField === 'DeadlineInPerson' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
              <th 
                className="p-2 border-b cursor-pointer" 
                onClick={() => handleSort('DeadlineByMail')}>
                By Mail {sortField === 'DeadlineByMail' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th 
                className="p-2 border-b"
                onClick={() => handleSort('DeadlineOnline')}
                >
                Online {sortField === 'DeadlineOnline' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="p-2 border-b">Election Day Reg.</th>
              <th className="p-2 border-b">Online Reg. Link</th>
              <th className="p-2 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((state) => (
              <tr key={state.State} className="hover:bg-gray-50">
                <td className="p-2 border-b font-medium">{state.State}</td>
                <td className="p-2 border-b">{state.DeadlineInPerson}</td>
                <td className="p-2 border-b">{state.DeadlineByMail}</td>
                <td className="p-2 border-b">{state.DeadlineOnline}</td>
                <td className="p-2 border-b">{state.ElectionDayRegistration}</td>
                <td className="p-2 border-b">
                  {state.OnlineRegistrationLink ? (
                    <a
                      href={state.OnlineRegistrationLink}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="p-2 border-b">{state.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
}