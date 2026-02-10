import style from './GuessTheCountry.module.css'
import { useState, useEffect } from 'react';

function GuessTheCountry() {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chances, setChances] = useState(0);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState('')


    useEffect(()=> {
        setLoading(true)
        fetch('https://restcountries.com/v3.1/all?fields=name,flags').then(response => {
            if(!response.ok) {
                throw new Error('Erro: ' + response.status);
            }
            return response.json();
        }).then(data => {
            const dataRandom = Math.floor(Math.random() * data.length)
            const countrySelected = data[dataRandom]
            setCountry(countrySelected)
        }).catch(err=> {
            console.error(err)
        }).finally(() => {
            setLoading(false)
        })

    },[])

    const handleChange = (e) => {
         
        setUserInput(e.target.value)
        
    }

    const handleClick = () => {
        
        if(country.name.common === userInput) {
            return alert('voce acertou')
        } else {
            return alert('voce errou')
        }
    }

    return (
        <>
            <main>
                <h1>GUESS THE COUNTRY</h1>
                {loading && <p>Carregando..</p>}
                <div className={style.scoreAndChancesContainer}>
                    <div className={style.scoreBox}>
                        <h3>YOUR SCORE</h3>
                        <h2>0</h2>
                    </div>
                    <div className={style.chancesBox}>
                       <h3>CHANCES</h3>
                       <h2>0</h2>
                    </div>
                </div>
                
                <div className={style.mainContainer}>
                    <div className={style.imgBox}>
                        {country && country.flags && (
                            <img src={country.flags.svg} alt="flags of a country" key={country.name.common}/>
                        )}
                        
                    </div>

                    <input type="text" onChange={handleChange} />

                    <div className={style.buttons}>
                        <button onClick={handleClick}>ANSWER</button>
                        <button>NEXT</button>

                    </div>
                </div>
            </main>
        </>
    )
}

export default GuessTheCountry;