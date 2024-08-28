import React , { useState } from "react"


const Login =() =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Lógica para manejar el login
      console.log('Email:', email);
      console.log('Password:', password);
    };

    return (<>
     <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>
                </form>
            </div>
            </div>
        </>)

}

export default Login