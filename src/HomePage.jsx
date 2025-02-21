import "./styles/HomePage.css"
import Space from "./spaceBox"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

function HomePage(){
    const navigate = useNavigate();
    const [input, setInput] = useState('')

    const redirectUser = ()=>{
        navigate(`/Github-Clone/${input}`)
    }

    const readInput = ()=>setInput(document.getElementById('search').value)
    const enterClickHandler = (e)=>{
        if(e.key == "Enter"){
            redirectUser()
        }
    }
    

    return (
        <div id="WelcomePage">
            <Space/>
            <div className="ContentBox">
                <div className="welcomeText">
                    Welcome to Github Clone
                </div>
                <div className="SearchBox">
                    <div className="InputBox">
                        <input type="text" name="search" id="search" placeholder="Enter your username" onChange={readInput} onKeyDown={(e)=>enterClickHandler(e)}/>
                    </div>
                    <button onClick={redirectUser}>
                        Search
                    </button>
                </div>
                <div className="GithubCloneDescBox">
                    <h1 className="SearchGithubHeading">
                        Search your Github Username
                    </h1>
                    <h1 className="DiscoverYourProfile">
                        Discover your Profile on the Github
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default HomePage