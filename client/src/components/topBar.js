import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../auth";

function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="Sản phẩm"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          active={activeItem === "bill"}
          onClick={handleItemClick}
          as={Link}
          to="/bill"
        >
          Đơn đã đặt
        </Menu.Item>
        <Menu.Item
          active={activeItem === "cart"}
          onClick={handleItemClick}
          as={Link}
          to="/cart"
        >
          Giỏ hàng
        </Menu.Item>
        <Menu.Item onClick={logout}>Đăng xuất</Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="Sản phẩm"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          Đăng nhập
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  return <div style={{ background: "white" }}>{menuBar}</div>;
}

export default MenuBar;
