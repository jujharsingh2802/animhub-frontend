import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/users/login', {
        username: 'jujhar_0101', // Hardcoded username
        password: '12345678', // Hardcoded password
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
  
      setMessage('Login successful!')
      setIsLoggedIn(true)
      console.log('Login response:', response.data)
    } catch (error) {
      console.error('Error logging in:', error)
      setMessage('Login failed, please try again.')
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      const fetchCurrentUser = async () => {
        try {
          const response = await axios.get('/api/users/current-user', {
            withCredentials: true,
          })
          console.log(response.data);
          setCurrentUser(response.data.data);
        } catch (error) {
          console.error('Error fetching current user:', error)
        }
      }

      fetchCurrentUser()
    }
  }, [isLoggedIn])

  return (
    <div className='bg-black text-white text-xl min-h-screen flex flex-col items-center justify-center'>
      {!isLoggedIn ? (
        <div className='bg-gray-900 text-black p-8 rounded-md w-80 mb-8'>
          <h2 className='text-2xl mb-4'>Login</h2>
          <button
            onClick={handleLogin}
            className='w-full bg-blue-600 p-2 rounded-md hover:bg-blue-700'
          >
            Login with Hardcoded Credentials
          </button>
          {message && <p className='mt-4'>{message}</p>}
        </div>
      ) : (
        <>
          <h1 className='mb-4 text-3xl font-bold'>User Profile</h1>
          {currentUser ? (
            <div className='bg-gray-800 p-6 rounded-md w-96'>
              <div className='mb-4'>
                <img 
                  src={currentUser.coverImage} 
                  alt="Cover" 
                  className='w-full h-32 object-cover rounded-md' 
                />
              </div>
              <div className='flex items-center mb-4'>
                <img 
                  src={currentUser.avatar} 
                  alt="Avatar" 
                  className='w-20 h-20 rounded-full border-4 border-gray-700' 
                />
                <div className='ml-4'>
                  <h2 className='text-2xl font-semibold'>{currentUser.fullName}</h2>
                  <p className='text-gray-400'>{currentUser.email}</p>
                </div>
              </div>
              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>Account Details</h3>
                <p><strong>Full Name:</strong> {currentUser.fullName}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                <p><strong>Joined On:</strong> {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> {new Date(currentUser.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </>
      )}
    </div>
  )
}

export default App
