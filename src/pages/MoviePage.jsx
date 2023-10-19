import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { DrawerContext } from "../context/DrawerContext";
import { Stack, CircularProgress, Box, Typography, Rating, Divider } from "@mui/material";
import './MoviePage.css'
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CastCard from "./CastCard";
import MovieCard from "../components/Movies/MovieCard";


const MoviePage = () => {

    const pathId = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [movieData, setMovieData] = useState([])
    const [recMovie, setRecMovie] = useState([])

    const {options} = useContext(DrawerContext)

    const getMovieData = async () => {
        setIsLoading(true)
        try {
            const resp = await fetch(`https://api.themoviedb.org/3/movie/${pathId.movieId}?append_to_response=credits`, options);
            const resp1 = await fetch(`https://api.themoviedb.org/3/movie/${pathId.movieId}/similar?language=en-US`, options);
            const data = await resp.json();
            const data1 = await resp1.json();
            setMovieData(data)
            setRecMovie(data1)
            setIsLoading(false)
        } catch (err) {
            console.log('Movie Page: ' + err)
        }
    }

    useEffect(() => {
        getMovieData()
    }, [pathId])

    const movieRating = movieData?.vote_average/2;
    const movieCast = movieData?.credits?.cast?.filter(el => el.order < 6); 

    return (
        !isLoading ? (
            <Box  ml={{sm: 30, xs: 0}} mr={0}>
                <div className="movie-page-background" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieData?.backdrop_path})`}}>
                    <Grid2 sx={{zIndex: '99', position: 'relative'}} container justifyContent={'center'} spacing={6} >
                        <Grid2 textAlign={'center'} lg={5}>
                            <img width={300} height={450} style={{borderRadius: '10px'}} src={`https://image.tmdb.org/t/p/original/${movieData?.poster_path}`} alt="movieImg" />
                        </Grid2>
                        <Grid2 lg={7}>
                            <Stack direction={'column'} alignItems={"flex-start"} spacing={1}>
                                <Typography fontWeight={500} variant={"h4"} color={'white'}>{movieData?.title}</Typography>
                                <Typography gutterBottom variant="subtitle2" sx={{fontStyle: 'italic'}} color={'#A5A5A5'}>{movieData?.tagline}</Typography>
                                <Stack alignItems={'flex-start'} direction={{sm: 'row', xs: 'column'}} spacing={{sm: 1, xs: 0}}  justifyContent={'flex-start'}>
                                    <Typography variant="subtitle2" noWrap sx={{fontStyle: 'italic'}} color={'#A5A5A5'}>{movieData?.release_date}</Typography>
                                    <Divider orientation="vertical" sx={{borderColor: '#564d4d'}} flexItem={true}/>
                                    <Stack alignItems={'flex-end'} direction={'row'}>
                                        {movieData?.genres.map((el, i) => {
                                            return  <Typography key={el.id} variant="subtitle2" sx={{fontStyle: 'italic'}} color={'#A5A5A5'}>{(i ? ', ' : '') + el.name}</Typography> 
                                        })}
                                    </Stack>
                                    <Divider orientation="vertical" sx={{borderColor: '#564d4d'}} flexItem={true}/>
                                    <Typography variant="subtitle2" sx={{fontStyle: 'italic'}} color={'#A5A5A5'}>{movieData?.runtime}m</Typography>
                                </Stack>
                            </Stack>
                            <Typography mt={6} fontWeight={500} gutterBottom variant="h5" color={'white'}>Overview</Typography>
                            <Typography paragraph={true} fontWeight={400} color={'white'}>{movieData?.overview}</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <Rating color="secondary" name="read-only" precision={0.25} value={movieData?.vote_average/2} readOnly emptyIcon={<StarBorderIcon style={{ opacity: 0.3, color: '#e5e5e5'}} fontSize="inherit" />} />
                                <Typography color={'white'} fontWeight={500} paragraph={true}>{movieRating.toFixed(1)}/5</Typography>
                            </Stack>
                        </Grid2>
                        <Grid2 spacing={3} p={{sm: 0}} m={0} mt={5} mb={5} direction={'row'} container >
                            {movieCast.map(el => {
                                return (
                                    <Grid2 key={el.id}>
                                        <CastCard name={el.name} char={el.character} image={el.profile_path}/>
                                    </Grid2>
                                )
                            })}
                        </Grid2>
                    </Grid2>
                </div>
                <Box sx={{backgroundImage: 'linear-gradient(180deg, rgba(0,0,0, 1) 0%, rgba(18,18,18) 30%)'}} m={0}>
                    <Grid2  p={0} m={0} container xs={12} justifyContent={'center'}>
                        <Typography variant="h3" color={'white'} textAlign={'center'}>You might also like</Typography>
                    </Grid2>
                    <Grid2 m={0} p={0} mt={3} fontWeight={500} justifyContent={'center'} spacing={6} xs={12} container>
                        {recMovie?.results.map(el => {
                            return (
                                <Link onClick={() => window.scrollTo(0, 0)} key={el.id} to={`/movie/${el.id}`} style={{textDecoration: 'none'}}>
                                    <Grid2>
                                        <MovieCard vote={el.vote_average} title={el.title} image={el.poster_path}/>
                                    </Grid2>
                                </Link>
                            )
                        })}
                    </Grid2>
                </Box>
            </Box>
        ) : (
            <Stack sx={{backgroundColor: 'rgb(18,18,18)'}} justifyContent={'center'} alignItems={'center'} height={'100vh'}  ml={{sm: 30, xs: 0}} >
                    <CircularProgress size={'8rem'} />
            </Stack>
        )
    );
}
 
export default MoviePage;