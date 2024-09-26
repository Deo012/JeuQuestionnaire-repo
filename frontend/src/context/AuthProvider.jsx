import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) =>{
    let [id, setID] = useState(0);
    let [name, setName] = useState("");
    let [password,setPassword] = useState("");
    let [age, setAge] = useState(0);
    
    const navigate = useNavigate();

    const loginAction = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/users/findUser", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const res = await response.json();
            console.log("Test: ", res); // res.data.name si 'data' existe dans la réponse

            if (res.name) {
                setName(res.name);
                navigate("/quizPage");
                return;
            }

            throw new Error(res.message);

        } catch (err) {
            console.error(err);
        }
    };

    const logOut = () => {
        setName(null);
        navigate("/connexionPage");
    };

    return (
        <AuthContext.Provider value={{name, password, age, loginAction, logOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () =>{
    return useContext(AuthContext);
};

export default AuthProvider;