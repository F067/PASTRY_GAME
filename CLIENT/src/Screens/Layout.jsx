import React, { useState, useEffect } from 'react'
import Home from '../Components/Home';
import Navigation from '../Components/navigation';
import Game from '../Components/Game';
import { useSelector } from 'react-redux';
import { callGet } from '../Utils';


function Layout() {

  const user = useSelector((state) => state.user.user);
  const [pastryData, setPastryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resApi = await callGet('/pastry/pastryData');
        if (resApi) {
          setPastryData(resApi);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données depuis le backend :', error.message);
      }
    }
    if (user) {
      fetchData();
    }
  }, [user])

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'
      }}>
        {
          !user ? (
            <Home />)
            :
            (<Game pastryData={pastryData}  />)
        }
      </div>
    </div>
  )
}

export default Layout