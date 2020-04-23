import React from "react";
import { NavItem, NavLink } from "shards-react";

export default function NavItemLink({ linkValues }) {
  return (
    <NavItem onClick={() => linkValues.defaultFunc()}>
      <NavLink className="nav-text" active href="#">
        {linkValues.linkTxt}
      </NavLink>
    </NavItem>
  );
}
