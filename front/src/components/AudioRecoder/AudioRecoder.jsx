import { useState } from 'react'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'

export default function AudioRecoder({ onSubmit }) {
  const [text, setText] = useState('')
  const [voice_record, setVoiceRecord] = useState('')
  const recorderControls = useAudioRecorder()

  const handleChange = (e) => {
    setText(e.currentTarget.value)
  }
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob)
    const path = 'jdjjdjfjj'
    setVoiceRecord(url)
    console.log(voice_record)
    const audio = document.createElement('audio')
    audio.src = url
    audio.controls = true
    document.body.appendChild(audio)
  }
  const reset = () => {
    setText('')
    setVoiceRecord('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ text, voice_record })
    onSubmit({ text, voice_record })
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <button onClick={recorderControls.stopRecording}>Stop recording</button>
      <button onClick={recorderControls.startRecording}>Start recording</button>
      <button onClick={recorderControls.togglePauseResume}>
        pause recording
      </button> */}
        </div>
        <label>Voice record subtitles</label>

        <textarea
          placeholder="text here"
          onChange={handleChange}
          value={text}
        ></textarea>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          // recorderControls={recorderControls}
        />
        <button type="button" onClick={reset}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
    </>
  )
}
