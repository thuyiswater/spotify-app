import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import getCurrentUserProfile from "./component/Fetch"

// import FetchData from './component/Fetch';


function App() {

  const CLIENT_ID = "dec7d1ad13e3471482f63080e4c6032a"
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"



  const [token, setToken] = useState("")

  // const [user, setUser] = useState(null)

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    setToken(token)
}, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(token);

    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data);
      } catch(e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  
  

  return (
    <div className="App">
        <header className="App-header">
            <h1>Spotify API</h1>
            {!token ?
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                    to Spotify</a>
                : <button onClick={logout}>Logout</button>}

            {profile && (
                          <div>
                            <h1>{profile.display_name}</h1>
                            <p>{profile.followers.total} Followers</p>
                            {profile.images.length && profile.images[0].url && (
                              <img src={profile.images[0].url} alt="Avatar"/>
                            )}
                          </div>
                        )}
        </header>
    </div>

  );
}

export default App;