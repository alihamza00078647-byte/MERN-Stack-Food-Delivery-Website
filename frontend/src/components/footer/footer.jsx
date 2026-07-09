import { assets } from "../../assets/assets";
import "./footer.css";



function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam pariatur repudiandae magni autem, consequatur dignissimos saepe ipsa. Minus fugit commodi nesciunt sint aperiam fuga ab, velit illo. Harum, laudantium voluptate?</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>HOME</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+43 427482 42668</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="footer-copyright">
                Copyright 2026 @ tomato.com - All Right Reserved. 
            </div>
        </div>
    )
}


export default Footer;