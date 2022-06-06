import { Frame, Tabs } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";

const MenuProvider = ({ children }) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const routes = ["/", "/settings"];

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
    navigate(routes[selectedTabIndex]);
  }, []);

  const menuItems = [
    {
      id: "app",
      content: <span>App</span>,
      accessibilityLabel: "App",
      panelID: "app",
    },
    {
      id: "active",
      content: <span>Settings</span>,
      accessibilityLabel: "Settings",
      panelID: "settings",
    },
  ];

  return (
    <Frame>
      <Tabs tabs={menuItems} selected={selectedTab} onSelect={handleTabChange}>
        {children}
      </Tabs>
    </Frame>
  );
};

export default MenuProvider;
