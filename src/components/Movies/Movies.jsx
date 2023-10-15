import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { MovieContext } from '../../context/MovieContext';
import { useContext } from 'react';

const Movies = () => {

    const {data} = useContext(MovieContext)


    return (
        <>
            <Grid2 container>
                
            </Grid2>
        </>
    );
}
 
export default Movies;