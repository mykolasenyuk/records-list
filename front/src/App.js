import { useEffect, useState } from 'react'
import { addRecord, dltRecord, fetchRecords } from './services/api'
import AudioRecoder from './components/AudioRecoder/AudioRecoder'
import Header from './components/Header/Header'
import RecordsTable from './components/RecordsTable/RecordsTable'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Dna } from  'react-loader-spinner'
import Paginate from "./components/Paginate/Paginate";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import RecordsList from "./views/RecordsList";
export default function App() {
  // const [records, setRecords] = useState([])
  // const[isLoading,setIsLoading] = useState(false)
  // const [pageCount, setPageCount]=useState(0)
  // const [page, setPage]=useState(1)
  // const[totalDuration, setTotalDuration]=useState(0)
  //
  // const addVoiceRecord = async ({ text, voice_record,duration }) => {
  //   await addRecord({ text, voice_record,duration })
  // }
  // const loading = ()=>{
  //   setIsLoading(true)
  //   setTimeout(()=>{
  //     setIsLoading(false)
  //   },2000)
  // }
  //
  // const handleSubmitRecord = async ({text, voice_record,duration}) => {
  //   if (records.find((record) => record.text === text)) {
  //     toast.error(` 🛑 '${text}' is already in your list`)
  //     return
  //   }
  //   if (records.find((record) => record.voice_record === voice_record)) {
  //     toast.error(`🛑 '${voice_record}' is already in your list`)
  //     return
  //   }
  //   await addVoiceRecord({text, voice_record,duration})
  //   loading()
  //   toast.success(`🚀 '${text}' added to record list`)
  // }
  //
  // const deleteRecord = async (recordId) => {
  //   await dltRecord(recordId)
  //   toast(` 👍🏻 Deleted`)
  //   loading()
  // }
  // const fetchData=async(page)=>{
  //   const data = await fetchRecords(page)
  //   // console.log(data)
  //   setRecords(data.records)
  //   setPageCount(data.totalPages)
  //   setIsLoading(false)
  //   setTotalDuration(data.totalDuration.total)
  //   // console.log((totalDuration))
  // }
  //
  // const handlePageClick = (event) => {
  //   const newPage = (event.selected +1)
  //   loading()
  //   setPage(newPage)
  //
  // };
  //
  // useEffect(() => {
  //   fetchData(page)
  // }, [isLoading,page])
  //
  // useEffect(() => {
  //   loading()
  // },[])
  return (
      <>
          <Header/>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login/>} />
            <Route path="/records" element={<RecordsList />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        {/*<div className="container mx-auto p-2">*/}
        {/*  <Header />*/}
        {/*  {isLoading ? <div className="flex justify-center ">*/}
        {/*    <Dna*/}
        {/*        visible={true}*/}
        {/*        height="150"*/}
        {/*        width="150"*/}
        {/*        ariaLabel="dna-loading"*/}
        {/*        wrapperStyle={{}}*/}
        {/*        wrapperClass="dna-wrapper"*/}
        {/*    />*/}

        {/*  </div>: <div> <AudioRecoder onSubmit={handleSubmitRecord} />*/}
        {/*    {records && records.length > 0 && (*/}
        {/*        <RecordsTable*/}
        {/*            records={records}*/}
        {/*            onDltRecord={deleteRecord}*/}
        {/*            totalDuration={totalDuration}*/}
        {/*        />*/}
        {/*    )}</div>}*/}

        {/*</div>*/}
        {/*<Paginate*/}
        {/*    handlePageClick={handlePageClick}*/}
        {/*    pageCount={pageCount}*/}
        {/*/>*/}
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
