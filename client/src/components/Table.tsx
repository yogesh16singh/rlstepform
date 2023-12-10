import React, { useState } from 'react';

interface User {
    name: string;
    email: string;
    phoneNumber: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    submittedAt: string;
}

interface Props {
    users: User[];
}

const UserTable: React.FC<Props> = (users) => {
    const [startDate, setStartDate] = useState("2023-01-01");
    const [endDate, setEndDate] = useState("2023-12-30");
    const handleStartDateChange = (event: any) => {
        setStartDate(event.target.value);
    };
    const handleEndDateChange = (event: any) => {
        setEndDate(event.target.value);
    };
    console.log("staartdate", startDate);
    console.log("enddate", endDate);
    console.log('user', users.users);
    return (<>
        <div className='end-0'>
            <input value={startDate}
                onChange={handleStartDateChange}
                id="statdateInput" type="date" className="mt-1 p-2 border cursor-pointer rounded-md focus:outline-none hover:border-blue-500" />

            <input
                value={endDate}
                onChange={handleEndDateChange}
                id="enddateInput" type="date" className="mt-1 p-2 border cursor-pointer rounded-md focus:outline-none hover:border-blue-500" />
        </div>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th className="border-b p-2 dark:text-black">Name</th>
                    <th className="border-b p-2 dark:text-black">Email</th>
                    <th className="border-b p-2 dark:text-black">Phone Number</th>
                    <th className="border-b p-2 dark:text-black">Address Line 1</th>
                    <th className="border-b p-2 dark:text-black">Address Line 2</th>
                    <th className="border-b p-2 dark:text-black">City</th>
                    <th className="border-b p-2 dark:text-black">State</th>
                    <th className="border-b p-2 dark:text-black">Pincode</th>
                    <th className="border-b p-2 dark:text-black">Country</th>
                    <th className="border-b p-2 dark:text-black">Submitted At</th>
                </tr>
            </thead>
            <tbody>
                {users.users.filter((user: any) => {
                    let createdDat = new Date(user.createdAt);
                    let startDat = new Date(startDate);
                    let endDat = new Date(endDate);
                    return (createdDat >= startDat &&
                        createdDat <= endDat);
                }).
                    map((user: any, index: any) => {
                        let date = new Date(user.createdAt);
                        console.log("dte", typeof (date))
                        return <tr key={index} className='border hover:border-red-400'>
                            <td className="border-b p-2 dark:text-black">{user.name}</td>
                            <td className="border-b p-2 dark:text-black">{user.email}</td>
                            <td className="border-b p-2 dark:text-black">{user.phoneNumber}</td>
                            <td className="border-b p-2 dark:text-black">{user.line1}</td>
                            <td className="border-b p-2 dark:text-black">{user.line2 || '-'}</td>
                            <td className="border-b p-2 dark:text-black">{user.city}</td>
                            <td className="border-b p-2 dark:text-black">{user.state}</td>
                            <td className="border-b p-2 dark:text-black">{user.pincode}</td>
                            <td className="border-b p-2 dark:text-black">{user.country}</td>
                            <td className="border-b p-2 dark:text-black">{date.toLocaleDateString()}</td>
                        </tr>
                    })}
            </tbody>
        </table>
    </>
    );
};

export default UserTable;
