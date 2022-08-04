import { NavigationMenu } from "@shopify/app-bridge-react";
import React from "react";

const MenuProvider = () => {
  return (
    <NavigationMenu
      navigationLinks={[
        {
          label: "Home",
          destination: "/",
        },
        {
          label: "Pages",
          destination: "/pages",
        },
        {
          label: "Settings",
          destination: "/settings",
        },
      ]}
      matcher={(link, location) => link.destination === location.pathname}
    />
  );
};

export default MenuProvider;
