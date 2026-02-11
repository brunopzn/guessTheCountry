import style from './GuessTheCountry.module.css'
import { useState, useEffect } from 'react';

function GuessTheCountry() {
    const [allCountries, setAllCountries] = useState([])
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chances, setChances] = useState(10);
    const [score, setScore] = useState(0);
    const [userInput, setUserInput] = useState('')
    const [isCorrect, setIsCorrect] = useState('')
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch('https://restcountries.com/v3.1/all?fields=name,flags').then(response => {
            if (!response.ok) {
                throw new Error('Erro: ' + response.status);
            }
            return response.json();
        }).then(data => {
            setAllCountries(data)
            const dataRandom = Math.floor(Math.random() * data.length)
            const countrySelected = data[dataRandom]
            setCountry(countrySelected)
        }).catch(err => {
            console.error(err)
        }).finally(() => {
            setLoading(false)
        })

    }, [])

    const handleChange = (e) => {
        setIsCorrect('')
        setUserInput(e.target.value)

    }

    const handleClick = () => {
        const countryLower = country.name.common.toLowerCase().trim();
        const userInputLower = userInput.toLowerCase().trim();

        if (countryLower === userInputLower) {
            setScore(prevScore => prevScore + 1);
            setChances(prevChances => prevChances - 1)
            setIsCorrect('correct')

        } else {
            setChances(prevChances => prevChances - 1)
            setIsCorrect('incorrect')
        }
        const allCountriesIndex = Math.floor(Math.random() * allCountries.length)
        setCountry(allCountries[allCountriesIndex])
        setUserInput('')

        if (chances <= 1) {
            setIsVisible(true)
        }

    }

    const handleNext = () => {
        const allCountriesIndex = Math.floor(Math.random() * allCountries.length)
        setChances(prevChances => prevChances - 1)
        setCountry(allCountries[allCountriesIndex])
        if (chances <= 1) {
            setIsVisible(true)
        }
    }

    const handleRestart = () => {
        setChances(10)
        setScore(0)
        setIsCorrect('')
        const allCountriesIndex = Math.floor(Math.random() * allCountries.length)
        setCountry(allCountries[allCountriesIndex])
    }


    return (
        <>
            <main>
                {isVisible ? (
                    <div className={style.finalGame}>
                        <h1 className={style.finalGameH1}>The game is over</h1>
                        <p className={style.finalGameH2}>Your Final Score is {score}/10</p>
                        <button onClick={() => { setIsVisible(false) }}>Close</button>
                    </div>
                ) : (
                    null
                )}


                <h1>GUESS THE COUNTRY</h1>
                {loading && <p>Carregando..</p>}
                <div className={style.scoreAndChancesContainer}>
                    <div className={style.scoreBox}>
                        <h3>YOUR SCORE</h3>
                        <h2>{score}</h2>
                    </div>
                    <div className={style.chancesBox}>
                        <h3>CHANCES</h3>
                        <h2>{chances}</h2>
                    </div>
                </div>

                <div className={style.mainContainer}>
                    <div className={style.imgBox}>
                        {country && country.flags && (
                            <img src={country.flags.svg} alt="flags of a country" key={country.name.common} />
                        )}

                    </div>
                    {isCorrect === 'correct' && <p style={{ background: 'green', color: 'white' }}>correct answer</p>}
                    {isCorrect === 'incorrect' && <p style={{ background: 'red', color: 'white' }}>incorrect answer</p>}
                    <input value={userInput} type="text" onChange={handleChange} />

                    <div className={style.buttons}>
                        <button onClick={handleClick}>ANSWER</button>
                        <button onClick={handleNext}>NEXT</button>
                        <button onClick={handleRestart}>RESTART</button>
                    </div>

                </div>
            </main>
        </>
    )
}

export default GuessTheCountry;