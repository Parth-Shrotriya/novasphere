import React from 'react'
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Signup = () => {


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData(e.target);

      const payload = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password')
      }
      
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`, 
        payload
      );
      const data = await res.data;
      if(data.success) {
        toast.success(data.message);
        e.target.reset();
        navigate('/login');
      } else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <form 
        onSubmit={handleSubmit} 
        className='sm:w-[50vw] mx-auto px-5 h-[80vh] flex flex-col justify-center gap-4'>
        <div className='flex gap-4'>
          <Input id='firstName' type='text' placeholder='First Name Here'/>
          <Input id='lastName' type='text' placeholder='Last Name Here'/>
        </div>
        <Input id='email' type='email' placeholder='Email Here'/>
        <div className='flex flex-col sm:flex-row gap-4'>
          <Input id='password' type='password' placeholder='Password Here'/>
          <Button text='Create Account'/>
        </div>
      </form>
    </div>
  )
}

export default Signup