import React, { useEffect, useState } from 'react'
import AllUsers from '../AllUsers/AllUsers';
import LivingInLondon from '../LivingInLondon/LivingInLondon';
import "./Api.css";

const Api = () => {
    const [users, setUsers] = useState([])
    const [isLivingInLondon, setIsLivingInLondon] = useState([])

    const url = `https://dwp-techtest.herokuapp.com`;


    const getData = () => {
    fetch(`${url}/users`)
    .then(response => response.json()
    .then(result => setUsers(result))
    .catch(error => console.log(error)))
    }
    
    useEffect(() => {
      getData();
    }, [users])
 
    
      const filterUsers = users.filter((user) => {
        // 51 deg 50 min 72 sec N
        const londonLat = 51 + (30 / 60.0) + (26 / 60.0 / 60.0);
        // 0 deg 12 min 76 sec W
        const londonLon = 0 - (7 / 60.0) - (39 / 60.0 / 60.0);

        const userLat = user.latitude;
        const userLon = user.longitude;

        const p = 0.017453292519943295;    //This is  Math.PI / 180
        const c = Math.cos;
        let a = 0.5 - c((userLat - londonLat) * p)/2 + 
                c(londonLat * p) * c(userLat * p) * 
                (1 - c((userLon - londonLon) * p))/2;
        const earthRadius = 6371; //  Earth distance in km so it will return the distance in km
        let distanceInKm = 2 * earthRadius * Math.asin(Math.sqrt(a)); 
        let miles = distanceInKm / 1.609344; 

        if(miles <= 50){
          return miles
        }
      });

      const filteredUsersJSX = filterUsers.map((user, index) => (
        <AllUsers key={user.id + (index + 1)} userFirstName={user.first_name} userLastName={user.last_name} />
      ))

    const getUsersLivingInLondon = () => {
        fetch(`https://dwp-techtest.herokuapp.com/city/{city}/users`)
        .then(response => response.json()
        .then(result => setIsLivingInLondon(result))
        .catch(error => console.log(error)))
        }
    
        useEffect(() => {
            getUsersLivingInLondon();
          }, [isLivingInLondon])

        const livingInLondonJSX = isLivingInLondon.map((userLivingInLondon, index) => (
          <LivingInLondon key={userLivingInLondon + (index + 1)} userLivingInLondon={userLivingInLondon} />
        ))

        const allUsersJSX = users.map((user, index) => (
          <AllUsers key={user.id + (index + 1)} userFirstName={user.first_name} userLastName={user.last_name} />
        ))

  return (
    <div className='api__data'>
      <div className="filtered__div">
        <h1>List of Users Living 50 miles Within London</h1>
        <div className="filtered__usernames">
          {filteredUsersJSX}
        </div> 
      </div>
      <div className="in__london">
        <h1>List of All Users that Live In London</h1>
        <div className="usernames__in__london">
        {livingInLondonJSX}
        </div> 
      </div>
      <div className="all__users">
        <h1>List of All Users</h1>
        <div className="all__usernames">
        {allUsersJSX}
        </div> 
      </div>
    </div>
  )
}

export default Api