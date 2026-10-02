import React from 'react'
import UI_IMG from '../../assets/images/auth-img.png'
import BG_IMG from '../../assets/images/bg.jpg'  // dodany import tła

const AuthLayout = ({children}) => {
    return (
        <div className="flex h-screen">
            {/* Lewa część z formularzem */}
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
                <h2 className="text-lg font-medium">Task Manager</h2>
                {children}
            </div>

            {/* Prawa część z obrazem */}
            <div
                className="hidden md:flex w-[40vw] h-screen items-center justify-center overflow-hidden p-8"
                style={{ backgroundImage: `url(${BG_IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <img src={UI_IMG} alt="Auth UI" className="w-64 lg:w-[90%] object-cover"/>
            </div>
        </div>
    )
}

export default AuthLayout;
