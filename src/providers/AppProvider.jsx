import {
  Provider as AppBridgeProvider,
  RoutePropagator,
} from "@shopify/app-bridge-react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import { Outlet } from "react-router";
import { GraphQLProvider } from "./GraphQLProvider.jsx";
import MenuProvider from "./MenuProvider.jsx";

export default function AppProvider() {
  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider
        config={{
          apiKey: process.env.SHOPIFY_API_KEY,
          host: new URL(location).searchParams.get("host"),
          forceRedirect: true,
        }}
      >
        <MenuProvider>
          <GraphQLProvider>
            <Outlet />
            <RoutePropagator />
          </GraphQLProvider>
        </MenuProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
