import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { MdDataSaverOn, MdCancel } from "react-icons/md";
import getBlobDuration from "get-blob-duration";
import { AiOutlineCloudUpload } from "react-icons/ai";
import b64toBlob from "../../utils/fromBase64ToBlob";
import SaveCancelBtns from "../SaveCancelBtns.jsx/SaveCancelBtns";

export default function AudioRecoder({ onSubmit }) {
  const [text, setText] = useState("");
  const [voice_record_url, setVoiceRecordUrl] = useState("");
  const [voice_record_blob, setVoiceRecordBlob] = useState("");
  const [duration, setDuration] = useState(0);
  const recorderControls = useAudioRecorder();
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedBase64, setUploadedBase64] = useState("");

  const handleChange = (e) => {
    setText(e.currentTarget.value);
  };
  const onRecording = () => {
    setIsRecording(true);
  };
  const addAudioElement = async (blob) => {
    setVoiceRecordUrl(URL.createObjectURL(blob));
    setVoiceRecordBlob(blob);
    const timeDuration = await getBlobDuration(blob);
    setDuration(timeDuration);
  };
  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  const reset = () => {
    setText("");
    setVoiceRecordUrl("");
    setVoiceRecordBlob("");
    setDuration(0);
    setIsSelected(false);
    setIsRecording(false);
    setSelectedFile(null);
    setUploadedBase64("");
  };
  const changeHandler = async (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    const base = await getBase64(event.target.files[0]);
    setUploadedBase64(base);
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSelected) {
      onSubmit({ text, voice_record: uploadedBase64 }).then(reset);
    } else {
      blobToBase64(voice_record_blob)
        .then((voiceRecordInBase64) => {
          onSubmit({ text, voice_record: voiceRecordInBase64, duration });
        })
        .then(reset);
    }
  };

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
          <div className={"flex"}>
            {!isSelected && (
              <div className={"inline"} onClick={onRecording}>
                <AudioRecorder
                  onRecordingComplete={addAudioElement}
                  recorderControlls={recorderControls}
                />
              </div>
            )}
            {!isRecording && (
              <label
                className="w-10 h-10 bg-blue-500 ml-10 flex  justify-center items-center  shadow-lg shadow-slate-500/50 text-white font-bold rounded-full ease-in-out hover:duration-300 hover:scale-90 "
                htmlFor="inputTag"
              >
                <AiOutlineCloudUpload />
                <input
                  className="hidden"
                  id="inputTag"
                  type="file"
                  onChange={changeHandler}
                />
              </label>
            )}

            {isSelected && (
              <div className="block ml-5 p-2.5 rounded-lg border border-gray-300  text-cyan-200">
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
              </div>
            )}
          </div>
        )}
        {voice_record_url && text.length > 0 && (
          <audio src={voice_record_url} controls></audio>
        )}
        {voice_record_url && text.length > 0 && (
          <SaveCancelBtns reset={reset} />
        )}
        {isSelected && text.length > 0 && <SaveCancelBtns reset={reset} />}
      </form>
    </>
  );
}
