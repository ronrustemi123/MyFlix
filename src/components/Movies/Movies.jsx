import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState, useEffect, useContext } from 'react';
import { DrawerContext } from '../../context/DrawerContext';
import MovieCard from './MovieCard';
import { Box, Stack } from '@mui/material';
import {CircularProgress} from '@mui/material';
import { Link } from 'react-router-dom';
import './Movies.css'
import {Pagination} from '@mui/material';

const Movies = () => {

    const {genreData, categoryData, changeMovies, catLoading, setPage, page} = useContext(DrawerContext)


    const posterCatMovie = categoryData[0]
    const posterGenMovie = genreData[0]

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    return (
        <>  
            {!catLoading ? (
                <>
                    <Box sx={{backgroundColor: 'rgb(18,18,18)'}} height={530} py={3} px={4.5} ml={{sm: 30, xs: 0}} alignItems={'center'}>
                        {changeMovies === 0 ? (
                            <Link to={`movie/${posterCatMovie?.id}`} key={posterCatMovie?.id} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
                                <div className='poster-movie zoom-in' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${posterCatMovie?.backdrop_path})`}}>
                                    <div>
                                        <h1>{posterCatMovie?.title}</h1>
                                        <p>{posterCatMovie?.overview}</p>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Link to={`movie/${posterGenMovie?.id}`} key={posterGenMovie?.id} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
                                <div className='poster-movie zoom-in' style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${posterGenMovie?.backdrop_path})`}}>
                                    <div>
                                        <h1>{posterGenMovie?.title}</h1>
                                        <p>{posterGenMovie?.overview}</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </Box>
                    <Grid2 sx={{backgroundColor: 'rgb(18,18,18)'}} columnSpacing={5} rowSpacing={4} ml={{sm: 30, xs: 0}} mr={0} my={0} justifyContent={'center'}container >
                        {changeMovies === 0 ? (
                            categoryData.map(el => {
                                return (
                                    <Link to={`movie/${el.id}`} key={el.id} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
                                        <Grid2 >
                                            <MovieCard vote={el.vote_average} title={el.title} image={el.poster_path}/>
                                        </Grid2>
                                    </Link>
                                )
                            })
                        ) : (
                            genreData.map(el => {
                                return (
                                    <Link to={`movie/${el.id}`} key={el.id} style={{textDecoration: 'none'}} onClick={() => window.scrollTo(0, 0)}>
                                        <Grid2 >
                                            <MovieCard vote={el.vote_average} title={el.title} image={el.poster_path}/>
                                        </Grid2>
                                    </Link>
                                )
                            })
                        )}
                        <Pagination onClick={() => window.scrollTo(0, 0)} page={page} onChange={handlePageChange} sx={{margin: '2rem 0'}} size='medium' color='error' count={10} shape="rounded" />
                    </Grid2>
                </>
            ) : (
                <Stack sx={{backgroundColor: 'rgb(18,18,18)'}} justifyContent={'center'} alignItems={'center'} height={'100vh'}  ml={{sm: 30, xs: 0}} >
                    <CircularProgress size={'8rem'} />
                </Stack>
            )}
        </>
    );
}
 
export default Movies;