// import React from "react";
// import { useState } from "react";  
// import { useNavigate } from "react-router-dom";
//     function SignIn()
//     {
//         const [formData,setFormData] = useState({
//             username : '',
//             email:'',
//             mobilenumber:'',
//             password:'',
//             confirmPassword:'',
//             address:'',
//     })

//     const [errors,setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const {name , value} = e.target;
//         setFormData((prevData) => ({...prevData , [name] : value}))
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Perform Validation
//         const validationErrors = validateForm(formData);
//         if(Object.keys(validationErrors).length === 0) {
//             // Submit the form (implement authentication logic here)
//             console.log('Form submitted:' , formData);
//             //alert("Your Account Has Been Created Successfully");
//             navigate('/Home');
//         }
//         else
//         {
//             setErrors(validationErrors);
//         }
//     }

//     const validateForm = (data) => {
//         let errors = {};
//         if(!data.username.trim()) {
//             errors.username = 'Username is required' ;
//         }
//         if(!data.email.trim()){
//             errors.email = 'Email is required';
//         }
//         else if (!isValidEmail(data.email)){
//             errors.email = 'Invalid email format' ;
//         }
//         if(!data.mobilenumber.trim())
//         {
//             errors.mobilenumber = 'Mobile Number is required';
//         }
//         else if (data.mobilenumber.length !== 10 && data.mobilenumber.length !== 12)
//         {
//             errors.mobilenumber = 'Please enter a valid mobile number';
//         }
//         if(!data.password.trim()){
//             errors.password='Password is required';
//         }
//         else if(data.password.length < 6){
//             errors.password = 'Password must be at least 6 characters long';
//         }
//         if(data.password !== data.confirmPassword){
//             errors.confirmPassword = 'Passwords do not match';
//         }

//         return errors;
//     };

//     const isValidEmail = (email) => {
//         //Basic email validation regex
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//         return(
//             <div className="Sign_in">
//                 <center>
//                     <br></br><br></br><br></br><br></br>
//                     <br></br>
//                     <br></br>
//                     {/* <h2 id="sign_in_welcome">Welcome</h2>
//                     <h4 id="request">Please Sign up to Continue</h4> */}
//                     <div class="Content">
//                         <form id="Sign_in_from" onSubmit={handleSubmit}>
//                             <table>
//                                 <tr>
//                                     <td>
//                                         User Name
//                                     </td>
//                                     <td>
//                                     <input type="text" placeholder='Enter your Name'
//                                     id='username'
//                                     name='username'
//                                     value={formData.username}
//                                     onChange={handleChange}
//                                     />
//                                     </td>
//                                 </tr>
//                                 <tr className='errormsg'>{errors.username && <span>{errors.username}</span>}</tr>
//                                 <tr>
//                                     <td>
//                                         E-mail
//                                     </td>
//                                     <td>
//                                         <input type="email" placeholder="Enter your E-mail"
//                                         id="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         />
//                                     </td>
//                                 </tr>
//                                 <tr className='errormsg'>{errors.email && <span>{errors.email}</span>}</tr>
//                                 <tr>
//                                    <td>
//                                     Mobile Number
//                                     </td>
//                                     <td>
//                                         <input type="number" placeholder="Enter your mobile number"
//                                         id="mobilenumber"
//                                         name="mobilenumber"
//                                         value={formData.mobilenumber}
//                                         onChange={handleChange}
//                                         />
//                                     </td>
//                                 </tr>
//                                 <tr className='errormsg'>{errors.mobilenumber && <span>{errors.mobilenumber}</span>}</tr>
//                                 <tr>
//                                     <td>
//                                         Password
//                                     </td>
//                                     <td>
//                                         <input type="password" placeholder='Create a strong password'
//                                         id="password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         />
//                                     </td>
//                                 </tr>
//                                 <tr className='errormsg'>{errors.password && <span>{errors.password}</span>}</tr>
//                                 <tr>
//                                     <td>
//                                         Confirm Password
//                                     </td>
//                                     <td>
//                                         <input type="password" placeholder='Re-Enter your password'
//                                         id="confirmPassword"
//                                         name="confirmPassword"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         />
//                                     </td>
//                                 </tr>
//                                 <tr className='errormsg'>{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</tr>
//                                 <tr>
//                                     <td>
//                                         Address
//                                     </td>
//                                     <td>
//                                         <input placeholder='Enter your address'
//                                         id="address"
//                                         name="address"
//                                         value={formData.address}
//                                         onChange={handleChange}
//                                         />
//                                     </td>
//                                 </tr>
//                             </table>
//                             <br></br>
//                             <hr></hr>
//                             <br></br>
//                             <button className='btn'type="submit">SIGN-UP</button>
//                             <br></br>
//                             <p id='already_a_user'>Alredy a user?
//                             <button className='btn'><a href='/LoginE'>Login in</a></button> </p>
//                             <br></br>
//                             <br></br>
//                         </form>
//                     </div>
//                 </center>
//             </div>
//         )
//     }

