import React from 'react'
import './Footer.css'
// import { assets } from '../../assets/assets'
import facebook_icon from '../../assets/facebook_icon.png'
import linkedin_icon from '../../assets/linkedin_icon.png'

const Footer = () => {
    const facebookLinks = [
        import.meta.env.VITE_FACEBOOK_1,
        import.meta.env.VITE_FACEBOOK_2
    ]

    const linkedinLinks = [
        import.meta.env.VITE_LINKEDIN_1,
        import.meta.env.VITE_LINKEDIN_2
    ]

    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <div className='foodo'>Food Faction</div>
                    <p>
                        Food Faction is a modern food delivery platform built to connect
                        communities with delicious meals, fast service, and reliable
                        experiences—crafted with love by passionate creators.
                    </p>
                    <div className="footer-social-icons">
                        {facebookLinks.map((link, index) => (
                            link && (
                                <a key={`fb-${index}`} href={link} target="_blank" rel="noreferrer">
                                    <img src={facebook_icon} alt="Facebook" />
                                </a>
                            )
                        ))}

                        {linkedinLinks.map((link, index) => (
                            link && (
                                <a key={`ln-${index}`} href={link} target="_blank" rel="noreferrer">
                                    <img src={linkedin_icon} alt="LinkedIn" />
                                </a>
                            )
                        ))}
                    </div>
                    {/* <div className="footer-social-icons">

                        <a
                            href={import.meta.env.VITE_FACEBOOK_1 || "#"}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={facebook_icon} alt="Facebook" />
                        </a>

                        <a
                            href={import.meta.env.VITE_LINKEDIN_1 || "#"}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={linkedin_icon} alt="LinkedIn" />
                        </a>

                    </div> */}



                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 8045678120</li>
                        <li>solmonbhaijan@gmail.com</li>
                    </ul>
                </div>

            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2024 &copy; Education - All Right Reserved.
            </p>
        </div>
    )
}

export default Footer