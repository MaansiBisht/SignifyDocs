import React, { useState, useEffect } from 'react';


const UserDashboard = ({ user }) => {
    const [userDocuments, setUserDocuments] = useState([]);

    useEffect(() => {
        if (user && user.uid) {
            fetch(`${process.env.REACT_APP_URL}/api/documents/user/${user.uid}`, //getting only users document
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.accessToken}`
                    },
                }
            )
                .then(response => response.json())
                .then(data => {
                    setUserDocuments(data)
                })
                .catch(error => console.error('Error fetching user documents:', error));
        }
    }, [user]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
            <h2 className="text-xl font-semibold mb-2">Documents</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Current Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDocuments && userDocuments.length > 0 ? (
                            userDocuments.map((doc) => (
                                <tr key={doc.uid} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{doc.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{doc.description}</td>
                                    <td className="border border-gray-300 px-4 py-2 flex items-center">
                                        <span
                                            className={`inline-block w-3 h-3 rounded-full mr-2 ${doc.status === 'pending' ? 'bg-yellow-500' :
                                                    doc.status === 'approved' ? 'bg-green-500' :
                                                        'bg-red-500'
                                                }`}
                                        ></span>
                                        {doc.status}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">No Documents Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default UserDashboard;