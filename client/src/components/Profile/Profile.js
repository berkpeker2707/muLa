import React, { Fragment, useEffect, useState } from 'react'
import "../../App.css";
import { FaBriefcase, FaPersonBooth, FaBeer, FaSmoking, FaVenusMars, FaLanguage, FaPrayingHands, FaUtensils, FaBirthdayCake } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { loadUser } from "../../state/actions/authActions"
import { loadUserAvatar} from "../../state/actions/authActions"
import LoadingGif from "../Dashboard/LoadingGif";
import ProfileActions from './ProfileActions';
import ReTakeTestAction from './ReTakeTest/ReTakeTestAction';
import defaultProfilePicture from "./defaultProfilePicture.png";

const Profile = ({ loadUser, loadUserAvatar, auth, user, isAuthenticated }) => {    
    // const [file, setFile] = useState(null);

    useEffect(() => {
        loadUser();
        loadUserAvatar();
        // setFile(user);
    }, [])

    return <Fragment>
        {
            auth.isLoading === true ? <LoadingGif /> : <Fragment >
                {isAuthenticated ? 
                    <div className="container">
                        <div className="main-body">
                            <div className="row gutters-sm">
                                <div className="col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                {user.user.picture === undefined ?
                                                <img src={defaultProfilePicture} className="picture profilePhoto" draggable="false"/>
                                                : 
                                                <img src={`/me/avatar/${user.user.picture.filename}`} className="picture profilePhoto" draggable="false"/>
                                                }
                                                <div className="mt-3">
                                                    <h4>{user.user.firstname}{" "}{user.user.lastname}</h4>
                                                    <hr />
                                                    <p className="font-size-sm">Current Location</p>
                                                    <button className="btn btn-outline-primary">Like</button> {" "}
                                                    <button className="btn btn-outline-primary">Message</button>
                                                    <hr />
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <FaVenusMars />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.gender}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                                                        <FaBirthdayCake />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.age}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <FaLanguage />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.language}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <FaBriefcase />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.job}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <FaPrayingHands />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.belief}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <FaPersonBooth />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.politics}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <FaUtensils />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.diet}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <FaBeer />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.alcohol}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <FaSmoking />
                                                    </div>
                                                    <div className="col-sm-12">
                                                        {user.user.smoking}
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row gutters-sm">
                                        <div className="col-sm-12 mb-3">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Character Type:</i>{user.user.characterType}</h6>
                                                    <small>Extraversion - Introversion</small>
                                                    <div className="progress mb-3" style={{ height: "15px", background: "#dc3545" }}>
                                                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${user.user.extraversionValue}%` }} aria-valuenow={user.user.extraversionValue} aria-valuemin="0" aria-valuemax="100">{user.user.extraversionValue}%</div>
                                                        <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${user.user.introversionValue}%` }} aria-valuenow={user.user.introversionValue} aria-valuemin="0" aria-valuemax="100">{user.user.introversionValue}%</div>
                                                    </div>
                                                    <small>Sensing - Intuition</small>
                                                    <div className="progress mb-3" style={{ height: "15px", background: "#dc3545" }}>
                                                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${user.user.sensingValue}%` }} aria-valuenow={user.user.sensingValue} aria-valuemin="0" aria-valuemax="100">{user.user.sensingValue}%</div>
                                                        <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${user.user.intuitionValue}%` }} aria-valuenow={user.user.intuitionValue} aria-valuemin="0" aria-valuemax="100">{user.user.intuitionValue}%</div>
                                                    </div>
                                                    <small>Thinking - Feeling</small>
                                                    <div className="progress mb-3" style={{ height: "15px", background: "#dc3545" }}>
                                                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${user.user.thinkingValue}%` }} aria-valuenow={user.user.thinkingValue} aria-valuemin="0" aria-valuemax="100">{user.user.thinkingValue}%</div>
                                                        <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${user.user.feelingValue}%` }} aria-valuenow={user.user.feelingValue} aria-valuemin="0" aria-valuemax="100">{user.user.feelingValue}%</div>
                                                    </div>
                                                    <small>Judging - Perceiving</small>
                                                    <div className="progress mb-3" style={{ height: "15px", background: "#dc3545" }}>
                                                        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${user.user.judgingValue}%` }} aria-valuenow={user.user.judgingValue} aria-valuemin="0" aria-valuemax="100">{user.user.judgingValue}%</div>
                                                        <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${user.user.perceivingValue}%` }} aria-valuenow={user.user.perceivingValue} aria-valuemin="0" aria-valuemax="100">{user.user.perceivingValue}%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row gutters-sm">
                                        <div className="col-sm-12 mb-3">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Description:</i></h6>
                                                    <p>{user.user.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <ProfileActions /> {" "} <ReTakeTestAction />
                        </div>
                    </div> : <h4>Couldn't Retrieve Your Account</h4>}
            </Fragment>
        }
    </Fragment >
}

Profile.propTypes = {
    loadUser: PropTypes.func.isRequired,
    loadUserAvatar: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
})


export default connect(mapStateToProps, { loadUser, loadUserAvatar })(Profile)