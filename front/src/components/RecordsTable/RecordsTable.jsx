import { useState ,useEffect} from 'react'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import TableItem from "../TableItem/TableItem";

export default function RecordsTable({ records, onDltRecord }) {
  return (
    <>
      <hr className={'my-5'} />
      <table className="w-full text-center">
        <thead className='text-cyan-200'>
          <th>Audio</th>
          <th>Caption</th>
          <th>Controls</th>
        </thead>
        <tbody>
          {records &&
            records.map((record) => (
                <TableItem
                    key={record._id}
                    record={record}
                    onDltRecord={onDltRecord}
                />
            ))}
        </tbody>
      </table>
      <hr className={'my-5'} />
    </>
  )
}
