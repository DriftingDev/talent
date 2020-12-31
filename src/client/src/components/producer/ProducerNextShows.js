import React from 'react'
import { Alert } from 'react-bootstrap'
import { BiTime } from 'react-icons/bi'
import { AiFillSound } from "react-icons/ai"

const showArray = [
  {
    _id:1,
    datetime: 1609374345,
    showName: "show 1"
  },
  {
    _id:2,
    datetime: 1609374340,
    showName: "show 2"
  },
  {
    _id:3,
    datetime: 1609374343,
    showName: "show 3"
  }
]

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ProducerNextShows = () => {

  const nextShows = showArray.map((show) => {
    let date = new Date(show.datetime)
    return (
      <Alert key={show._id} variant="danger" className="px-1 py-2" >
        <div className='d-flex justify-content-between px-3'>
          <p className='px-2 m-0'>
            <BiTime /> {monthNames[date.getMonth()]} {date.getDate()} @ {date.getHours()}:{date.getMinutes()} 
          </p>
          <p className='px-2 m-0'>
            <AiFillSound /> {show.showName}
          </p>
        </div>
      </Alert>
    )
  })

  return (
    nextShows
  )

}

export default ProducerNextShows