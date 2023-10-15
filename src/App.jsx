import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { DrawerContext } from './context/DrawerContext';
import {MovieContext} from './context/MovieContext'
import { useEffect, useState } from 'react';
import Movies from './components/Movies/Movies';


function App() {
  
  const [openDrawer, setOpenDrawer] = useState(false)
  const [data, setData] = useState([])
  const [category, setCategory] = useState('popular')

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWExNmUzY2NjMGY5ZDlkNWRiYzkwMGU2ZTQ2ZDU1MCIsInN1YiI6IjY1MmIxMGIxMzU4ZGE3MDE0MDZjMzhiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ppMMuCDrBp2G2bi33iRWWu26B6_Vg3QksWUYs13ct0Y'
    }
  };

  const getMovieData = async () => {
    try {
      const resp = await fetch(`https://api.themoviedb.org/3/movie/${category}`, options)
      const data = await resp.json()
      setData(data.results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovieData()
  }, [category])

  return (
    <>
      <MovieContext.Provider value={{data}}>
        <DrawerContext.Provider value={{openDrawer, setOpenDrawer, setCategory, category}}>
            <Sidebar/>
            <Navbar/>
            <Movies/>
        </DrawerContext.Provider>
      </MovieContext.Provider>
    </>
  )
}

export default App
