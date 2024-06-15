import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-slate-800">
            <div className="md:mycontainer md:p-4 flex justify-between items-center h-14">
                <div className='text-2xl logo'><span className="font-bold text-green-500">&lt;</span><span className="font-bold text-white">Pass</span><span className="font-bold text-green-500">OP/&gt;</span></div>
                <button className="flex items-center px-2 py-1 font-bold bg-green-100 rounded-full">
                    <img className="w-8 mx-1" src="/github.png" alt="" />
                    GitHub
                </button>
            </div>
        </nav>
    )
}

export default Navbar