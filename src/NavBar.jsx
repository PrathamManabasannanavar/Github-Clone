import { Link } from 'react-router-dom';
import githubIcon from "./assets/github-logo.png"
import "./styles/NavBar.css"

function NavBar() {
    return (
        <div className="NavBox">
            <div className="ImageBox">
                {/* <div> */}
                <img src={githubIcon} alt="Github Icon" id='imageURL'/>
                {/* </div> */}
                <div>
                    Github Clone
                </div>
            </div>

            <div className="NavCompBox">
                <div>
                    <Link to="/Github-Clone/" className='NavEle'>Home</Link>
                </div>
                <div>
                    <Link to="/Github-Clone/contact" className='NavEle'>Contact us</Link>
                </div>
                <div>
                    <Link to="/Github-Clone/support" className='NavEle'>Support</Link>
                </div>
            </div>
        </div>
    );
}


export default NavBar;