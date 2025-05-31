import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import RegisteredEventList from '../components/RegisteredEventList'


const Dashboard = () => {

  const { user } = useContext(AppContext)
  const [description, setDescription] = useState('')

  const registerEvent = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target)

      const rawDate = formData.get('date');
      const rawTime = formData.get('time');

      console.log(rawDate,rawTime)

      const formattedDate = new Intl.DateTimeFormat("en-US",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }).format(new Date(rawDate))

      const [hours,minutes]= rawTime.split(":") 
      const formattedtime = new Intl.DateTimeFormat("en-US",{
        hour: "numeric",
        minute: "numeric",
        hour12r: true
      }).format(new Date(0, 0, 0, hours, minutes))


      const payload = {
        title: formData.get("title"),
        description,
        date: formattedDate,
        time: formattedtime,
      }

      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/create-event",
        payload,
        {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )

      const data = await res.data;

      if (data.success){
        toast.success(data.message);
        e.target.reset();
        setDescription("");
      } else {
        toast.error(error.response.data.message)
      }

    } catch (error) {
      toast.error(error.reponse.data.message)
    }

  } 

  return (
    <div>
      {
        user?.role === 'admin' && (
        <form 
          onSubmit={registerEvent}
          className='w-full sm:w-[50vw] mx-auto px-5 grid gap-4 my-10'>
          <Input type="text" placeholder='Title here' id="title"/>
          <textarea className='py-3 text-center rounded-lg w-full 
            bg-gray-100 focus:outline-none focus:border-amber-300 
            focus:ring-1 focus:ring-amber-300 transition-all duration-300 ease-in-out text-gray-700 px-5'
            placeholder="Description Here"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}>
              
          </textarea>
          <Input type='date' id="date"/>
          <Input type='time' id="time"/>
          <Button text="Create New Event"/>
        </form>
      )}
      <RegisteredEventList />
    </div>
  )
}

export default Dashboard