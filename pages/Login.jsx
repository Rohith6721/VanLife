import React from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../apis"

export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })

    function handleSubmit(e) {
        e.preventDefault()
        loginUser(loginFormData)
            .then(data => console.log(data))
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button>Log in</button>
            </form>
        </div>
    )

}