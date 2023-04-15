import axios from 'axios'

const getCurrentUserProfile = () => axios.get('/me');

export default getCurrentUserProfile;
// const FetchData = async (props) => {

//     const [user, setUser] = useState(null)
//     const {data} = await axios.get('/me', {
//       headers: {
//         Authorization: `Bearer ${props.token}`
//       },
//       // params: {
//       //     q: searchKey,
//       //     type: "artist"
//       // }
//     })
//     setUser(data)

//     return(
//         <div>
//         {/* {user && ( */}
//             <div>
//                 <h1>{user.display_name}</h1>
//                 <p>{user.followers.total} Followers</p>
//                 {user.images.length && user.images[0].url && (
//                 <img src={user.images[0].url} alt="Avatar"/>
//                 )}
//             </div>
//             {/* )} */}
//         </div>
//     );
//   }

//   export default FetchData;