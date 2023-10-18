import { useEffect, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { MdDataSaverOn, MdCancel } from "react-icons/md";
import getBlobDuration from "get-blob-duration";
import { AiOutlineCloudUpload } from "react-icons/ai";
import b64toBlob from "../../utils/fromBase64ToBlob";
import SaveCancelBtns from "../SaveCancelBtns.jsx/SaveCancelBtns";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import { logDOM } from "@testing-library/react";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [wordsPerChunk, setWordsPerChunk] = useState(5);
  const [savedChunks, setSavedChunks] = useState([]);
  const [editedChunk, setEditedChunk] = useState("");
  let [count, setCount] = useState(0);

  const splitTextIntoChunks = (text, chunkSize) => {
    const words = text.split(" ");

    let array = words
      .reduce((acc, word, i) => {
        if (i % chunkSize === 0) acc.push([word]);
        else acc[acc.length - 1].push(word);
        return acc;
      }, [])
      .map((item) => item.join(" "));
    return array;
  };

  const chunks = splitTextIntoChunks(text, wordsPerChunk);

  const replaceChunk = (newItem) => {
    setSavedChunks((prevArr) => {
      const index = prevArr.indexOf(editedChunk);
      if (index !== -1) {
        const newArr = [...prevArr];
        newArr[index] = newItem;
        return newArr;
      }
      return prevArr;
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "text":
        setText(value);
        const wordsArr = value.split(" ");

        if (wordsArr.length >= wordsPerChunk) {
          setModalIsOpen(true);
        }
        break;
      case "wordsPerChunk":
        if (!value) {
          setWordsPerChunk(1);
        } else {
          setWordsPerChunk(Number(value));
        }
        break;
      case "chunk":
        replaceChunk(value);
        break;
    }
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
  const onSlit = () => {
    setSavedChunks(chunks);
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stringFromChunks =
      savedChunks.length > 0 ? savedChunks.join(" ") : "";

    if (isSelected) {
      onSubmit({
        text: stringFromChunks ? stringFromChunks : text,
        voice_record: uploadedBase64,
      }).then(reset);
    } else {
      blobToBase64(voice_record_blob)
        .then((voiceRecordInBase64) => {
          onSubmit({
            text: stringFromChunks ? stringFromChunks : text,
            voice_record: voiceRecordInBase64,
            duration,
          });
        })
        .then(reset);
    }
  };
  const onNextClick = () => {
    if (savedChunks.length === count) {
      return;
    }
    if (savedChunks.length - 1 > count) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const onPrevClick = () => {
    if (count === 0) {
      return;
    }
    setCount((prevCount) => prevCount - 1);
  };
  const onClearChunk = () => {
    replaceChunk("");
  };

  useEffect(() => {
    setEditedChunk(savedChunks[count]);
  }, [savedChunks, count]);

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="mb-2 p-1 text-white ">Voice record subtitles</label>
        {savedChunks.length > 0 ? (
          <div>
            <textarea
              name={"chunk"}
              placeholder="text here"
              onChange={handleChange}
              className="block mb-5 p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={editedChunk}
            ></textarea>
            <div className={"flex justify-end items-center"}>
              <button
                type={"button"}
                className={
                  "w-16 p-2 rounded-xl mx-2 bg-gray-500 ease-in-out hover:duration-300 hover:scale-90 hover:bg-gray-600"
                }
                onClick={onPrevClick}
              >
                Prev
              </button>
              <div className={"w-12 p-2 flex justify-between"}>
                <span>{count + 1}</span>/<span>{savedChunks.length}</span>
              </div>
              <button
                type={"button"}
                className={
                  "w-16 p-2 rounded-xl mx-2 bg-gray-500 ease-in-out hover:duration-300 hover:scale-90 hover:bg-gray-600"
                }
                onClick={onNextClick}
              >
                Next
              </button>
              <button
                type={"button"}
                className={
                  "w-16 p-2 rounded-xl mx-2 bg-gray-500 ease-in-out hover:duration-300 hover:scale-90 hover:bg-amber-700"
                }
                onClick={onClearChunk}
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <textarea
            name={"text"}
            placeholder="text here"
            onChange={handleChange}
            className="block mb-5 p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={text}
          ></textarea>
        )}

        {!voice_record_url && text.length > 0 && (
          <div className={"flex"}>
            {!isSelected && (
              <div
                className={
                  "inline ease-in-out hover:duration-300 hover:scale-90"
                }
                onClick={onRecording}
              >
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
      {modalIsOpen && (
        <Modal
          style={"bg-gray-200"}
          onClose={() => {
            setModalIsOpen(false);
          }}
        >
          <div className={"bg-gray-200 rounded-xl p-2"}>
            <label className="mb-2 p-1 text-lg ">Voice record subtitles</label>
            <textarea
              name={"text"}
              placeholder="text here"
              onChange={handleChange}
              className="block mb-5 p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={text}
            ></textarea>
            <Input
              name={"wordsPerChunk"}
              inputClass={
                "w-full bg-white border text-base h-8 px-3 rounded-xl"
              }
              type={"number"}
              min={1}
              onChange={handleChange}
              value={wordsPerChunk}
              required={true}
              isSubmitted={""}
            />
            <div className={"overflow-y-auto  max-h-96"}>
              {chunks.map((chunk, index) => (
                <p key={index} className={"p-2"}>
                  <span>{index + 1}</span>: {chunk}
                </p>
              ))}
            </div>
            <div className={" flex justify-between"}>
              <button
                type="button"
                onClick={onSlit}
                className={
                  "text-base  mr-2 text-center border-2 truncate w-1/2 py-2  bg-white whitespace-nowrap rounded-xl ease-in-out duration-300 hover:bg-gray-200 hover:scale-95 "
                }
              >
                Split
              </button>
              <button
                className={
                  "text-base text-center border truncate  py-2 w-1/2   bg-white whitespace-nowrap rounded-xl ease-in-out duration-300 hover:bg-red-200 hover:scale-95 "
                }
                type="button"
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
