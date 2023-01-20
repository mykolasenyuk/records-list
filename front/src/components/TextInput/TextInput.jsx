import { useState } from 'react'
import AudioRecoder from '../AudioRecoder/AudioRecoder'

export default function TextInput({ onSubmit }) {
  const [text, setText] = useState('')
  const [voiceRecord, setVoiceRecord] = useState('')

  const handleChange = (e) => {
    setText(e.currentTarget.value)
  }
  const reset = () => {
    setText('')
    setVoiceRecord('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ text, voiceRecord })
    reset()
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <AudioRecoder />
        <label>Voice record subtitles</label>

        <textarea
          placeholder="text here"
          onChange={handleChange}
          value={text}
        ></textarea>
        <button type="button" onClick={reset}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </form>
    </>
  )
}
