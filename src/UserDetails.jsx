import { useParams } from "react-router-dom";
import Space from "./spaceBox";
import { useEffect, useState } from "react";
import PropType from "prop-types"
import "./styles/UserDetails.css"
import noInternet from "./assets/meta-metadigital.gif"


function UserDetails() {
    const { username } = useParams()
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(true)
    // let data = null
    console.log(username);
    useEffect(() => {
        getUserInfo(username)
            .then((data1) => {
                setData(data1)
                setLoading(false)
                console.log(data1)
            })
            .catch((err) => console.log(err))
    }, [username])

    //Handling Error
    if (data == null) {
        console.log("inside Error if()");
        return (
            <div>
                <Space />
                <div className="ParentAPIBox">
                    <div className="APIError">
                        <div>
                            <img src={noInternet} alt="NO INTERNET" />
                        </div>
                        <p>
                            Maximum Github API Limits reached, try again after 1 hour
                        </p>

                    </div>
                </div>
            </div>
        )
    }


    const UserBox = (
        <div>
            <UserProfile data={data} />
            <Space />
            <UserRepos username={username} />
        </div>
    )



    return (
        <div>
            <Space />
            <div>
                {loading ? (<div className="APIError">Loading</div>) : UserBox}
            </div>
        </div>
    )
}

async function getUserInfo(username) {
    return (
        await fetch(`https://api.github.com/users/${username}`)
            .then((resp) => {
                if (resp.status == 200) {
                    // console.log(resp.json());
                    return resp.json()
                }
            })
            .then((data) => {
                // console.log(data);
                return data
            })
            .catch((err) => console.log("PrErrpr occured", err))
    )
}

function UserProfile({ data }) {
    return (
        <div className="UserParentBox">
            <div className="UserBox">
                <img src={data.avatar_url} alt="Avatar" className="userImage" />
                <div className="NameBox">
                    {data.name}
                </div>
                <div className="FollowersBox">
                    <div>
                        {data.followers} Followers
                    </div>
                    <div>
                        {data.following} following
                    </div>
                </div>
                <div>
                    {data.location}
                </div>

            </div>
        </div>
    )
}



function UserRepos(username) {
    const [repodata, setRepodata] = useState([])
    const [load, setLoad] = useState(true)

    const copyToClipBoard = (text)=>{
        navigator.clipboard.writeText(text)
        .then(()=>alert('Text Copied to Clipboard'))
        .catch(()=>alert('Error copying Text in Clipboard'))
    }


    useEffect(() => {
        // console.log(username);
        setLoad(true)
        fetchRepos(username)
            .then((data) => {
                setRepodata(data)
                console.log(repodata);
                setLoad(false)
            })
            .catch((err) => console.log("err0r", err))
    }, [username])

    const repos = (
        <div className="RepoParentBox">
            <h1 className="RepositoryHeading">
                Repositories: {repodata.length}
            </h1>
            <div className="RepoBox">
                {console.log(repodata)}
                {repodata.map(repo => {
                    return (
                        <div key={repo.id} className="Repo">
                            <div className="RepoNameDescription">
                                <div>
                                    <a href={repo.html_url} className="RepoName">{repo.name}</a>
                                </div>
                                <div className="RepoDescription">
                                    {repo.description}
                                </div>
                                <div>

                                    <ul className="starsBox">
                                        <li>
                                            Created at: {new Date(repo.created_at).toISOString().split('T')[0]}
                                        </li>
                                        <li>
                                            Language: {repo.language}
                                        </li>
                                        <li>
                                            Updated at: {new Date(repo.updated_at).toISOString().split('T')[0]}
                                        </li>
                                        <li>
                                            Stargazers: {repo.stargazers_count}
                                        </li>
                                        <li className="CloneURL">
                                            <button onClick={()=>copyToClipBoard(repo.clone_url)}>Copy Clone URL</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })
                }

            </div>
        </div>
    )

    return (
        <>
            {(repodata != null && load == false) ? repos : (<div>Loading</div>)}
        </>
    )
}

async function fetchRepos(username) {
    console.log(username.username);
    return (
        await fetch(`https://api.github.com/users/${username.username}/repos`)
            .then((resp) => {
                if (resp.status == 200) {
                    // console.log(resp.json());
                    return resp.json()
                }
            })
            .then((data) => {
                console.log(data);
                return data
            })
            .catch((err) => console.log("PrErrpr occured", err))
    )
}

UserProfile.propTypes = {
    data: PropType.json
}

export default UserDetails;