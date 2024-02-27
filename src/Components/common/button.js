import './button.css'
import { useNavigate } from "react-router-dom";

export const Button = ({children, path}) => {
    const navigate = useNavigate()
    return (
        <button className="button-arounder" data-testid="button" onClick={()=>{navigate(`/${path}`)}}>
            {children}
        </button>
    )
}
