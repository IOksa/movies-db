import {Link} from "react-router-dom";
import styles from "./MovieCard.module.scss";

interface MovieCardProps{
    id: number,
    title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    image?: string;
}

const MovieCard =({id, title, overview, popularity,  release_date, vote_average, vote_count, image = "/movie-thumb.png"}: MovieCardProps)=>{

    return(
        <div className={styles.card}>
            <img className={styles.thumbnail} src={image} alt="Movie thumbnail" />
            <div className={styles.content}>
                <div>
                    <Link to={`/movies/${id}`}>{title}</Link>
                </div>
                <div className={styles.popularity}>{popularity}</div>
                <div className={styles.overview}>{overview} </div>
                <div className={styles.overview}>{release_date} </div>
                <div className={styles.overview}>{vote_average} </div>
                <div className={styles.overview}>{vote_count} </div>
            
            </div>
        </div>
        
        );

}

export default MovieCard;