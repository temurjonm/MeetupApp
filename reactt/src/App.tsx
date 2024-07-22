import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface IUsers {
  id: number;
  userName: string;
  email: string;
  phone: string;
}

function App() {
  const [users, setUsers] = useState<IUsers[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IUsers[]>("http://localhost:5000/api/users")
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.userName} - {user.email} - - {user.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
