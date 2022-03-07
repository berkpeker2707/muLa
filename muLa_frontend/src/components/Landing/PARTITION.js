
          <Grid className="LandingSection2" container spacing={3}>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Paper
              className={classes.paper}
              style={{
                background: "rgb(255, 255, 255)",
                /* Fallback for older browsers without RGBA-support */
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {" "}
              <h5>What do we offer?</h5>
              <p>
                Friendship app focuses constructive ways to find and build
                compatible relationship.
                <br />
                By using well-known Myers-Briggs Testing, we want our users to
                feel satisfied and feel{" "}
              </p>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              className={classes.paper}
              style={{
                background: "rgb(255, 255, 255)",
                /* Fallback for older browsers without RGBA-support */
                background: "rgba(255, 255, 255, 0.7)",
              }}
            >
              <h4>Why muLa?</h4>
              <p>
                We all desire that unreachable tasty red apple, yet in
                reality, it is not the case. Relationships seek compatible
                souls, and deeper understanding. Deep down we all want
                something familiar, someone who can understand our core. Here
                MuLa kicks in, we find people who are familiar for you to have
                stable and constructive relationship.
              </p>
            </Paper>
          </Grid>
        </Grid>
        {/* </div> */}

        <Grid
          className="LandingSection3"
          container
          spacing={3}
          style={{
            backgroundImage: `url(${coupleVector})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Grid>
            <Grid item xs={3}>
              <Paper
                className={classes.paper}
                style={{
                  background: "rgb(255, 255, 255)",
                  /* Fallback for older browsers without RGBA-support */
                  background: "rgba(255, 255, 255, 0.7)",
                }}
              >
                {" "}
                <h5>What do we offer?</h5>
                <p>
                  muLa app focuses constructive ways to find and build
                  compatible relationship.
                  <br />
                  By using well-known Myers-Briggs testing, we aim your
                  satisfaction for finding compatible relationship.{" "}
                </p>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper
                className={classes.paper}
                style={{
                  background: "rgb(255, 255, 255)",
                  /* Fallback for older browsers without RGBA-support */
                  background: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <h4>Why muLa?</h4>
                <p>
                  Relationships seek compatible souls, minds and deeper
                  understanding. Deep down we all want someone familiar,
                  someone who can understand our core. That click we can get
                  from someone. There muLa kicks in, our goal is to find
                  people who are familiar in core.
                </p>
              </Paper>
            </Grid>
          </Grid>

          <Grid container className="">
            <Grid
              item
              xs={12}
              className={classes.paper}
              style={{
                background: "rgb(255, 255, 255)",
                /* Fallback for older browsers without RGBA-support */
                background:
                  " linear-gradient(43deg, #1e3d59 0%, #C850C0 46%, #FFCC70 60%)",
              }}
            >
              <h4>Already signed up?</h4>
            </Grid>
            <Grid item xs={12}>
              <Grid item>
                <Button variant="contained">
                  <Link to="/register">Register</Link>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained">
                  <Link to="/login">Login</Link>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <Grid container className="">
            <Grid item xs={5}>
              <h4>How Does It Work?</h4>
            </Grid>
            <Grid item xs={7}>
              <p>
                MuLa uses MBTI character types & encourages you to complete
                your character type test. Once your character classification
                is done, we encourage you to find people whom you can form
                deep bonds & interested in talk to.
              </p>
            </Grid>
          </Grid>
          <br />
        </Grid>