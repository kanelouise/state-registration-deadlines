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
      <main className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">Voter Registration Deadlines by State</h1>
    
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by state name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
    
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="p-3 border-b">State</th>
                <th className="p-3 border-b cursor-pointer" onClick={() => handleSort('DeadlineInPerson')}>
                  In-Person {sortField === 'DeadlineInPerson' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-3 border-b cursor-pointer" onClick={() => handleSort('DeadlineByMail')}>
                  By Mail {sortField === 'DeadlineByMail' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-3 border-b cursor-pointer" onClick={() => handleSort('DeadlineOnline')}>
                  Online {sortField === 'DeadlineOnline' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-3 border-b">Election Day Reg.</th>
                <th className="p-3 border-b">Online Reg. Link</th>
                <th className="p-3 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((state, idx) => (
                <tr key={state.State} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 border-b font-medium">{state.State}</td>
                  <td className="p-3 border-b">{state.DeadlineInPerson}</td>
                  <td className="p-3 border-b">{state.DeadlineByMail}</td>
                  <td className="p-3 border-b">{state.DeadlineOnline}</td>
                  <td className="p-3 border-b">{state.ElectionDayRegistration}</td>
                  <td className="p-3 border-b">
                    {state.OnlineRegistrationLink ? (
                      <a
                        href={state.OnlineRegistrationLink}
                        className="text-blue-600 underline hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="p-3 border-b">{state.Description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    )
  }    