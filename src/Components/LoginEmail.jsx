// import React from 'react';
// import { useState } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// function Login()
// {
//     const [loginData,setloginData] = useState({
//         email:'',
//         password:'',
//     })
//     const [errors,setErrors]=useState({});
//     const navigate=useNavigate();

//     const handleChange = (e) =>{
//         const {name,value}=e.target;
//         setloginData((prevData) =>({...prevData,[name]:value}));
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Perform validation
//         const validationErrors = validateForm(loginData);
//         if (Object.keys(validationErrors).length === 0) {
//           // Submit the form (implement authentication logic here)
//           console.log('Form submitted:', loginData);
//           //alert("Your Account Has Been created Successfully");
//             navigate('/Home');
//         } else {
//           setErrors(validationErrors);
//         }
//       };

//       const validateForm = (data) => {
//         let errors = {};
//         if (!data.email.trim()) {
//           errors.email = 'Email is required';
//         } else if (!isValidEmail(data.email)) {
//           errors.email = 'Invalid email format';
//         }
//         if (!data.password.trim()) {
//           errors.password = 'Password is required';
//         } else if (data.password.length < 6) {
//           errors.password = 'Password must be at least 6 characters long';
//         }
//         return errors;
//       };
    
//       const isValidEmail = (email) => {
//         // Basic email validation regex
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//       };

//     return(
//     <div className='LoginEmail'>
//         <center>
//             <br></br>
//             <h1 class = "h1">Welcome !!!</h1>
//             <div id = 'Content'>
//                 <form class = "form">
//                     <table>
//                         <tr>
//                         <td class = "Email">Email : </td>
//                         <td><input type = "email" class = "emailInput" placeholder='     Enter your e-mail'
//                             id="email"
//                             name="email"
//                             value={loginData.email}
//                             onChange={handleChange} 
//                         />
//                         </td>
//                         </tr>
//                         <tr className='errormsg'>{errors.email && <span>{errors.email}</span>}</tr>
//                         <tr>
//                         <td class = "Password">Password : </td>
//                         <td><input type = "Password" class = "PasswordInput" placeholder='     Enter your Password' 
//                         id="password"
//                         name="password"
//                         value={loginData.password}
//                         onChange={handleChange}  
//                         />
//                         </td>
//                         </tr>
//                         <tr className='errormsg'>{errors.password && <span>{errors.password}</span>}</tr>
//                         {/* <div class="Remember">
//                         <input type='checkbox' id="checkbox"></input>
//                         <label class='Rememberme'>Remember me</label><br></br>
//                         </div> */}
//                     </table>
//                         <br></br>

//                         <a href='/Home'><button type="button" class = "btn" onClick={handleSubmit}>LogIn</button><br></br></a>
//                         {/* <hr></hr>OR
//                         <br></br>
//                         <a href='/LoginM'><button type="button" class = "btn">Continue with Mobile Number</button></a><br></br><br></br>
//                         <br></br> */}
//                         <br></br>
//                         <hr></hr>
//                         <br></br>
//                     <table>
//                         <tr>
//                         <td>Forget Password?</td>
//                         <td>
//                             <button type="button" class = "btn" id="forgetpassword">Click Here</button>
//                         </td>
//                         </tr>
//                         <tr>
//                         <td class="NewUser">New User?  </td>
//                         <td><a href='/Sign'><button type = "button" class = "btn" id="newuser">SignUp</button></a>
//                         </td>
//                         </tr>
//                     </table>
//                 </form>
//             </div>
//             <br></br>
//             <br></br>
//         </center>
//     </div>
//     );

// }

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    }

    const adminData = {
        email:'admin@pah.com'
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(loginData);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8080/userDetails/loginUser", loginData);
                console.log('Login successful:', response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                if(loginData.email === adminData.email)
                {
                    navigate('/admin-dashboard');
                }
                else
                {
                    // navigate('/Home');
                    window.history.back();
                
                }
                window.dispatchEvent(new Event('storage')); // Trigger event manually
            } catch (error) {
                console.error("There was an error logging in!", error);
                alert("Invalid email or password");
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }
        if (!data.password.trim()) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className='LoginEmail'>
            <center>
                <br></br>

                <h1 className="h1">Welcome Back!!!</h1>
                <div id='Content'>
                    <form className="form" onSubmit={handleSubmit}>
                        <table>
                            <tr>
                                <td className="Email">Email : </td>
                                <td>
                                    <input type="email" className="emailInput" placeholder='     Enter your e-mail'
                                        id="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='errormsg'>{errors.email && <span>{errors.email}</span>}</tr>
                            <tr>
                                <td className="Password">Password : </td>
                                <td>
                                    <input type="password" className="PasswordInput" placeholder='     Enter your Password'
                                        id="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='errormsg'>{errors.password && <span>{errors.password}</span>}</tr>
                        </table>
                        <br></br>
                        <button type="submit" className="btn">LogIn</button>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <table>
                            {/* <tr>
                                <td>Forget Password?</td>
                                <td>
                                    <button type="button" className="btn" id="forgetpassword">Click Here</button>
                                </td>
                            </tr> */}
                            <tr>
                                <td className="NewUser">New User?  </td>
                                <td><a href='/Sign'><button type="button" className="btn" id="newuser">SignUp</button></a>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <br></br>
                <br></br>
            </center>
        </div>
    );
}

export default Login;

