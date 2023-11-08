import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Form } from "@/components/Form";
import { useState, useEffect } from 'react';
import { Hour } from '@/components/Hour';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Home() {
    const [movingX, setMovingX] = useState(0);
    const [movingY, setMovingY] = useState(0);

    useEffect(() => {
        const mouseMoving = (e) => {
            setMovingX(e.clientX);
            setMovingY(e.clientY);
        };

        document.addEventListener('mousemove', mouseMoving);

        return () => {
            document.removeEventListener('mousemove', mouseMoving);
        };
    }, []);

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <div className="container_ball">
                    <div className='ball-moving' style={{ left: movingX + 'px', top: movingY + 'px' }}></div>
                    <Form />
                    <div className='hour'>
                        <Hour />
                    </div>

                </div>
            </ThemeProvider>
        </>
    );
}
