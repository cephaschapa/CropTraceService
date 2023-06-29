'use client'
import React, { useEffect, useState } from "react"
import { API_URL } from "../../../../config";
import { FaUserGroup } from "react-icons/fa6";
import Sidebar from "@/components/Sidebar"
import Link from "next/link";

export default function StatsPage() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(API_URL + 'auth/users');
            const data = await response.json();
            setUsers(data);
        }
        fetchData();
    }, []);

    return (
        <div className="flex">
            <Sidebar selectedPage="Users" userEmail="admin@test.example" />
            <main className="w-full p-8">
                <header className="h-16 flex items-center w-full mb-[48px] mt-[84px]">
                    <FaUserGroup size={64} color="#16A34A" className="inline mr-8" />
                    <p className="text-3xl font-bold">Users</p>
                </header>
                <ul className="space-y-4">
                    {users.map(user => (
                        <li className="p-4 drop-shadow-lg bg-white rounded-md flex justify-between items-center">
                            <Link href={`/dashboard/users/${user.id}`}>{user.name || 'Anonymous'} ({user.email})</Link>
                            <button className="bg-red-500 text-white rounded-sm p-1">Delete</button>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}

