import { MdCancel, MdDataSaverOn } from "react-icons/md";

export default function SaveCancelBtns({ reset }) {
  return (
    <div className="flex">
      <button
        type="submit"
        className=" flex items-center justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        <MdDataSaverOn className="mr-1" />
        <span>Save</span>
      </button>
      <button
        type="button"
        className="flex items-center justify-between bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded m-2"
        onClick={reset}
      >
        <MdCancel className="mr-1" />
        <span>Cancel</span>
      </button>
    </div>
  );
}
