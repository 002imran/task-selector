import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { MdEditCalendar } from "react-icons/md";
import Loading from '../Loading/Loading';

const UserInfo = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        fetch('https://selector-form-server.vercel.app/users')
        .then((res)=> res.json())
        .then((data)=> setUsers(data))
        setLoading(false);
    },[])

    const handleDelete = (id) => {
        const proceed = window.confirm(
            "Are you sure, you want to delete!"
        );
        if (proceed) {
            fetch(`https://selector-form-server.vercel.app/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("users-token")}`,
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert("deleted successfully");
                        const remaining = users.filter((user) => user._id !== id);
                        setUsers(remaining);
                    }
                });
        }
    };

    const handleUpdate = (id) => {
        fetch(`https://selector-form-server.vercel.app/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ status: "Updated" }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = users.filter((user) => user._id !== id);
                    const update = users.find((user) => user._id === id);
                    update.status = "Updateed";

                    const newUsers = [update, ...remaining];
                    setUsers(newUsers);
                }
            });
    };


    return (
        <div className='my-36 mx-10 md:w-1/3 md:ml-96'>
          
             <div className="sm:w-auto w-1/2 relative">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                NAME
                            </th>
                            <th scope="col" className="py-3 px-6">
                                SECTORS
                            </th>
                            <th scope="col" className="py-3 px-6">
                                ACTION
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                           users.map((user,i )=> <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.name}
                            </th>
                            <td className="py-4 px-6">
                                {user.sector}
                            </td>
                            <td className="py-4 px-6 flex text-2xl gap-2">
                                <button onClick={()=> handleDelete(user._id)}>
                                    <MdDelete></MdDelete>
                                </button>
                                <button onClick={()=> handleUpdate(user._id)}>
                                    <MdEditCalendar></MdEditCalendar>
                                </button>
                                <span className='relative'>
                                    {loading ? <Loading /> : ''}
                                </span>
                            </td>
                            
                        </tr> 
                       ) }
                     </tbody>    
                </table>
            </div>

        </div>
    );
};

export default UserInfo;