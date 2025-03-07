import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = (setIsAuthenticated) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        phone_number: "",
        gender: "",
        date_of_birth: "",
        membership_status: "",
        bio: "",
        address: "",
        profile_picture: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
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
        formData,
        handleInputChange,
        error,
        isLoading,
        handleFormSubmit,
    };
};

export default useSignup;