import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = (setIsAuthenticated) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const user = await response.json();

        if (!response.ok) {
            setError(user.error);
            setIsLoading(false);
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        setIsLoading(false);
        navigate("/");
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        error,
        isLoading,
        handleFormSubmit,
    };
};

export default useLogin;