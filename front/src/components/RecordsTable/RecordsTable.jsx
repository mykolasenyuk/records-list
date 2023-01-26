import { useState ,useEffect} from 'react'
import TableItem from "../TableItem/TableItem";

export default function RecordsTable({ records, onDltRecord ,totalDuration}) {


  return (
    <>
        <hr className={"my-5"}/>
        <p className={"w-full  text-xl text-right text-cyan-100 mb-3"}>Duration: <span className="text-lg text-amber-600">{totalDuration}</span></p>
        <table className="w-full text-center">
            <thead className='text-cyan-200'>
            <tr>
        <th>Audio</th>
          <th>Duration</th>
          <th>Caption</th>
          <th>Controls</th>
            </tr>
        </thead>
        <tbody>
            {records && records.map((record) => (
                <TableItem
                    key={record._id}
                    record={record}
                    onDltRecord={onDltRecord}
                />
            ))}
        </tbody>
      </table>
        <hr className={"my-5"}/>
    </>
  )
}
