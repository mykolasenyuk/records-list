import {AiFillPauseCircle, AiFillPlayCircle,AiOutlineDelete} from "react-icons/ai";
import {useEffect, useState} from "react";


export default  function TableItem({record,onDltRecord}) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShow,setIsShow]=useState(false)

    const audio = new Audio()

    const b64toBlob = (b64Data, contentType = 'audio/webm', sliceSize = 512) => {
        const byteCharacters = atob(
            b64Data.replace('data:audio/webm;codecs=opus;base64,', ''),
        )
        const byteArrays = []

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize)

            const byteNumbers = new Array(slice.length)
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i)
            }

            const byteArray = new Uint8Array(byteNumbers)
            byteArrays.push(byteArray)
        }

        return new Blob(byteArrays, { type: contentType })
    }
    const togglePlay = async (voiceRecord,duration) => {
        audio.src = URL.createObjectURL(b64toBlob(voiceRecord))
        const time = duration * 1000
        if (!isPlaying) {
            setIsPlaying(!isPlaying)
            await audio.play()
            setTimeout(() => {
                setIsPlaying(false)
                audio.pause()
            }, time)
        }
        // else {
        //     audio.pause()
        //     setIsPlaying(!isPlaying)
        //     return;
        // }
    }

    const getTimeString = (seconds) => {
        return seconds <= 60 ? seconds.toFixed(2) + ' seconds' : (seconds / 60).toFixed(2) + ' minutes'
    }
    const playVoice = (voiceRecord) => {
        audio.src = URL.createObjectURL(b64toBlob(voiceRecord))
        audio.play()
        setIsPlaying(!isPlaying)

    }
    const pauseVoice = (voiceRecord) => {
        // audio.src = URL.createObjectURL(b64toBlob(voiceRecord))
        audio.pause()
        setIsPlaying(!isPlaying)

    }
    const toggleShow=()=>{
        setIsShow(!isShow)
    }

    useEffect(() => {
        console.log('Playing: ', isPlaying);
    }, [isPlaying]);

    return(
        <>
        <tr>
            <td className={'px-5'}>
                <button type='button' onClick={()=>{togglePlay(record.voice_record,record.duration)}} >
                    {isPlaying ? <AiFillPauseCircle  className="w-8 h-8 fill-blue-500  scale-90  animate-pulse" />
                        : <AiFillPlayCircle className="w-8 h-8 fill-white ease-in-out hover:fill-blue-500 hover:duration-300 hover:scale-90  "   />}

                </button>

            </td>
            <td className="px-5 text-cyan-100">{getTimeString(record.duration)}</td>
            <td className="max-w-[50px]  text-cyan-100 hover:text-blue-500 duration-300 hover:scale-90 truncate cursor-pointer" onClick={toggleShow}>{record.text}</td>
            <td>
                <button
                    className={
                        'bg-red-500 hover:bg-red-700 text-white font-bold p-2  rounded-full m-2 ease-in-out hover:duration-300 hover:scale-90 '
                    }
                    type="button"
                    onClick={() => onDltRecord(record._id)}
                >
                    <AiOutlineDelete className="w-5 h-5 fill-white " />
                </button>
            </td>
        </tr>
            {isShow &&  <tr>
                <td colSpan="4" onClick={toggleShow} className="px-5 bg-amber-100  rounded">{record.text}</td>
            </tr> }

        </>
    )

}