import React from 'react'
import { useState  } from 'react'
import { useNavigate , Link } from 'react-router-dom'
import styles from "./styles/Signup.css";
import axios from 'axios';
export const Signup = () => {

    const [data , setData] = useState({
        username: "",
        password: "",
    })

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};


    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const url = "http://localhost:8080/api/signup";
            const {data : res} = await axios.post(url, data);
            window.alert('User Created')
            navigate("/signin");
            console.log(res.message);
        }catch{
            {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message);
                }
            }
        }
    }


  return(
    <div className="signup_container">
    <div className="signup_form_container">
        <div className="left">
            <h1>Welcome Back</h1>
            <Link to="/signin">
                <button type="button" className="white_btn">
                    Sign In
                </button>
            </Link>
        </div>
        <div className="right">
            <form className="form_container" onSubmit={handleSubmit}>
               
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={data.username}
                    required
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className= "input"
                />
                {error && <div className="error_msg">{error}</div>}
                <button type="submit" className="green_btn">
                    Sign Up
                </button>
            </form>
        </div>
    </div>
</div>


  );
}