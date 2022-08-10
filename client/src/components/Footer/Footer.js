import React, { useState } from "react";
import "../../App.css";
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Footer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid className="Footer" container>
      <Grid container item xs={12} sm={12}>
        <Grid xs={12} sm={4}>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="#" onClick={handleOpen}>
              Contact
            </Link>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "50vh",
                  bgcolor: "background.paper",
                  background: "#f5f0e1",
                  border: "1px solid #1e3d59",
                  borderRadius: "3px",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <FaEnvelope style={{ fontSize: "2rem" }} />
                &nbsp;mula-support@gmail.com
              </Box>
            </Modal>
          </Grid>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="/">
              Support
            </Link>
          </Grid>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="/">
              Privacy
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="/">
              <FaGooglePlay style={{ fontSize: "2rem" }} /> Google Play
            </Link>
          </Grid>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="/">
              <FaAppStoreIos style={{ fontSize: "2rem" }} /> App Store
            </Link>
          </Grid>
          <Grid className="FooterIcon">
            muLa &reg; {new Date().getFullYear()}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="#">
              About Us
            </Link>
          </Grid>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="#">
              F.A.Q.
            </Link>
          </Grid>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="#">
              Terms of Usage
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
