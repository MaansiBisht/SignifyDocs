import React, { useState, useEffect } from 'react';


const AdminDashboard = ({ user }) => {
    const [userDocuments, setUserDocuments] = useState([]);

    useEffect(() => {
        if (user && user.uid) {
            fetch(`${process.env.url}/api/documents/users`, // get all users document for admin
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

    const handleChangeStatus = (documentId, status) => {
        fetch(`${process.env.url}/api/document/updatestatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            body: JSON.stringify({ documentId, status })
        })
            .then(response => response.json())
            .then(data => {
                // Update the document list
                setUserDocuments(userDocuments.map(doc =>
                    doc._id === documentId ? { ...doc, status: data.updatedStatus } : doc
                ));
            })
            .catch(error => console.error('Error updating document status:', error));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <h2 className="text-xl font-semibold mb-2">Documents</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Current Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Signature</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDocuments && userDocuments.map((doc) => (
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
                                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {doc.premiumsignature ? (
                                        <img
                                            src={doc.premiumsignature}
                                            alt="Signature"
                                            className="w-16 h-auto rounded"
                                        />
                                    ) : (
                                        <span className="text-gray-500 italic">No signature</span>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select
                                        className="w-full border border-gray-300 rounded px-2 py-1"
                                        value={doc.status}
                                        onChange={(e) => handleChangeStatus(doc._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;