import { useEffect } from "react"
import {  useLocation, useNavigate } from "react-router-dom"

interface RefreshHandlerProps {
  setIsAuth: (auth: boolean) => void;
}

const RefreshHandler: React.FC<RefreshHandlerProps> = ({ setIsAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();

    useEffect(() => {
      if(localStorage.getItem("token")){
        setIsAuth(true);
        if(location.pathname === '/'|| location.pathname === '/login'|| location.pathname === '/signup'){
            navigate('/home')        
        }
      }
    }, [location,navigate,setIsAuth])
    
  return null
  
}

export default RefreshHandler;