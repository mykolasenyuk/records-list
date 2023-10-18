import { AudioRecorder } from "react-audio-voice-recorder";
import { useEffect } from "react";

export default function Recorder({
  onRecording,
  addAudioElement,
  recorderControls,
  isSaving,
}) {
  useEffect(() => {}, [isSaving]);
  return (
    <div
      className={"inline ease-in-out hover:duration-300 hover:scale-90"}
      onClick={onRecording}
    >
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        recorderControlls={recorderControls}
      />
    </div>
  );
}
