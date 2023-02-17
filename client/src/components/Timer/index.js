import { useEffect } from "react";



export default function Timer({timer, setTimer, respondToTimeout}) {
  
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer===0){
        console.log("Oh no, Time is Up!")
        respondToTimeout()
      }
      setTimer(timer--)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, []) 

  return(
    <p>{timer}</p>
  )
}