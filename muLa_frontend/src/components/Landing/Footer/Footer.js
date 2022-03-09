import React, { useState } from "react";
import "../../../App.css";
import { FaGooglePlay, FaAppStoreIos, FaEnvelope } from "react-icons/fa";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Modal from "@mui/material/Modal";

import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vh",
  backgroundColor: "#f5f0e1",
  color: "#1e3d59",
  border: "2px solid #1e3d59",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

export default function Footer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid
      className="Footer"
      container
      style={{
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <hr />
      <Grid container item xs={12} sm={12}>
        <Grid xs={12} sm={4}>
          <Grid className="FooterIcon" item>
            <Link className="FooterIconLink" to="/" onClick={handleOpen}>
              Contact
            </Link>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <FaEnvelope style={{ fontSize: "24px" }} />{" "}
                mula-support@gmail.com
              </Box>
            </Modal>
          </Grid>
          <Grid className="FooterIcon" item>
            <Link className="FooterIconLink" to="/">
              Support
            </Link>
          </Grid>
          <Grid className="FooterIcon" item>
            <Link className="FooterIconLink" to="/">
              Privacy
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon" item>
            <Link className="FooterIconLink" to={"/"}>
              <FaGooglePlay style={{ fontSize: "24px" }} /> Google Play
            </Link>
          </Grid>
          <Grid className="FooterIcon" item>
            <Link className="FooterIconLink" to={"/"}>
              <FaAppStoreIos style={{ fontSize: "24px" }} /> App Store
            </Link>
          </Grid>
          <Grid className="FooterIcon" item>
            muLa &reg; {new Date().getFullYear()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon" item>
            <Link className="FooterIconLink" to="/">
              About Us
            </Link>
          </Grid>
          <Grid className="FooterIcon" item>
            <Link className="FooterIconLink" to="/">
              F.A.Q.
            </Link>
          </Grid>
          <Grid className="FooterIcon" item>
            <Link className="FooterIconLink" to="/">
              Terms of Usage
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <hr />
    </Grid>
  );
}
