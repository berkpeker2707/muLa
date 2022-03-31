import React, { Fragment, useEffect, useState } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaPersonBooth,
  FaBeer,
  FaSmoking,
  FaVenusMars,
  FaLanguage,
  FaPrayingHands,
  FaUtensils,
  FaBirthdayCake,
} from "react-icons/fa";
import LoadingGif from "../Dashboard/LoadingGif";
import defaultProfilePicture from "../../../src/defaultProfilePicture.png";

import { useForm } from "react-hook-form";
import axios from "axios";

const Uploadfiletest = ({
  updateProfile,
  history,
  getCurrentUser,
  getCurrentUserAvatar,
  user,
  auth,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  
  const [file, setFile] = useState(null);
  const [inputContainsFile, setInputContainsFile] = useState(false);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [progress, setProgress] = useState(null);


  useEffect(() => {
    getCurrentUser();
    getCurrentUserAvatar();
  }, []);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setInputContainsFile(true);
  };

const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('picture', file, file.name);
    axios
      .put(`/me/update/avatar`, fd)
      .then(({ data }) => {
        setImageId(data);
        setFile(null);
        setInputContainsFile(false);
        setCurrentlyUploading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log('db error');
          alert('db error');
        } else {
          console.log('other error: ', err);
        }
        setInputContainsFile(false);
        setCurrentlyUploading(false);
      });
  };
    
  const handleClick = () => {
    if (inputContainsFile) {
      setCurrentlyUploading(true);
      fileUploadHandler();
    }
  };

  return (
    <Fragment>
      {user.isLoading === true ? (
        <LoadingGif />
      ) : (
        <Fragment>
          <form method="PUT" action="/me/update/avatar" encType="multipart/form-data">
            {user.user.length !== null || undefined ? (
              <div className="container" key={user.user._id}>
                <div className="main-body">
                  <div className="row gutters-sm">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex flex-column align-items-center text-center">
                            <div className="mt-3">
                            {user.user.picture === undefined ?
                                                <img src={defaultProfilePicture} name="picture" className="profilePhoto" draggable="false"/>
                                                : 
                                                <img src={`/me/avatar/${user.user.picture.filename}`} name="picture" className="profilePhoto" draggable="false"/>
                                                }
                              <br />
                              <br/>
                              <input
                                type="file"
                                className="form-control"
                                id="picture"
                                name="picture"
                                onChange={handleFile}
                              />
                            </div>
                            {/* <div className="mt-3">
                              <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Your password"
                                //value={values.password}
                                //onChange={onChange("password")} required
                                {...register("password", {
                                  required: {
                                    value: true,
                                    message: "*Please Enter Password",
                                  },
                                })}
                              />
                            </div> */}
                            <div className="mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={handleClick}
                                >
                                  Update Picture
                                </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h4>Couldn't Retrieve Your Profile Picture</h4>
            )}
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Uploadfiletest;
