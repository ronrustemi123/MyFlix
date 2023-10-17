import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useState, useEffect, useContext } from 'react';
import { DrawerContext } from '../../context/DrawerContext';
import MovieCard from './MovieCard';
import { Box } from '@mui/material';

const Movies = () => {

    const {genreData, categoryData, changeMovies} = useContext(DrawerContext)


    const posterCatMovie = categoryData.shift()
    const posterGenMovie = genreData.shift()

    return (
        <>  
            <Box sx={{backgroundColor: 'rgb(18,18,18)'}} height={530} py={3} px={4.5} ml={30} alignItems={'center'}>
                {changeMovies === 0 ? <img style={{objectFit: 'cover', borderRadius: '5px'}} width={'100%'} height={'100%'} src={`https://image.tmdb.org/t/p/original/${posterCatMovie?.backdrop_path}`} alt="" /> : <img style={{objectFit: 'cover', borderRadius: '5px'}} width={'100%'} height={'100%'} src={`https://image.tmdb.org/t/p/original/${posterGenMovie?.backdrop_path}`} alt="" />}
            </Box>
            <Grid2 sx={{backgroundColor: 'rgb(18,18,18)'}} columnSpacing={5} rowSpacing={4} ml={{sm: 30, xs: 0}} mr={0} my={0} justifyContent={'center'}container >
                {changeMovies === 0 ? (
                    categoryData.map(el => {
                        return (
                            <Grid2 key={el.id}>
                                <MovieCard vote={el.vote_average} title={el.title} image={el.poster_path}/>
                            </Grid2>
                        )
                    })
                ) : (
                    genreData.map(el => {
                        return (
                            <Grid2 key={el.id}>
                                <MovieCard vote={el.vote_average} title={el.title} image={el.poster_path}/>
                            </Grid2>
                        )
                    })
                )}
            </Grid2>
        </>
    );
}
 
export default Movies;