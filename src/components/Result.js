import React from 'react'

function Result({ result, openPopUp }) {

    console.log(openPopUp)

    return (
        <div className='result' onClick={() => openPopUp(result.imdbID)}>
            <img src={result.Poster}/>
            <h3>{result.Title}</h3>
        </div>
    )
}

export default Result


//onClick={()=>(openPopUp(result.imdbID))}
