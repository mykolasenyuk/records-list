import React from "react";

export default function ConfirmModal({ confirm, cancel }) {
  return (
    <>
      <div className={"w-32"}>
        <span className={"text-center text-lg font-bold"}>Are you sure?</span>
        <div className={"flex  justify-between py-4"}>
          <button
            type="button"
            className={
              "text-base w-1/2  mr-2 text-center border-2 truncate   py-2  bg-white whitespace-nowrap rounded-xl ease-in-out duration-300 hover:bg-gray-200 hover:scale-95 "
            }
            onClick={confirm}
          >
            Yes
          </button>
          <button
            className={
              "text-base  w-1/2 text-center border truncate  py-2  bg-white whitespace-nowrap rounded-xl ease-in-out duration-300 hover:bg-red-200 hover:scale-95 "
            }
            type="button"
            onClick={cancel}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
}
