import { assets } from "../../assets/assets";
import "./navbar.css"
import {Link} from "react-router-dom"


function Navbar(){
    return (
        <div className="navbar">
            <img className="logo" src={assets.logo} alt="" />
            <Link to="/">  
                <img className="profile" src={assets.profile_image} alt="" />
            </Link>
        </div>
    )
}



export default Navbar;