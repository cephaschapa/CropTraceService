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
        <header className="w-[300px] bg-[#16a085] h-[100vh] p-4">
            <div>
                <div className="h-16 w-16 bg-white rounded-full mb-4"/>
                <div className="mb-4 text-white">{userEmail}</div>
                <hr />
            </div>
            <div>
                <ul className="py-10 flex flex-col space-y-3">
                    <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                        <Link href="/dashboard">
                            <MdRedeem size={24} color={selectedPage === 'Products' ? '#FFF' : '#94A3B8'} />
                            <span className={selectedPage === 'Products' ? 'text-white' : 'text-slate-400'}>Products</span>
                        </Link>
                    </li>
                    <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                        <Link href="/dashboard/stats">
                            <MdDashboard size={24} color={selectedPage === 'Stats' ? '#FFF' : '#94A3B8'} />
                            <span className={selectedPage === 'Stats' ? 'text-white' : 'text-slate-400'}>Stats</span>
                        </Link>
                    </li>
                    <li className="text-white flex items-center text-2xl space-x-3 cursor-pointer">
                        <Link href="/dashboard/users">
                            <MdSupervisedUserCircle size={24} color={selectedPage === 'Users' ? '#FFF' : '#94A3B8'} />
                            <span className={selectedPage === 'Users' ? 'text-white' : 'text-slate-400'}>Users</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
