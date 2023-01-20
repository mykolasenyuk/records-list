export default function RecordsTable({ records, onDltRecord }) {
  return (
    <>
      <ul>
        <div>
          <span>ID</span>
          <span>TEXT</span>
          <span>VOICE RECORD</span>
        </div>
        {records &&
          records.map((record) => (
            <li key={record._id}>
              <span>{record._id}</span>
              <p>{record.text}</p>
              <button type="button"> Play</button>
              <button type="button" onClick={() => onDltRecord(record._id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </>
  )
}
