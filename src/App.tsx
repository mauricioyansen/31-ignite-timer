import { ThemeProvider } from "styled-components";
import { HashRouter } from "react-router-dom";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <HashRouter basename="/04-ignite-timer">
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </HashRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
