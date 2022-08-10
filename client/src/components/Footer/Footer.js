import React, { useState } from "react";
import "../../App.css";
import { FaGooglePlay, FaAppStoreIos, FaEnvelope } from "react-icons/fa";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Modal from "@mui/material/Modal";

import { NavLink } from "react-router-dom";

export default function Footer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid className="Footer" container>
      <Grid container item xs={12} sm={12}>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon">
            <NavLink className="FooterIconLink" to="#" onClick={handleOpen}>
              Contact
            </NavLink>
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
            <NavLink className="FooterIconLink" to="/">
              Support
            </NavLink>
          </Grid>
          <Grid className="FooterIcon">
            <NavLink className="FooterIconLink" to="/">
              Privacy
            </NavLink>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon">
            <NavLink className="FooterIconLink" to="/">
              <FaGooglePlay style={{ fontSize: "2rem" }} /> Google Play
            </NavLink>
          </Grid>
          <Grid className="FooterIcon">
            <NavLink className="FooterIconLink" to="/">
              <FaAppStoreIos style={{ fontSize: "2rem" }} /> App Store
            </NavLink>
          </Grid>
          <Grid className="FooterIcon">
            <NavLink className="FooterIconLink" to="/">
              muLa &reg; {new Date().getFullYear()}
            </NavLink>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon">
            <NavLink className="FooterIconLink" to="/about">
              About Us
            </NavLink>
          </Grid>
          <Grid className="FooterIcon">
            <NavLink className="FooterIconLink" to="/faq">
              F.A.Q.
            </NavLink>
          </Grid>
          <Grid className="FooterIcon">
            <NavLink className="FooterIconLink" to="#">
              Terms of Usage
            </NavLink>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
