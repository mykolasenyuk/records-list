import {useNavigate} from "react-router-dom";
import {AiOutlineLogout} from "react-icons/ai";


export default  function Logout () {
    const navigate = useNavigate()
 const handleLogout = ()=>{
     localStorage.removeItem('user')
     navigate('/')
 }


    return(
        <>
        <div className="absolute top-[10px] right-[10px]">
            <button  className={
                'bg-amber-500 hover:bg-amber-700 text-white font-bold p-2  rounded-full m-2 ease-in-out hover:duration-300 hover:scale-90 '
            }
                     type="button"
                     onClick={handleLogout} >
                <AiOutlineLogout className="w-5 h-5 fill-white"/>
            </button>
        </div>
        </>
    )

}