// export default SignIn;

// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../Components/Context/UserContext";


// function SignIn() {
//     const { setUser } = useContext(UserContext);
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         mobilenumber: '',
//         password: '',
//         confirmPassword: '',
//         address: '',
//     });

//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const validationErrors = validateForm(formData);
//         if (Object.keys(validationErrors).length === 0) {
//             setUser({
//                 username: formData.username,
//                 email: formData.email,
//                 mobilenumber: formData.mobilenumber,
//                 address: formData.address,
//             });
//             console.log('Form submitted:', formData);
//             navigate('/Home');
//         } else {
//             setErrors(validationErrors);
//         }
//     };

//     const validateForm = (data) => {
//         let errors = {};
//         if (!data.username.trim()) {
//             errors.username = 'Username is required';
//         }
//         if(!data.address.trim())
//         {
//             errors.address="Address is required";
//         }
//         if (!data.email.trim()) {
//             errors.email = 'Email is required';
//         } else if (!isValidEmail(data.email)) {
//             errors.email = 'Invalid email format';
//         }
//         if (!data.mobilenumber.trim()) {
//             errors.mobilenumber = 'Mobile Number is required';
//         } else if (data.mobilenumber.length !== 10 && data.mobilenumber.length !== 12) {
//             errors.mobilenumber = 'Please enter a valid mobile number';
//         }
//         if (!data.password.trim()) {
//             errors.password = 'Password is required';
//         } else if (data.password.length < 6) {
//             errors.password = 'Password must be at least 6 characters long';
//         }
//         if (data.password !== data.confirmPassword) {
//             errors.confirmPassword = 'Passwords do not match';
//         }

//         return errors;
//     };

//     const isValidEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     return (
//         <div className="Sign_in">
//             <center>
//                 <br></br><br></br><br></br><br></br>
//                 <br></br>
//                 <br></br>
//             <h1 class = "h1">Sign Up</h1>
//                 <div class="Content">
//                     <form id="Sign_in_from" onSubmit={handleSubmit}>
//                         <table>
//                             <tr>
//                                 <td>User Name</td>
//                                 <td>
//                                     <input type="text" placeholder='            Enter your Name'
//                                         id='username'
//                                         name='username'
//                                         value={formData.username}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                             </tr>
//                             <tr className='errormsg'>{errors.username && <span>{errors.username}</span>}</tr>
//                             <tr>
//                                 <td>E-mail</td>
//                                 <td>
//                                     <input type="email" placeholder="            Enter your E-mail"
//                                         id="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                             </tr>
//                             <tr className='errormsg'>{errors.email && <span>{errors.email}</span>}</tr>
//                             <tr>
//                                 <td>Mobile Number</td>
//                                 <td>
//                                     <input type="number" placeholder="   Enter your mobile number"
//                                         id="mobilenumber"
//                                         name="mobilenumber"
//                                         value={formData.mobilenumber}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                             </tr>
//                             <tr className='errormsg'>{errors.mobilenumber && <span>{errors.mobilenumber}</span>}</tr>
//                             <tr>
//                                 <td>Password</td>
//                                 <td>
//                                     <input type="password" placeholder='   Create a strong password'
//                                         id="password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                             </tr>
//                             <tr className='errormsg'>{errors.password && <span>{errors.password}</span>}</tr>
//                             <tr>
//                                 <td>Confirm Password</td>
//                                 <td>
//                                     <input type="password" placeholder='     Re-Enter your password'
//                                         id="confirmPassword"
//                                         name="confirmPassword"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                             </tr>
//                             <tr className='errormsg'>{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</tr>
//                             <tr>
//                                 <td>Address</td>
//                                 <td>
//                                     <input placeholder='          Enter your address'
//                                         id="address"
//                                         name="address"
//                                         value={formData.address}
//                                         onChange={handleChange}
//                                     />
//                                 </td>
//                             </tr>
//                             <tr className='errormsg'>{errors.address && <span>{errors.address}</span>}</tr>
//                         </table>
//                         <br></br>
//                         <hr></hr>
//                         <br></br>
//                         <button className='btn' type="submit">SIGN-UP</button>
//                         <br></br>
//                         <p id='already_a_user'>Already a user? 
//                             <button className='btn'><a href='/LoginE'>Login in</a></button> </p>
//                         {/* <br></br> */}
//                         <br></br>
//                     </form>
//                 </div>
//             </center>
//         </div>
//     )
// }

