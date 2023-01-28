import {useEffect, useState} from 'react'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import {MdDataSaverOn, MdCancel} from "react-icons/md";
import getBlobDuration from "get-blob-duration";

export default function AudioRecoder({ onSubmit }) {
  const [text, setText] = useState('')
  const [voice_record_url, setVoiceRecordUrl] = useState('')
  const [voice_record_blob, setVoiceRecordBlob] = useState('')
  const [duration, setDuration] = useState(0)
  const recorderControls = useAudioRecorder()

  const handleChange = (e) => {
    setText(e.currentTarget.value)
  }
  const addAudioElement = async (blob) => {
    setVoiceRecordUrl(URL.createObjectURL(blob))
    setVoiceRecordBlob(blob)
    const timeDuration = await getBlobDuration(blob)
    setDuration(timeDuration)
  }
  const blobUrlToBase64 = blobUrl => {
    return new Promise(resolve => {
      const reader = new FileReader();
      fetch(blobUrl)
        .then(response => response.blob())
        .then(blob => {
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        })
    });
  };
  const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  const reset = () => {
    setText('')
    setVoiceRecordUrl('')
    setVoiceRecordBlob('')
    setDuration(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    blobToBase64(voice_record_blob)
        .then(voiceRecordInBase64 => {
          onSubmit({ text, voice_record: voiceRecordInBase64,duration })
        })
        .then(reset)
  }


  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-2 p-1 text-white ">Voice record subtitles</label>
        <textarea
            placeholder="text here"
            onChange={handleChange}
            className="block mb-5 p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={text}
        ></textarea>
        {!voice_record_url && text.length > 0 && (
            <div className={'inline'}>
              <AudioRecorder
                  onRecordingComplete={addAudioElement}
                  recorderControlls={recorderControls}
              />
            </div>
        )}
        {voice_record_url && text.length > 0 && <audio src={voice_record_url} controls></audio>}
        {voice_record_url && text.length > 0 && (
            <div className='flex'>
              <button
                  type="submit"
                  className=" flex items-center justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
              >
                <MdDataSaverOn className="mr-1"/>
                <span>Save</span>
              </button>
              <button
                  type="button"
                  className="flex items-center justify-between bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2"
                  onClick={reset}
              >
                <MdCancel className="mr-1"/>
                <span>Cancel</span>
              </button>
            </div>
        )}
      </form>
    </>
  )
}
