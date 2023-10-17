import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { DrawerContext } from './context/DrawerContext';
import { useState, useEffect } from 'react';
import Movies from './components/Movies/Movies';


function App() {
  
  const [openDrawer, setOpenDrawer] = useState(false)
  const [category, setCategory] = useState('popular')
  const [genre, setGenre] = useState('')
  
  const [categoryData, setCategoryData] = useState([])
  const [genreData, setGenreData] = useState([])
  const [changeMovies, setChangeMovies] = useState(0)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWExNmUzY2NjMGY5ZDlkNWRiYzkwMGU2ZTQ2ZDU1MCIsInN1YiI6IjY1MmIxMGIxMzU4ZGE3MDE0MDZjMzhiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ppMMuCDrBp2G2bi33iRWWu26B6_Vg3QksWUYs13ct0Y'
    }
  };

    const getMovieData = async () => {
      try {
      const resp = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
      const data = await resp.json()
      setCategoryData(data.results)
      } catch (error) {
      console.error(error)
      }
  }

  const getGenreData = async () => {
      try {
      const resp = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}`, options)
      const data = await resp.json()
      setGenreData(data.results)
      } catch (error) {
      console.error(error)
      }
  }


  useEffect(() => {
    changeMovies === 0 ? getMovieData() : getGenreData()
  }, [category, genre])


  return (
    <>
        <DrawerContext.Provider value={{genreData, changeMovies, setChangeMovies, categoryData, openDrawer, setOpenDrawer, setCategory, setGenre}}>
            <Sidebar/>
            <Navbar/>
            <Movies/>
        </DrawerContext.Provider>
    </>
  )
}

export default App
