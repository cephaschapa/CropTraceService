'use client'
import React, { useEffect, useState } from "react"
import { API_URL } from "../../../../config";
import { FaBolt, FaCartShopping, FaUserGroup, FaChartBar } from "react-icons/fa6";
import Sidebar from "@/components/Sidebar"

export default function StatsPage() {
    const [stats, setStats] = useState({ userCount: 0, productCount: 0, farmCount: 0 });

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(API_URL + 'stats');
            const data = await response.json();
            setStats(data);
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
            </main>
        </div>
    )
}

