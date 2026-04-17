import {useState, useEffect} from 'react';



export default function RemindWatch() {

  const [time, setTime] = useState();

  useEffect(()=> {
    setInterval(()=> {
      const srcData = new Date();

      const hour = srcData.getHours();
      const min = srcData.getMinutes();
      const sec = srcData.getSeconds();

      const currentTime = hour + ':' + min + ':' + sec;
      setTime(currentTime);
    }, 1000);
  }, []);
    


    
  

  return(
      <div>{time}</div>
    )
}