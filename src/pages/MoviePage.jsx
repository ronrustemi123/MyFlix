import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import { DrawerContext } from "../context/DrawerContext";
import { Stack, CircularProgress, Box, Typography, Rating, Divider } from "@mui/material";
import './MoviePage.css'
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CastCard from "./CastCard";



const MoviePage = () => {

    const pathId = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [movieData, setMovieData] = useState([])

    const {options} = useContext(DrawerContext)

    const getMovieData = async () => {
        setIsLoading(true)
        try {
            const resp = await fetch(`https://api.themoviedb.org/3/movie/${pathId.movieId}?append_to_response=credits`, options);
            const data = await resp.json();
            setMovieData(data)
            setIsLoading(false)
        } catch (err) {
            console.log('Movie Page: ' + err)
        }
    }

    useEffect(() => {
        getMovieData()
    }, [])

    const movieRating = movieData?.vote_average/2;
    const movieCast = movieData?.credits?.cast?.filter(el => el.order < 6); 

    return (
        !isLoading ? (
            <Box ml={{sm: 30, xs: 0}} mr={0}>
                <div className="movie-page-background" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieData?.backdrop_path})`}}>
                    <Grid2 sx={{zIndex: '99', position: 'relative'}} container justifyContent={'center'} spacing={6} >
                        <Grid2 textAlign={'center'} lg={5}>
                            <img width={300} height={450} style={{borderRadius: '10px'}} src={`https://image.tmdb.org/t/p/original/${movieData?.poster_path}`} alt="movieImg" />
                        </Grid2>
                        <Grid2 lg={7}>
                            <Stack direction={'column'} alignItems={"flex-start"} spacing={1}>
                                <Typography fontWeight={500} variant="h4" color={'white'}>{movieData?.title}</Typography>
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
                            <Typography mt={6} fontWeight={500} gutterBottom variant="h4" color={'white'}>Overview</Typography>
                            <Typography paragraph={true} fontWeight={500} color={'white'}>{movieData?.overview}</Typography>
                            <Stack direction={'row'} spacing={2}>
                                <Rating color="secondary" name="read-only" precision={0.25} value={movieData?.vote_average/2} readOnly emptyIcon={<StarBorderIcon style={{ opacity: 0.3, color: '#e5e5e5'}} fontSize="inherit" />} />
                                <Typography color={'white'} fontWeight={500} paragraph={true}>{movieRating.toFixed(1)}/5</Typography>
                            </Stack>
                        </Grid2>
                        <Grid2 spacing={3} p={{sm: 0}} m={0} direction={'row'} container >
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
            </Box>
        ) : (
            <Stack sx={{backgroundColor: 'rgb(18,18,18)'}} justifyContent={'center'} alignItems={'center'} height={'100vh'}  ml={{sm: 30, xs: 0}} >
                    <CircularProgress size={'8rem'} />
            </Stack>
        )
    );
}
 
export default MoviePage;