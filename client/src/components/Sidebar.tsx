import Link from "next/link";
import React from "react";
import {MdRedeem, MdDashboard, MdSupervisedUserCircle} from 'react-icons/md';

interface SidebarProps {
    userEmail: String;
    selectedPage: 'Products' | 'Stats' | 'Users';
}

export default function Sidebar(props: SidebarProps) {
    const { userEmail, selectedPage } = props;
    return (
        <header className="w-[300px] bg-[#16A34A] h-[100vh] p-4">
            <div>
                <div className="h-16 w-16 bg-white rounded-full mb-4"/>
                <div className="mb-4 text-white">{userEmail}</div>
                <hr />
            </div>
            <div>
                <ul className="py-10 flex flex-col space-y-3">
                    <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                        <Link href="/dashboard" className="flex space-x-2 items-center">
                            <MdRedeem size={24} color={selectedPage === 'Products' ? '#FFF' : '#E2E8F0'} />
                            <span className={selectedPage === 'Products' ? 'text-white' : 'text-slate-200'}>Products</span>
                        </Link>
                    </li>
                    <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                        <Link href="/dashboard/stats" className="flex space-x-2 items-center">
                            <MdDashboard size={24} color={selectedPage === 'Stats' ? '#FFF' : '#E2E8F0'} />
                            <span className={selectedPage === 'Stats' ? 'text-white' : 'text-slate-200'}>Stats</span>
                        </Link>
                    </li>
                    <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                        <Link href="/dashboard/users" className="flex space-x-2 items-center">
                            <MdSupervisedUserCircle size={24} color={selectedPage === 'Users' ? '#FFF' : '#E2E8F0'} />
                            <span className={selectedPage === 'Users' ? 'text-white' : 'text-slate-200'}>Users</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
