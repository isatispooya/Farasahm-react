import { useParams, useNavigate } from "react-router-dom";
import { setCookie } from "../componet/cookie/cookie";
import { useEffect } from "react";



const LoginFromSpace = () => {
    const { code } = useParams();
    const Navigate = useNavigate();
    useEffect(() => {
        if (code) {
            setCookie("id", code);
        }
        Navigate("/")
    }, [code])
    
    return (
        <div>
            <h1>لطفا صبر کنید</h1>
        </div>
    )
}

export default LoginFromSpace;