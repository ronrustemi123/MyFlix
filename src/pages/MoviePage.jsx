import { useParams } from "react-router-dom";



const MoviePage = () => {

    const movieId = useParams()

    return (
        <p style={{marginLeft: '240px'}}>{movieId.movieId}</p>
    );
}
 
export default MoviePage;