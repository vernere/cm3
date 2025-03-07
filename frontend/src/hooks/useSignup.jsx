import { useState } from 'react';

const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const { username, token } = data;

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify({ username, token }));

            setLoading(false);
            return { username, token };
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Something went wrong');
        }
    };

    return { signup, error, loading };
};

export default useSignup;