// export default SignIn;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Components/Context/UserContext";

function SignIn() {
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post("http://localhost:8080/userDetails/insertUser", formData);
                console.log('Form submitted:', response.data);
                setUser({
                    username: formData.username,
                    email: formData.email,
                    mobilenumber: formData.phone,
                    address: formData.address,
                });
                alert("Registration Successfull");
                navigate('/LoginE');
            } catch (error) {
                console.error("There was an error registering the user!", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.username.trim()) {
            errors.username = 'Username is required';
        }
        if (!data.address.trim()) {
            errors.address = "Address is required";
        }
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!isValidEmail(data.email)) {
            errors.email = 'Invalid email format';
        }
        if (!data.phone.trim()) {
            errors.phone = 'Mobile Number is required';
        } else if (data.phone.length !== 10 && data.phone.length !== 12) {
            errors.phone = 'Please enter a valid mobile number';
        }
        if (!data.password.trim()) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="Sign_in">
            <center>
                <br></br><br></br><br></br><br></br>
                <br></br>
                <br></br>
                <h1 className="h1">Sign Up</h1>
                <div className="Content">
                    <form id="Sign_in_from" onSubmit={handleSubmit}>
                        <table>
                            <tr>
                                <td>User Name</td>
                                <td>
                                    <input type="text" placeholder='Enter your Name'
                                        id='username'
                                        name='username'
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='errormsg'>{errors.username && <span>{errors.username}</span>}</tr>
                            <tr>
                                <td>E-mail</td>
                                <td>
                                    <input type="email" placeholder="Enter your E-mail"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='errormsg'>{errors.email && <span>{errors.email}</span>}</tr>
                            <tr>
                                <td>Mobile Number</td>
                                <td>
                                    <input type="text" placeholder="Enter your mobile number"
                                        id="mobilenumber"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='errormsg'>{errors.phone && <span>{errors.phone}</span>}</tr>
                            <tr>
                                <td>Password</td>
                                <td>
                                    <input type="password" placeholder='Create a strong password'
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='errormsg'>{errors.password && <span>{errors.password}</span>}</tr>
                            <tr>
                                <td>Confirm Password</td>
                                <td>
                                    <input type="password" placeholder='Re-Enter your password'
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='errormsg'>{errors.confirmPassword && <span>{errors.confirmPassword}</span>}</tr>
                            <tr>
                                <td>Address</td>
                                <td>
                                    <input placeholder='Enter your address'
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className='errormsg'>{errors.address && <span>{errors.address}</span>}</tr>
                        </table>
                        <br></br>
                        <hr></hr>
                        <br></br>
                        <button className='btn' type="submit">SIGN-UP</button>
                        <br></br>
                        <p id='already_a_user'>Already a user? 
                            <button className='btn'><a href='/LoginE'>Login in</a></button> </p>
                        <br></br>
                    </form>
                </div>
            </center>
        </div>
    );
}

export default SignIn;

