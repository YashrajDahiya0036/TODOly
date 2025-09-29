import React from 'react'



const Button = ({ name, color, onClick }) => {

    const COLORS = {
        red: "bg-red-400 hover:bg-red-500 active:bg-red-600",
        blue: "bg-blue-400 hover:bg-blue-500 active:bg-blue-600",
        green: "bg-green-400 hover:bg-green-500 active:bg-green-600",
        yellow: "bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600",
    }

    return (
        <>
            <button onClick={onClick} className={`${COLORS[color]} rounded px-3 py-1 text-lg font-bold cursor-pointer`}>{name}</button>
        </>
    )
}

export default Button
