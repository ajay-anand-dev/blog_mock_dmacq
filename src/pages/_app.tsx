import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Global, css } from "@emotion/react";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

const queryClient = new QueryClient();

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
    },
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Global
                    styles={css`
            body {
              margin: 0;
              font-family: 'Roboto', sans-serif;
              background-color: #f9fafb;
            }
          `}
                />
                <Toaster position="top-right" reverseOrder={false} />
                <Component {...pageProps} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
