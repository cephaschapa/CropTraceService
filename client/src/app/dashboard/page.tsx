'use client'
import React from "react"
import Sidebar from "@/components/Sidebar"

export default function Dashboard () {
    return(
        <div className="flex">
            <Sidebar selectedPage="Products" userEmail="admin@test.example"/>
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
