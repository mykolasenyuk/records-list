import TableItem from "../TableItem/TableItem";

export default function RecordsTable({ records, onDltRecord ,totalDuration}) {
  function formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
  
    const formattedHrs = hrs > 0 ? `${hrs}h ` : '';
    const formattedMins = mins > 0 ? `${mins}m ` : '';
    const formattedSecs = secs > 0 ? `${secs}s` : '';
  
    return `${formattedHrs}${formattedMins}${formattedSecs}`.trim();
  }

  return (
    <>
        <hr className={"my-5"}/>
        <p className={"w-full  text-xl text-right text-cyan-100 mb-3"}>Duration: <span className="text-lg text-amber-600">{formatDuration(totalDuration)}</span></p>
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
