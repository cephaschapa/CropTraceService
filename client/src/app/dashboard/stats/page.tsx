'use client'
import React, { useEffect, useState } from "react"
import Sidebar from "@/components/Sidebar"
import { API_URL } from "../../../../config";
import { FaBolt, FaCartShopping, FaUserGroup, FaChartBar } from "react-icons/fa6";

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
            <Sidebar selectedPage="Stats" userEmail="admin@test.example" />
            <main className="w-full p-8">
                <header className="h-16 flex items-center w-full mb-[50px]">
                    <FaChartBar size={64} color="#16A34A" className="inline mr-8" />
                    <p className="text-3xl font-bold">Dashboard</p>
                </header>
                <div className="flex space-x-8">
                    <div className="drop-shadow-md rounded-md p-8 back w-1/2 bg-white flex">
                        <FaCartShopping size={64} color="#16A34A" className="inline mr-8" />
                        <div className="inline">
                            <p className="font-bold text-[24px] leading-8">{stats.productCount}</p>
                            <p className="text-gray-500 text-sm">Products in stock</p>
                        </div>
                    </div>
                    <div className="drop-shadow-md rounded-md p-8 back w-1/2 bg-white flex">
                        <FaBolt size={64} color="#16A34A" className="inline mr-8" />
                        <div className="inline">
                            <p className="font-bold text-[24px] leading-8">{stats.farmCount}</p>
                            <p className="text-gray-500 text-sm">Active farms</p>
                        </div>
                    </div>
                    <div className="drop-shadow-md rounded-md p-8 back w-1/2 bg-white flex">
                        <FaUserGroup size={64} color="#16A34A" className="inline mr-8" />
                        <div className="inline">
                            <p className="font-bold text-[24px] leading-8">{stats.userCount}</p>
                            <p className="text-gray-500 text-sm">Active users</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
