
import 'react-toastify/dist/ReactToastify.css'
import {addRecord, dltRecord, fetchRecords} from "../services/api";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Header from "../components/Header/Header";
import {Dna} from "react-loader-spinner";
import AudioRecoder from "../components/AudioRecoder/AudioRecoder";
import RecordsTable from "../components/RecordsTable/RecordsTable";
import Paginate from "../components/Paginate/Paginate";
import {useNavigate} from "react-router-dom";
import Logout from "../components/Logout/Logout";
export default function RecordsList( ) {
    const [isLogged,setIsLogged]=useState(false)
    const [records, setRecords] = useState([])
    const[isLoading,setIsLoading] = useState(false)
    const [pageCount, setPageCount]=useState(0)
    const [page, setPage]=useState(1)
    const[totalDuration, setTotalDuration]=useState(0)
    const navigate = useNavigate()

    const addVoiceRecord = async ({ text, voice_record,duration }) => {
        await addRecord({ text, voice_record,duration })
    }
    const logged = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const auth = window.atob(user).split(':')
        const userName = auth[0];
        const pass = auth[1];

        if (userName !== process.env.REACT_APP_USERNAME && pass !== process.env.REACT_APP_PASSWORD){
                    navigate("/")
            setIsLogged(false)
                }
        setIsLogged(!isLogged)
        await fetchData(page)
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
    const fetchData=async(page)=>{
        const data = await fetchRecords(page)
        setRecords(data.records)
        setPageCount(data.totalPages)
        setIsLoading(false)
        setTotalDuration(data.totalDuration.total)

    }

    const handlePageClick = (event) => {
        const newPage = (event.selected +1)
        loading()
        setPage(newPage)

    };

    useEffect(() => {
        logged()
    }, [isLoading,page])

    useEffect(() => {
        loading()
    },[])
    return(
        <>
            <Header/>
            <div className="container mx-auto p-2">

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
                        <RecordsTable
                            records={records}
                            onDltRecord={deleteRecord}
                            totalDuration={totalDuration}
                        />
                    )}</div>}

            </div>
            <Paginate
                handlePageClick={handlePageClick}
                pageCount={pageCount}
            />
            <Logout/>
        </>
        )


}