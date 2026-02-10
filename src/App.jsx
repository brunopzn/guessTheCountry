import { useState } from 'react'
import GuessTheCountry from './Components/guessTheCountry'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GuessTheCountry/>
    </>
  )
}

export default App
