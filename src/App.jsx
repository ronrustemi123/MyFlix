import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { DrawerContext } from './context/DrawerContext';
import { useState, useEffect } from 'react';
import Movies from './components/Movies/Movies';
import { Routes, Route } from "react-router-dom";
import MoviePage from './pages/MoviePage'


function App() {
  
  const [openDrawer, setOpenDrawer] = useState(false)
  const [category, setCategory] = useState('popular')
  const [genre, setGenre] = useState('')
  
  const [categoryData, setCategoryData] = useState([])
  const [genreData, setGenreData] = useState([])
  const [searchMovie, setSearchMovie] = useState([])
  const [search, setSearch] = useState('')
  const [changeMovies, setChangeMovies] = useState(0)

  const [catLoading, setCatLoading] = useState(true)

  const [page, setPage] = useState(1)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWExNmUzY2NjMGY5ZDlkNWRiYzkwMGU2ZTQ2ZDU1MCIsInN1YiI6IjY1MmIxMGIxMzU4ZGE3MDE0MDZjMzhiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ppMMuCDrBp2G2bi33iRWWu26B6_Vg3QksWUYs13ct0Y'
    }
  };

    const getMovieData = async () => {
      setCatLoading(true)
      try {
        const resp = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`, options)
        const data = await resp.json()
        setCategoryData(data.results)
        setCatLoading(false)
      } catch (error) {
        console.error(error)
      }
  }

  const getGenreData = async () => {
      setCatLoading(true)
      try {
        const resp = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}`, options)
        const data = await resp.json()
        setGenreData(data.results)
        setCatLoading(false)
      } catch (error) {
        console.error(error)
      }
  }


  useEffect(() => {
    changeMovies === 0 ? getMovieData() : changeMovies === 1 ? getGenreData() : null
  }, [category, genre, page])


  return (
    <>
        <DrawerContext.Provider value={{search, setSearch, searchMovie, setSearchMovie, options, page, setPage, genreData,setCatLoading, changeMovies,catLoading, setChangeMovies, categoryData, openDrawer, setOpenDrawer, setCategory, setGenre}}>
            <Sidebar/>
            <Routes>
              <Route path='/' element={<><Navbar show={'block'}/><Movies/></>}/>
              <Route path='/movie'>
                <Route path=':movieId' element={<><Navbar show={'none'}/><MoviePage/></>}/>
              </Route>
            </Routes>
        </DrawerContext.Provider>
    </>
  )
}

export default App
