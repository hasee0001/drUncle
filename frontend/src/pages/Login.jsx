import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roles: new Set(['Dr']),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'role') {
      console.log('Selected role:', value);
      setFormData((prevData) => ({
        ...prevData,
        roles: new Set([value]),
      }));
    } else {
      console.log('Other input:', name, value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login button clicked');

    try {
      const response = await axios.post('http://localhost:8006/api/auth/signin', {
        username,
        password,
      });

      console.log(response.data);

      const roles = response.data.roles;

      // Use the navigate hook to redirect based on roles
      if (roles.includes('ROLE_ADMIN')) {
        navigate('/admin/dashboard');
      } else if (roles.includes('ROLE_DOCTOR')) {
        navigate('/doctor/profile');
      } else {
        // Redirect to the home page for other roles
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const rolesArray = Array.from(formData.roles);
      console.log('Roles Array:', rolesArray);

      console.log('Complete Signup Request:', {
        username,
        email,
        password,
        roles: Array.from(formData.roles).map(role => role.toUpperCase())
      });


      const response = await axios.post('http://localhost:8006/api/auth/signup', {
        username,
        email,
        password,
        roles: Array.from(formData.roles).map(role => `ROLE_${role.toUpperCase()}`),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response data:', response.data);

      setSignupSuccess(true);
      // Rest of the code for successful signup...
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle signup failure (e.g., show error message to the user)
    }
  };


  const toggleContainer = () => {
    setIsActive(!isActive);
  };

  return (
      <div className={`container ${isActive ? 'active' : ''}`} id="container">
        <div className="form-container sign-in">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-md shadow-lg">
            <button className="bg-blue-700 text-white p-2 rounded-md mb-4">Sign Up</button>
            <div className="social-icons">
              <a href="#" className="icon"><FaGooglePlusG /></a>
              <a href="#" className="icon"><FaFacebookF /></a>
              <a href="#" className="icon"><FaGithub /></a>
              <a href="#" className="icon"><FaLinkedinIn /></a>
            </div>
            <span className="text-black text-sm block mb-4">or use your username password</span>
            <input type="username"
                   placeholder="Username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <a href="#" className="text-black text-sm">Forget Your Password?</a>
            <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded-md cursor-pointer">Sign In</button>
          </form>
        </div>
        <div className="form-container sign-up">
          <form onSubmit={handleSignup} className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Account</h2>
            <div className="social-icons">
              <a href="#" className="icon"><FaGooglePlusG /></a>
              <a href="#" className="icon"><FaFacebookF /></a>
              <a href="#" className="icon"><FaGithub /></a>
              <a href="#" className="icon"><FaLinkedinIn /></a>
            </div>
            <span className="text-black text-sm block mb-4">or use your email for registration</span>
            <input type="text"
                   placeholder="Username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <input type="email"
                   placeholder="Email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <input type="password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <div className="mb-5 role-selection">
              <label htmlFor="role" className="text-[#424242] font-semibold text-[16px] leading-7">
                <h5>Are you a :</h5>
              </label>
              <select
                  id="role"
                  name="role"
                  value={formData.roles.has("Dr") ? "Dr" : formData.roles.has("admin") ? "admin" : "user"}
                  onChange={handleInputChange}
                  className="text-[#424242] font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="Dr">Dr</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded-md cursor-pointer">Sign Up</button>
            {signupSuccess && (
                <div className="success-message text-green-500 mt-4">
                  Sign-up successful! You can now sign in.
                </div>
            )}
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className={`toggle-panel toggle-left ${isActive ? 'active' : ''}`}>
              <h1 className="text-2xl font-bold">Welcome Back!</h1>
              <p className="text-sm">Enter your personal details to use all site features</p>
              <button className="hidden" onClick={toggleContainer}>Sign In</button>
            </div>
            <div className={`toggle-panel toggle-right ${isActive ? '' : 'active'}`}>
              <h1 className="text-2xl font-bold">Hello, Friend!</h1>
              <p className="text-sm">Register with your personal details to use all site features</p>
              <button className="hidden" onClick={toggleContainer}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
