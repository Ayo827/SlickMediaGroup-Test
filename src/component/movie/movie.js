import React, {useState, useEffect} from 'react';
import './movie.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation'; // Navigation module
import 'swiper/css/pagination'; // Pagination module

export default function Movie(){
    const [movie, setMovie] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>{
        axios({
            method: "post",
            headers: { "Content-Type": "application/json" },
            url: `${process.env.REACT_APP_API_KEY}&type=episode`
        }).then(result => {
            setSearchResult([result.data]);
        })
    }, []);
    useEffect(()=>{
        axios({
            method: "post",
            headers: { "Content-Type": "application/json" },
            url: `${process.env.REACT_APP_API_KEY}&t=${movie}`
        }).then(result => {
            setSearchResult([result.data]);
        })
    }, [movie]);
    return(
        <div className="Movie">
            <div className="Movie__Search">
                <p>Search</p>
                <input type="text" onChange={e=> setMovie(e.target.value) } />
            </div>
            <div className="Movie__List">
            {searchResult.map((result , index) => {
                return (
                    <>
                    <div className='Movie__Genre' key={index}>
                        <p>{result?.Genre}</p>
                    </div>
                    <Swiper
            // install Swiper modules
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={5}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
        {searchResult.map((result, index)=>{
            return ( 
            <SwiperSlide style={{ width: 'fit-content', display: 'flex', justifyContent: 'center' }} key={index}>
            <div className={searchResult?.length >= 1 ? "Movie__Result" : "Movie__Result_Other"}>
                <img src={result?.Poster} alt={result?.Title}/>
                <p>{result?.Title}</p>
            </div>
            </SwiperSlide>
            )
        })}
        </Swiper>
                    </>
                )
            })}
            </div>
        </div>
    )
}