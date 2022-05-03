import React, { useState, useEffect } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const baseUrl = 'https://images.tmdb.org/t/p/original/'

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setmovies] = useState([])
  const [trailerUrl, settrailerUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl)
      setmovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390px',
    width: '100%',
    playervars: {
      autoplay: 1,
    },
  }

  const handleClick = (movies) => {
    if (trailerUrl) {
      settrailerUrl('')
    } else {
      movieTrailer(movies?.name || '')
        .then((url) => {
          const urlparams = new URLSearchParams(new URL(url).search)
          settrailerUrl(urlparams.get('v'))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <div className="row">
      <h5>{title}</h5>
      <div className="row_posters">
        {movies.map((movies) => {
          return (
            <img
              key={movies.id}
              onClick={() => handleClick(movies)}
              className={`row_poster ${isLargeRow && 'row_posterLarge'}  `}
              src={`${baseUrl}${
                isLargeRow ? movies.poster_path : movies.backdrop_path
              }`}
              alt={movies.name}
            />
          )
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
