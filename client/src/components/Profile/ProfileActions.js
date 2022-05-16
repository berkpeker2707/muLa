import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from "react-router-dom"

const ProfileActions = () => {
    return (
        <div>
            <Link to="/profile-update" className="btn btn-light"><FaUserCircle /> Update Profile</Link>
        </div>
    )
}

export default ProfileActions;