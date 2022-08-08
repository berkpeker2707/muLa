import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmTokenAction } from "../../../state/actions/authActions"
import "../../../App.css";
import swal from "@sweetalert/with-react";


const ConfirmPage = ({ confirmTokenAction }) => {
    const onClickSubmit = () => {
        swal({
          title: "Activated!",
          text: "Your account has been activated, you can login.",
          icon: "success",
        });
      };

    const params = useParams();
    const paramToken = params[0];

    const [tokenData, setTokenData] = useState({
        token: paramToken
    });
    const { token } = tokenData;

    const onChange = e => setTokenData({ ...tokenData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        confirmTokenAction({ token });
    }

    return (
        <div className="register-component confirmPage">
            <form onSubmit={e => onSubmit(e)}>
                <input type="hidden" name="token" id="token" value={token}
                    onChange={e => onChange(e)} />
                <h1>Account Confirmation</h1>
                <br />
                {tokenData ? (
                <button type="submit" className="btn btn-primary"  onClick={() => onClickSubmit()}>
                    Click to Activate Account
                </button>
                ) : (
                    <button type="submit" disabled className="btn btn-primary"  onClick={() => onClickSubmit()}>
                    Link Expired
                </button> 
                )
                }
            </form>
        </div >
    );
}

ConfirmPage.propTypes = {
    confirmTokenAction: PropTypes.func.isRequired,
}


export default connect(null, { confirmTokenAction })(ConfirmPage);
