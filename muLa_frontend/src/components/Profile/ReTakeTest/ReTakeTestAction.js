import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from "react-router-dom"

const ReTakeTestAction = () => {
    return (
        <div>
            <Link to="/test-update" className="btn btn-light"><FaUserCircle /> Retake the Test</Link>
        </div>
    )
}

export default ReTakeTestAction;