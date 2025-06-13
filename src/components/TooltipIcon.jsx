import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

const TooltipIcon = ({ tooltip, children, ...props }) => (
  <OverlayTrigger
    placement="top"
    overlay={<Tooltip id={`${tooltip}-tooltip`}>{tooltip}</Tooltip>}
  >
    <Link {...props}>{children}</Link>
  </OverlayTrigger>
);

export default TooltipIcon;
