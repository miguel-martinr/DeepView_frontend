import React from 'react'
import './Videos.css'


export const VideoRow = () => {
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-4"><img className="card-img" src="src/favicon.svg" alt="" /></div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Pez1.mp4</h5>
            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p className="card-text"><small className="text-medium-emphasis">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  )
}
