import React, { Fragment } from "react";
import Hourglass from "./Hourglass.gif";

export default () => {
  return (
    <Fragment>
      <img
        src={Hourglass}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};
