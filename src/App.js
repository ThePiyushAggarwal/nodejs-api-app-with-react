import { useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState('// Response will be displayed here')
  const [userId, setUserId] = useState(1)
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)
    await axios.get('/todos').then((response) => {
      setData(response.data)
      setLoading(false)
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await axios.get('/user/' + userId).then((response) => {
      setData(response.data)
      setLoading(false)
    })
  }

  return (
    <div className="container mt-5">
      <div>
        <code>GET </code>
        http://localhost:5000/todos
        <button onClick={onClick} className="btn btn-primary">
          Go
        </button>
      </div>
      <div>
        <code>GET </code>http://localhost:5000/user/
        <form onSubmit={onSubmit} className="d-inline">
          <input
            type="number"
            min="1"
            max="10"
            onChange={(e) => setUserId(e.target.value)}
            value={userId}
          />
          <button className="btn btn-primary">Go</button>
        </form>
      </div>

      <div className="mt-5">
        {loading ? (
          <div className="spinner-border" role="status"></div>
        ) : (
          <pre>{JSON.stringify(data, null, 4)}</pre>
        )}
      </div>
    </div>
  )
}

export default App
