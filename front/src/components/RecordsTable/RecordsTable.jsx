import {useState} from "react";

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
  return (
    <>
        <hr className={"my-5"}/>
      <table className="w-full text-center">
        <thead>
        <th>Audio</th>
          <th>Caption</th>
          <th>Controls</th>
        </thead>
        <tbody>
            {records && records.map((record) => (
                <tr key={record._id}>
                    <td className={"px-5"}>
                        <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"} type="button" onClick={() => {playVoice(record.voice_record)}}> Play</button>
                    </td>
                    <td className={"px-5"}>{record.text}</td>
                    <td>
                        <button className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"} type="button" onClick={() => onDltRecord(record._id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
        <hr className={"my-5"}/>
    </>
  )
}
