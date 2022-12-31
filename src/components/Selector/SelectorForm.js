import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';


const SelectorForm = () => {
    const [ sectors, setSectors] = useState([]);
    const [isError, setError] = useState("");
    const [loading, setLoading] = useState(false);

     useEffect(()=>{
       axios.get('https://selector-form-server.vercel.app/sector')
        .then((res)=> setSectors(res.data))
        .catch((error)=> setError(error.message))
    },[]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const sector = form.sector.value;
        const checkbox = form.checkbox.value;

        await fetch('https://selector-form-server.vercel.app/users',{
              method:'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name, sector, checkbox
              })
              .then(res=>res.json())
              .then(result=>{
                console.log(result);
                setLoading(false);
              })
        });
            
        console.log(name, sector, checkbox );
    }

    return (

        <div className='mt-36 mx-10 md:w-1/3 md:ml-96'>
            <h2 className='text-2xl text-center font-semibold my-5'>Please Enter Your Name and Pick the Sectors you are currently involved in.</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">Your Name</label>
                    <input
                     
                     type="name" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                      dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Place Your Name" required/>
                </div>

                <label for="sectors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your Sectors</label>
                <select

                      id="sectors" name="sector" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                      dark:focus:border-blue-500" required>
                   
                      {/* {sectors[0].sectors.map((item, index) => <option key={index}>{item}</option>)} */}
                      
                    
                      
                      <Loading></Loading>
                </select>
               

                  <div className="flex items-start mb-6 mt-5">
                     <div className="flex items-center h-5">
                        <input id="terms" type="checkbox" name='checkbox' value="I agree with the terms and conditions" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required /> 
                     </div>
                     <label for="terms" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the terms and conditions</label>
                 </div>

                 <button type="submit" className="text-white w-1/2 flex items-start bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                         focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 justify-center dark:bg-blue-600
                          dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                 </button> 
       </form>

        
  </div>
    );
};

export default SelectorForm;