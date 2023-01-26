import { useEffect, useState } from 'react'
import { addRecord, dltRecord, fetchRecords } from './services/api'
import AudioRecoder from './components/AudioRecoder/AudioRecoder'
import Header from './components/Header/Header'
import RecordsTable from './components/RecordsTable/RecordsTable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dna } from  'react-loader-spinner'
import getBlobDuration from "get-blob-duration";
export default function App() {
  const [records, setRecords] = useState([])
  const[isLoading,setIsLoading] = useState(false)

  const addVoiceRecord = async ({ text, voice_record,duration }) => {
    await addRecord({ text, voice_record,duration })
  }
  const loading = ()=>{
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
    },2000)
  }

  const handleSubmitRecord = async ({text, voice_record,duration}) => {
    if (records.find((record) => record.text === text)) {
      toast.error(` 🛑 '${text}' is already in your list`)
      return
    }
    if (records.find((record) => record.voice_record === voice_record)) {
      toast.error(`🛑 '${voice_record}' is already in your list`)
      return
    }
    await addVoiceRecord({text, voice_record,duration})
    loading()

    toast.success(`🚀 '${text}' added to record list`)
  }

  const deleteRecord = async (recordId) => {
    await dltRecord(recordId)
    toast(` 👍🏻 Deleted`)
    loading()
  }

  useEffect(() => {
    const fetchData=async()=>{
      const data = await fetchRecords()
      setRecords(data)
      setIsLoading(false)
    }
    fetchData()
  }, [isLoading])
  useEffect(() => {
    loading()
  },[])
  // const getDuration = async () => {
  //   const blob = b64toBlob(voiceRecord)
  //   return await getBlobDuration(blob)
  // }
  return (
      <>
        <div className="container mx-auto p-2">
          <Header />


          {isLoading ? <div className="flex justify-center ">
            <Dna
                visible={true}
                height="150"
                width="150"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />

          </div>: <div> <AudioRecoder onSubmit={handleSubmitRecord} />
            {records && records.length > 0 && (
                <RecordsTable records={records} onDltRecord={deleteRecord} />
            )}</div>}

        </div>
        <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      </>
  )
}
