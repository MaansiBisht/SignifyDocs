import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../firebase'; // Assuming auth is initialized

const useUserRole = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async (uid, token) => {
            try {
                const response = await fetch(`${process.env.url}/api/users/${uid}/role`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setRole(data.role);
                } else {
                    setRole(null);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
                setRole(null);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const token = await user.getIdToken();
                await fetchUserRole(user.uid, token);
            } else {
                setUser(null);
                setRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        role
    };
};

export default useUserRole;