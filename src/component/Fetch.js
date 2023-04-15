import axios from 'axios'

import {useState, useEffect} from 'react'

const getCurrentUserProfile = () => axios.get('/me');

export const FetchData = () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.spotify.com/v1/track?ids=11dFghVXANMlKmJXsNCbNl',
        headers: { 
          'Authorization': 'Bearer BQDJlk8kjBMZ9ZLcDpngdc7cUi7IdetKdvzWZeITtcB6jvsP_7wyHZUrHoXZtW0yheaMZiNTka_C1GL3TubtBZCuW53gIx0dWAcIFLykSA6TWIwrO5dG'
        }
      };
      const [dataTemp, setDataTemp] =  useState("");
    
      useEffect(() => {
        axios.request(config)
        .then((response) => {
          setDataTemp(response.data)
          console.log(JSON.stringify(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
      
      }, [])
      console.log(dataTemp);

      const jsonData  = dataTemp && dataTemp.tracks[0];

      const temp =  Object.entries(jsonData);
      console.log(temp[0])
      return(<div>
        {temp[0]}
      </div>);
    
}