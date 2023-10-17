import { Box, Stack, Typography, Rating } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';


const MovieCard = ({vote, image, title}) => {
    return (
        <Box sx={{cursor: 'pointer'}}>
            <Stack className="movie-item" alignItems={'center'}>
                <img style={{borderRadius: '20px'}} width={200} height={300} src={`https://image.tmdb.org/t/p/original/${image}`} alt="movieImage" />
                <Typography mt={1} sx={{width: '200px', color: 'white'}} align="center" noWrap={true} variant="h5">
                    {title}
                </Typography>
                <Rating color="secondary" name="read-only" precision={0.5} value={vote/2} readOnly emptyIcon={<StarBorderIcon style={{ opacity: 0.3, color: '#e5e5e5'}} fontSize="inherit" />} />
            </Stack>
        </Box>
    );
}
 
export default MovieCard;