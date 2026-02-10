import style from './GuessTheCountry.module.css'

function GuessTheCountry() {
    return (
        <>
            <main>
                <h1>GUESS THE COUNTRY</h1>
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

                    </div>

                    <input type="text" />

                    <div className={style.buttons}>
                        <button>ANSWER</button>
                        <button>NEXT</button>

                    </div>
                </div>
            </main>
        </>
    )
}

export default GuessTheCountry;