import React, { useState } from "react";
import "../../App.css";
import { FaGooglePlay, FaAppStoreIos, FaEnvelope } from "react-icons/fa";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { Link } from "react-router-dom";

export default function Footer() {
  const [openContact, setOpenContact] = useState(false);
  const [openToU, setOpenToU] = useState(false);
  const handleOpenContact = () => setOpenContact(true);
  const handleCloseContact = () => setOpenContact(false);
  const handleOpenToU = () => setOpenToU(true);
  const handleCloseToU = () => setOpenToU(false);

  return (
    <Grid className="Footer" container>
      <Grid container item xs={12} sm={12}>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="#" onClick={handleOpenContact}>
              Contact
            </Link>
            <Modal
              open={openContact}
              onClose={handleCloseContact}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                style={{
                  display: "flex",
                  flexWrap: "wrap",
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
          {/* <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="/">
              Support
            </Link>
          </Grid> */}
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="/privacy">
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
            <Link className="FooterIconLink" to="/">
              © muLa {new Date().getFullYear()}
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="/about">
              About Us
            </Link>
          </Grid>
          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="/faq">
              F.A.Q.
            </Link>
          </Grid>

          <Grid className="FooterIcon">
            <Link className="FooterIconLink" to="#" onClick={handleOpenToU}>
              Terms of Usage
            </Link>
            <Modal
              open={openToU}
              onClose={handleCloseToU}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                style={{
                  height: "80vh",
                  display: "flex",
                  flexWrap: "wrap",
                  overflow: "scroll",
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
                <ol style={{ color: "black" }}>
                  <li>
                    You must read and agree to our Terms of Use (the
                    “Agreement”) because it forms the binding contract between
                    you and muLa. However, we’ve provided this short summary for
                    your convenience (with capitalized terms defined in the
                    Agreement).
                  </li>
                  <li>
                    Acceptance. By using the Service, you agree to this
                    Agreement, our Privacy Policy and Safety Tips, and any terms
                    that apply to in app purchase you make.
                  </li>
                  <li>
                    Eligibility. You must be at least 18 to use the Service and
                    not prohibited by law from using the Service. You promise to
                    follow the law and that you’re not a convicted felon or sex
                    offender.
                  </li>
                  <li>
                    Your Account. If you use Facebook to access muLa, you must
                    authorize us to access certain information from Facebook to
                    use muLa. You agree to keep your account secure and
                    confidential.
                  </li>
                  <li>
                    Modifying the Services; Termination. We may modify the
                    Services at any time or discontinue them altogether. You can
                    terminate your account in Settings, and we reserve the right
                    to terminate it for you if you violate this Agreement or if
                    we deem your use of the Service to be inappropriate.
                  </li>
                  <li>
                    Safety. muLa is not responsible for the actions of its users
                    or your interactions with them, and we don’t conduct
                    background checks. Be careful and be sure to read and follow
                    our Safety Tips on interacting with people on or off of
                    muLa.
                  </li>
                  <li>
                    Rights. muLa grants you the right to use our Service as
                    authorized and permitted by this Agreement. See the
                    Agreement for a full list of actions you agree not to take.
                    You grant muLa the right to display your profile and Content
                    for the limited purpose of muLa operating the Service and
                    researching and developing new ones.
                  </li>
                  <li>
                    Rules. See the Agreement for a list of the rules you agree
                    to abide by when you use muLa, such as not soliciting money
                    from other users, harassing other users or using the Service
                    for any illegal purposes.
                  </li>
                  <li>
                    In App Purchases. muLa may offer services for purchase
                    through mobile platforms such as iTunes and Google Play.
                    Those purchases are governed by the terms of the platforms.
                    Most purchases are not refundable and certain services only
                    grant you a specified license, as further described in the
                    Agreement.
                  </li>
                  <li>
                    Copyright. If you believe your work has been posted on the
                    Service in violation of your copyright, please send a notice
                    to our Copyright Agent following instructions in the
                    Agreement.
                  </li>
                  <li>
                    Disclaimers. Our Service is provided “as is,” and we
                    disclaim legal liability for the quality, safety, or
                    reliability of our Service.
                  </li>
                  <li>
                    Limitation of Liability. To the extent allowed by law, we
                    limit our liability to you for certain types of damages for
                    claims relating to your use of the Service, the conduct of
                    other users and unauthorized access or use of your Content.
                    Our aggregate liability will not exceed the fees you pay us.
                  </li>
                  <li>
                    Arbitration. Our Agreement contains a mandatory arbitration
                    clause. You agree that any disputes will be settled by
                    arbitration, and you waive your right to a trial by jury or
                    to participate in a class action. This does not apply to
                    users residing in the EU, Norway or elsewhere where
                    prohibited by law.
                  </li>
                  <li>
                    Governing Law; Venue. Texas law applies to this Agreement.
                    Actions for disputes relating to this Agreement must be
                    brought in Dallas, Texas, except for users residing in the
                    EU or Norway, who may bring claims in their country of
                    residence.
                  </li>
                  <li>
                    Indemnity. You agree to indemnify us for actions arising out
                    of your use of the Service, your Content or your violation
                    of this Agreement.
                  </li>
                </ol>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
