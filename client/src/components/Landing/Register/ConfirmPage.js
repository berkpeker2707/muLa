import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../App.css";
// import swal from "@sweetalert/with-react";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { validateUserAction } from "../../../state/slices/authSlices";

//redux
import { useSelector, useDispatch } from "react-redux";

const ConfirmPage = () => {
  const params = useParams();

  const dispatch = useDispatch();
  const validateErrorState = useSelector((state) => state?.auth?.appErr);

  useEffect(() => {
    dispatch(validateUserAction({ ...tokenData }));
  }, [dispatch]);

  const onClickSubmit = () => {
    // swal({
    //   title: "Activated!",
    //   text: "Your account has been activated, you can login.",
    //   icon: "success",
    // });
  };

  //   Swal.fire({
  //     text: "Your account has been activated, you can login.",
  //     customClass: {
  //       container: "position-absolute",
  //     },
  //     toast: true,
  //     position: "center",
  //     showConfirmButton: true,
  //     confirmButtonText: `<a href="/login" style="color:white; text-decoration: none;">Go back to login</a>`,
  //   });

  console.log(validateErrorState);

  const [tokenData, setTokenData] = useState({
    token: params.token,
  });
  const { token } = tokenData;

  const onChange = (e) =>
    setTokenData({ ...tokenData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    console.log("tokenData");
    console.log(tokenData);
    console.log("tokenData");
    e.preventDefault();
    validateUserAction(tokenData);
  };

  return (
    <Grid className="" container style={{ height: "74vh" }}>
      <div className="register-component confirmPage">
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="hidden"
            name="token"
            id="token"
            value={token}
            onChange={(e) => onChange(e)}
          />
          <h1>Account Activation</h1>
          {!validateErrorState ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => onClickSubmit()}
            >
              Return to login page
            </button>
          ) : (
            <button
              type="submit"
              disabled
              className="btn btn-primary"
              onClick={() => onClickSubmit()}
            >
              {validateErrorState}
            </button>
          )}
        </form>
      </div>
    </Grid>
  );
};

export default ConfirmPage;
