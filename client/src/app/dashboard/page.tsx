'use client'
import React from "react"
import {MdRedeem, MdDashboard, MdSupervisedUserCircle} from 'react-icons/md'

export default function Dashboard () {
    return(
        <div className="flex">
            <header className="w-[300px] bg-[#16a085] h-[100vh] p-4">
                <div>
                    <div className="h-16 w-16 bg-white rounded-full mb-4"/>
                    <div className="mb-4 text-white">admin@mail.com</div>
                    <hr />
                </div>
                <div>
                    <ul className="py-10 flex flex-col space-y-3">
                        <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                            <MdRedeem size={24}/>
                            <span>Products</span>
                        </li>
                        <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                            <MdDashboard size={24}/>
                            <span>Stats</span>
                        </li>
                        <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                            <MdSupervisedUserCircle size={24}/>
                            <span>Users</span>
                        </li>
                    </ul>
                </div>
            </header>
            <main className="w-full">
                <header className="px-4 h-16 flex items-center border-b border-neutral-500 w-full">
                    <p className="text-3xl">Products</p>
                </header>
                <div className="p-4">
                    <button className="bg-[#16a085] h-10 w-32 text-white rounded-full">Add product</button>
                </div>
                <table className="w-full ml-4">
                    <thead className="border h-16 bg-slate-200 text-left">
                        <th>Batch Number</th>
                        <th>Name</th>
                        <td>Farm Name</td>
                        <th>Farm Location</th>
                        <th>Destination</th>
                        <th>Certification</th>
                        <th>Storage Data</th>
                        <th>Created At</th>
                        <th>Update At</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                       <tr className="border">
                            <td>110000</td>
                            <td>Tomatoes</td>
                            <td>Milan Farms</td>
                            <td>Berlin, DE</td>
                            <td>Lusaka, ZM</td>
                            <td>Certified</td>
                            <td>View data</td>
                            <td>12/12/23</td>
                            <td>12/12/23</td>
                            <td className="flex space-x-4 py-5">
                                <button className="h-10 w-32 bg-yellow-600 text-white rounded-full">Update</button>
                                <button className="h-10 w-32 bg-green-600 text-white rounded-full">Update</button>
                            </td>
                       </tr>
                    </tbody>
                </table>
            </main>
        </div>
    )
}