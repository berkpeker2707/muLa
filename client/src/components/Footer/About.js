import React from "react";
import "../../App.css";

import muLaIconTextSuperior from "../images/Icons/muLaMainIconImages/muLa-icon-textSuperior-single.png";
import coupleVector from "../images/LandingImages/coupleVector.png";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function About() {
  return (
    <Grid className="AboutContainer" container>
      <Grid className="AboutInnerContainer">
        <Grid className="AboutSection1" container>
          <Grid
            className="muLaIconTextSuperiorContainer AboutSection1Inner1"
            item
            md={4}
            xs={12}
          >
            <img
              className="muLaIconTextSuperior"
              src={muLaIconTextSuperior}
              alt="muLaIconTextSuperior"
            />
          </Grid>
          <Grid item md={8} xs={12} className="AboutSection1Inner2">
            <Paper
              style={{
                background: "rgb(255, 255, 255)",
                /* Fallback for older browsers without RGBA-support */
                background: "rgba(255, 255, 255, 0.1)",
              }}
              elevation={3}
            >
              {" "}
              <h4>What do we offer?</h4>
              <p>
                muLa focuses on constructive ways to build compatible
                relationships by using well-known Myers-Briggs Testing.
                <br />
                We want you to find compatible souls, and form deep bounds.
                <br />{" "}
              </p>
              <hr />
              <h4>How Does It Work?</h4>
              <p>
                muLa uses Myers-Briggs Personality Types & encourages you to
                complete your character test.
                <br />
                Once your character classification is done, we find people whom
                you can form deep bonds based on your personal results. We make
                sure your answers stay hidden, only show you the results, so you
                can feel safe and secure while giving your honest answers.
              </p>
            </Paper>
          </Grid>
        </Grid>

        <Grid className="AboutSection2" container>
          <Grid className="AboutSection2Inner1" container>
            <Grid className="AboutSection2Inner1Child1" item xs={3}>
              <Paper
                style={{
                  background: "rgb(255, 255, 255)",
                  /* Fallback for older browsers without RGBA-support */
                  background: "rgba(255, 255, 255, 0.1)",
                }}
                elevation={3}
              >
                {" "}
                <h4>What is Myers-Briggs Test?</h4>
                <p>
                  The Myers-Briggs Personality Type Indicator is a self-report
                  inventory designed to identify a person's personality type,
                  strengths, and preferences.
                  <br />
                  The questionnaire was developed by Isabel Myers and her mother
                  Katherine Briggs based on their work with Carl Jung's theory
                  of personality types.
                  <br />{" "}
                </p>
              </Paper>

              <Paper
                style={{
                  background: "rgb(255, 255, 255)",
                  /* Fallback for older browsers without RGBA-support */
                  background: "rgba(255, 255, 255, 0.1)",
                }}
                elevation={3}
              >
                {" "}
                <h4>How Does It Work?</h4>
                <p>
                  MuLa uses MBTI character types & encourages you to complete
                  your character type test. Once your character classification
                  is done, we encourage you to find people whom you can form
                  deep bonds & interested in talk to.
                </p>
              </Paper>
            </Grid>

            <Grid
              className="AboutSection2Inner1Child2"
              item
              xs={9}
              style={{
                backgroundImage: `url(${coupleVector})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Paper
                style={{
                  background: "rgb(255, 255, 255)",
                  /* Fallback for older browsers without RGBA-support */
                  background: "rgba(255, 255, 255, 0)",
                  height: "100%",
                }}
              ></Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
