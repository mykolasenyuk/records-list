import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export default function Login () {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleChange = ({ target: { name, value } }) => {
        switch (name) {
            case 'user':
                return setUser(value);
            case 'password':
                return setPassword(value);
            default:
                return;
        }
    };
    const loggedIn = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const auth = window.atob(user).split(':')
        const userName = auth[0];
        const pass = auth[1];
        if (userName == process.env.REACT_APP_USERNAME && pass == process.env.REACT_APP_PASSWORD){
            navigate("/records")
        }
        return
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (user == process.env.REACT_APP_USERNAME && password == process.env.REACT_APP_PASSWORD) {
            const userData = window.btoa(user + ':' + password)
            localStorage.setItem('user', JSON.stringify(userData))
            setUser('');
            setPassword('');
            navigate("/records")
            toast.success(`🚀 Logged in`)
        } if (user !== process.env.REACT_APP_USERNAME && password !== process.env.REACT_APP_PASSWORD) {
            toast.error(`Invalid credentials`)
            return
        }
        if (user !== process.env.REACT_APP_USERNAME){
            toast.error(`Invalid user `)
            return
        }
        if (password !== process.env.REACT_APP_PASSWORD){
            toast.error(`Invalid password `)
            return
        }

    };
    useEffect(()=>{
        loggedIn()
    },[])
    return(
        <>
            <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-[390px] p-[55px] bg-blue-50 rounded-xl" >
                <p className=" text-zinc-900 text-2xl text-center mb-7">Welcome</p>
                <form className="flex flex-col justify-center" onSubmit={handleSubmit}  autoComplete="off">
                    <label >
                        <input
                            className='w-full bg-blue-50 border-b-2 border-b-cyan-700 mb-3 p-2 rounded'
                            placeholder="User"
                            type="text"
                            value={user}
                            name="user"
                            required
                            onChange={handleChange}
                        />
                    </label>
                    <label >
                        <input
                            className='w-full bg-blue-50 border-b-2 border-b-cyan-700 mb-3 p-2 rounded'
                            placeholder="Password"
                            type="password"
                            value={password}
                            name="password"
                            required
                            onChange={handleChange}
                        />
                    </label>

                    <button className="p-4 bg-blue-300 rounded-xl hover:bg-blue-400  hover:scale-95 ease-in-out duration-500 mx-6" type="submit">Login</button>
                </form>
            </div>
        </>
    )

}