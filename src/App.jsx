import {useState, useEffect} from 'react';



export default function RemindWatch() {

  const [time, setTime] = useState([]);
  const [minute, setMinute] = useState();
  const [isOn, setIsOn] = useState(false);

  useEffect(()=> {
    setInterval(()=> {
      const srcData = new Date();

      const hour = srcData.getHours();
      const min = srcData.getMinutes();
      const sec = srcData.getSeconds();

      setMinute(min);
      setTime([hour, ':', min, ':', sec]);
    }, 1000);

    /*
      1) Every time min changes
      2) console.log() the alert message
    */

   

  }, []);

   const intervalPlay = async () => {
        const audio = new Audio("src/assets/beep.mp3");
        await audio.play();
      }
 

   useEffect(()=> {
    if(!isOn) return; 
      intervalPlay();
    }, [minute]);

  
  
    


    
  

  return(
    <div>
      <h1 className=''>{time}</h1>
      <input type="number" />

      {
        !isOn ? (
          <button onClick={() => setIsOn(true)}>Switch On</button>
        ) : (
          <button onClick={() => setIsOn(false)}>Switch Off</button>
        )
      }
    </div>
    )
}