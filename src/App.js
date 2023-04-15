import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import getCurrentUserProfile, { FetchData } from "./component/Fetch"
import { TrackHeader } from './component/TrackHeader';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {}
// import FetchData from './component/Fetch';


function App() {

  const CLIENT_ID = "dec7d1ad13e3471482f63080e4c6032a"
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [data, setData] = useState({})
  

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

  // useEffect(() => {
  //   setToken(token);

  //   const fetchData = async () => {
  //     try {
  //       const { data } = await getCurrentUserProfile();
  //       setProfile(data);
  //     } catch(e) {
  //       console.error(e);
  //     }
  //   };

  //   fetchData();
  // }, []);
  
  let track_id = "567e29TDzLwZwfDuEpGTwo"
  
  
  const [dataPlaylist, setPlaylist] = useState("");
  const [dataTemp, setDataTemp] =  useState("");
  const [isLoading, setIsLoading] = useState(true);
  let temp;
  let artistName;
  let trackName;

  useEffect(() => {
    fetchTrack()

    if(isLoading){
      return (<p>Loading</p>)
    }
  }, [])



  function fetchTrack(){
    //get track
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.spotify.com/v1/tracks/'+track_id,
      headers: { 
        'Authorization': 'Bearer BQDJlk8kjBMZ9ZLcDpngdc7cUi7IdetKdvzWZeITtcB6jvsP_7wyHZUrHoXZtW0yheaMZiNTka_C1GL3TubtBZCuW53gIx0dWAcIFLykSA6TWIwrO5dG'
      }
    };
    
    axios.request(config)
    .then((response) => {
      setDataTemp(response.data)
      setIsLoading(false);
      console.log(JSON.stringify(response.data))
      
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  // console.log(temp.map((ele) => ele))
  if(dataTemp){
    temp = Object.entries(dataTemp);
    artistName = temp[0][1].artists[0].name;
    trackName = temp[11][1];
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
//     <div className="App">
//         <header className="App-header">
//             <h1>Spotify API</h1>
//             {!token ?
//             <div>
//               <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
//                     to Spotify</a>

//             </div>
                
//                 : 
//                 <div>
//                   <button onClick={logout}>Logout</button>
//                 </div>
// }
//             {/* <FetchData/> */}
//             {!isLoading && <TrackHeader trackName={trackName}/>}
            
//             {/* <div>{temp2}</div> */}

//             {/* {profile && (
//                           <div>
//                             <h1>{profile.display_name}</h1>
//                             <p>{profile.followers.total} Followers</p>
//                             {profile.images.length && profile.images[0].url && (
//                               <img src={profile.images[0].url} alt="Avatar"/>
//                             )}
//                           </div>
//                         )} */}
//         </header>
//     </div>

  );
}

export default App;