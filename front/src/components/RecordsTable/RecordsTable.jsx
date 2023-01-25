import { useState ,useEffect} from 'react'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import TableItem from "../TableItem/TableItem";

export default function RecordsTable({ records, onDltRecord }) {
    const audio = new Audio();

    const b64toBlob = (b64Data, contentType='audio/webm', sliceSize=512) => {
        const byteCharacters = atob(b64Data.replace('data:audio/webm;codecs=opus;base64,', ''));
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    }
    const playVoice = (voiceRecord) => {
        audio.src = URL.createObjectURL(b64toBlob(voiceRecord))
        audio.play()
    }
    const getTime = () => {
        return records.map(r => r.duration).reduce((a, c) => a + c);
    }
    const getTimeString = (seconds) => {
        return seconds <= 60 ? seconds.toFixed(2) + ' seconds' : (seconds / 60).toFixed(2) + ' minutes'
    }
  return (
    <>
        <hr className={"my-5"}/>
        <p className={"w-full  text-xl text-right text-cyan-100 mb-3"}>Duration: <span className="text-lg text-amber-600">{getTimeString(getTime())}</span></p>
        <table className="w-full text-center">
            <thead className='text-cyan-200'>
            <tr>
        <th>Audio</th>
          <th>Duration</th>
          <th>Caption</th>
          <th>Controls</th>
            </tr>
        </thead>
        <tbody>
            {records && records.map((record) => (
                <TableItem
                    key={record._id}
                    record={record}
                    onDltRecord={onDltRecord}
                />
            ))}
        </tbody>
      </table>
        <hr className={"my-5"}/>
    </>
  )
}
