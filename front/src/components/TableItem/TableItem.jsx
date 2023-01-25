import {AiFillPauseCircle, AiFillPlayCircle,AiOutlineDelete} from "react-icons/ai";
import {useEffect, useState} from "react";


export default  function TableItem({record,onDltRecord}) {
    const [isPlaying, setIsPlaying] = useState(false)

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

    useEffect(() => {
        console.log('Playing: ', isPlaying);
    }, [isPlaying]);

    return(
        <tr  >
            <td className={'px-5'}>
                <button type='button' onClick={()=>{togglePlay(record.voice_record,record.duration)}} >
                    {isPlaying ? <AiFillPauseCircle  className="w-8 h-8 fill-white hover:fill-red-100" /> : <AiFillPlayCircle className="w-8 h-8 fill-white hover:fill-red-100"   />}

                </button>

            </td>
            <td className="px-5 text-cyan-100">{getTimeString(record.duration)}</td>
            <td className="px-5 text-cyan-100">{record.text}</td>
            <td>
                <button
                    className={
                        'bg-red-500 hover:bg-red-700 text-white font-bold p-2  rounded-full m-2'
                    }
                    type="button"
                    onClick={() => onDltRecord(record._id)}
                >
                    <AiOutlineDelete className="w-5 h-5 fill-white" />
                </button>
            </td>
        </tr>
    )

}