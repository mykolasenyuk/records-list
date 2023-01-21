import { useState } from 'react'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'

export default function AudioRecoder({ onSubmit }) {
  const [text, setText] = useState('')
  const [voice_record_url, setVoiceRecordUrl] = useState('')
  const [voice_record_blob, setVoiceRecordBlob] = useState('')
  const recorderControls = useAudioRecorder()

  const handleChange = (e) => {
    setText(e.currentTarget.value)
  }
  const addAudioElement = (blob) => {
    setVoiceRecordUrl(URL.createObjectURL(blob))
    setVoiceRecordBlob(blob)
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
    setVoiceRecordUrl(null)
    setVoiceRecordBlob(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    blobToBase64(voice_record_blob)
        .then(voiceRecordInBase64 => {
          onSubmit({ text, voice_record: voiceRecordInBase64 })
        })
        .then(reset)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="mb-5">Voice record subtitles</label>
        <textarea
            placeholder="text here"
            onChange={handleChange}
            className="block mb-5 p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={text}
        ></textarea>
        {!voice_record_url && text.length > 0 && <div className={"inline"}>
          <AudioRecorder
              onRecordingComplete={addAudioElement}
              recorderControls={recorderControls}
          />
        </div>}
        {voice_record_url && <audio src={voice_record_url} controls></audio>}
        {voice_record_url && text.length > 0 && <>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Save</button>
          <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={reset}>
            Cancel
          </button>
        </>}
      </form>
    </>
  )
}
