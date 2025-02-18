import { useEffect, useState } from "react";
import { User } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

export const useUser = () => {

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => { await getUser() })()
    },[]);

    
    const getUser = async () => {
        try{
            console.log(API_URL);
            const randomUserId = Math.floor(Math.random() * 3) + 1;
            const response: any = await fetch(`${API_URL}/users/${randomUserId}`);
            const user = await response.json(); 
            setUser(user);
        }
        catch(error){
            console.log("Error fetching user", error);
        }
        finally{
            setLoading(false);
        }
    }

    return {user, loading};
}