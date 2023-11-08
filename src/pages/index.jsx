import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

import { Form } from "@/components/Form";

export default function Home() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Form />
            </ThemeProvider>
        </>
    )
}
