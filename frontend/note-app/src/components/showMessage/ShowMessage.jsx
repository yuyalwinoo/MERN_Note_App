import React from 'react'

const ShowMessage = ({message,flag}) => {
  return (
    <span className={`text-xs font-semibold ${flag === 'error' ? "text-red-500" : "text-green-500"}`}>{message}</span>
  )
}

export default ShowMessage