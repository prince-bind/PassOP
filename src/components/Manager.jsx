import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = (e) => {
        e.preventDefault()
        setPasswordArray([...passwordArray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        setform({ site: "", username: "", password: "" })
    }

    const showPassword = () => {

        if (ref.current.src.includes("/show.png")) {
            ref.current.src = "/hide.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "/show.png"
            passwordRef.current.type = "password"
        }
    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const editPassword = (index) => {
        setform(passwordArray.filter((val, i) => i === index)[0])
        setPasswordArray(passwordArray.filter((val, i) => i != index))
    }

    const deletePassword = (index) => {
        let c = confirm("Do you really want to delete ?")
        if (c) {
            setPasswordArray(passwordArray.filter((val, i) => {
                return i != index
            }))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((val, i) => i != index)))
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="md:mycontainer p-2">
                <h1 className='text-4xl text text-center'><span className="font-bold text-green-700">&lt;</span><span className="font-bold text-black">Pass</span><span className="font-bold text-green-700">OP/&gt;</span></h1>
                <p className="text-center text-lg text-green-900">Your own Password Manager</p>
                <form onSubmit={savePassword} className="text-black flex flex-col p-2 gap-5 items-center">
                    <input value={form.site} onChange={handleChange} className="rounded-full border border-green-500 w-full px-4 py-2" type="text" placeholder="Enter Website URL" name="site" id="site" required/>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-5">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-2' placeholder="Enter UserName" type="text" name="username" id="username" required/>
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full px-4 py-2' placeholder="Password" type="password" name="password" id="password" required />
                            <span className="absolute right-0" onClick={showPassword}>
                                <img ref={ref} className="mx-2 my-1.5" width={30} src="/show.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button className="flex items-center bg-green-500 text-black rounded-full w-fit px-4 py-2 hover:bg-green-600">
                        <img className="w-8 mx-2" src="/add.png" alt="Add icon" />
                        Save Password</button>
                </form>

                <div>
                    <h2 className="text-2xl font-bold py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center'>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>@site</th>
                                    <th className='py-2'>@username</th>
                                    <th className='py-2'>@password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-50'>
                                {
                                    passwordArray.map((item, index) => (
                                        <tr key={index}>
                                            <td className="py-2 text-center border border-white">
                                                <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
                                                    <a href={item.site} target='_blank'>{item.site}</a>
                                                    <img onClick={() => copyText(item.site)} className="w-4 md:ml-4 cursor-pointer" src="/copy.png" alt="copybutton" />
                                                </div>
                                            </td>
                                            <td className="py-2 text-center border border-white">
                                                <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
                                                    <span>{item.username}</span>
                                                    <img onClick={() => copyText(item.username)} className="w-4 md:ml-4 cursor-pointer" src="/copy.png" alt="copybutton" />
                                                </div>
                                            </td>
                                            <td className="py-2 text-center border border-white">
                                                <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
                                                    <span>{item.password}</span>
                                                    <img onClick={() => copyText(item.password)} className="w-4 md:ml-4 cursor-pointer" src="/copy.png" alt="copybutton" />
                                                </div>
                                            </td>
                                            <td className="py-2 text-center border border-white">
                                                <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
                                                    <img onClick={() => editPassword(index)} className="w-5 md:mr-2 cursor-pointer" src="/edit.png" alt="editbutton" />
                                                    <img onClick={() => deletePassword(index)} className="w-5 md:ml-2 cursor-pointer" src="/delete.png" alt="deletebutton" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>

            </div>
        </>
    )
}

export default Manager