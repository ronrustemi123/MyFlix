import { Box, Typography } from "@mui/material";

const CastCard = ({name, char, image}) => {
    return (
        <Box>
            <img width={100} height={120} style={{objectFit: 'cover', borderRadius: '8px'}} src={`https://image.tmdb.org/t/p/w185/${image}`} alt="castProfiles" />
            <Typography noWrap fontSize={14} width={'100px'} color={'white'} variant="subtitle1">{name}</Typography>
            <Typography noWrap fontSize={15} width={'100px'} color={'#A5A5A5'} variant="subtitle1">{char}</Typography>
        </Box>
    );
}
 
export default CastCard;