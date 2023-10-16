import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineCloudDownload,
  AiOutlineDelete,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import getBlobDuration from "get-blob-duration";
import b64toBlob from "../../utils/fromBase64ToBlob";
import moment from "moment";
import { generateRecordUrl } from "../../services/api";
import Modal from "../Modal/Modal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

export default function TableItem({ record, onDltRecord, downloadRecord }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [audioId, setAudioId] = useState("");

  const audio = new Audio();

  const togglePlay = async (voiceRecord, duration, recordId) => {
    if (!isPlaying) {
      const data = await generateRecordUrl(recordId);
      audio.src = data;

      // const blob = b64toBlob(voiceRecord);
      // duration = duration || (await getBlobDuration(blob));
      // audio.src = URL.createObjectURL(blob);
      const time = duration * 1000;
      setIsPlaying(true);
      await audio.play();
      setTimeout(() => {
        setIsPlaying(false);
        audio.pause();
      }, time);
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };

  const getTimeString = (seconds) => {
    return seconds <= 60
      ? seconds.toFixed(2) + " seconds"
      : (seconds / 60).toFixed(2) + " minutes";
  };
  const date = moment(record.createdAt).format("MMMM Do YYYY, HH:mm:ss");

  const toggleShow = () => {
    setIsShow(!isShow);
  };

  async function handleDelete(id) {
    setModalIsOpen(true);
    setAudioId(id);
  }
  async function onDeleteConfirm() {
    await onDltRecord(audioId);
    setAudioId("");
  }

  useEffect(() => {
    console.log("Playing: ", isPlaying);
  }, [isPlaying, modalIsOpen]);

  return (
    <>
      <tr>
        <td className={"px-5 flex justify-center"}>
          <button
            className={"mr-2"}
            type="button"
            onClick={async () => {
              await togglePlay(
                record.voice_record,
                record.duration || 0,
                record._id
              );
            }}
          >
            {isPlaying ? (
              <AiFillPauseCircle className="w-10 h-10 fill-blue-500  scale-90  animate-pulse" />
            ) : (
              <AiFillPlayCircle className="w-10 h-10  fill-white ease-in-out hover:fill-blue-500 hover:duration-300 hover:scale-90  " />
            )}
          </button>
          <button
            className={
              "bg-green-500 hover:bg-green-700 text-white font-bold p-2  rounded-full m-2 ease-in-out hover:duration-300 hover:scale-90 "
            }
            type="button"
            onClick={() => downloadRecord(record._id)}
          >
            <AiOutlineCloudDownload className="w-5 h-5 fill-white" />
          </button>
        </td>
        <td className="px-5 text-cyan-100">
          {getTimeString(record.duration || 0)}
        </td>
        <td
          className="max-w-[50px]  text-cyan-100 hover:text-blue-500 duration-300 hover:scale-90 truncate cursor-pointer"
          onClick={toggleShow}
        >
          {record.text}
        </td>
        <td>
          <button
            className={
              "bg-red-500 hover:bg-red-700 text-white font-bold p-2  rounded-full m-2 ease-in-out hover:duration-300 hover:scale-90 "
            }
            type="button"
            onClick={async () => {
              await handleDelete(record._id);
            }}
          >
            <AiOutlineDelete className="w-5 h-5 fill-white" />
          </button>
        </td>
        <td className="max-w-[50px]  text-cyan-100  duration-300 hover:scale-90  cursor-pointer">
          {date}
        </td>
      </tr>
      {isShow && (
        <tr>
          <td
            colSpan="4"
            onClick={toggleShow}
            className="px-5 bg-amber-100  rounded"
          >
            {record.text}
          </td>
        </tr>
      )}
      {modalIsOpen && (
        <Modal
          onClose={() => {
            setModalIsOpen(false);
          }}
        >
          <ConfirmModal
            confirm={onDeleteConfirm}
            cancel={() => {
              setModalIsOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
