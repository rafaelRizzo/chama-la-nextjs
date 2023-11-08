import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import styles from "@/components/Hour/Hour.module.css";
import { useEffect, useState } from "react";
import { PiClockFill } from "react-icons/pi";

export const Hour = () => {
    const [currentDate, setCurrentDate] = useState(''); // Hook para a hora

    // Atualizando a data atual a cada segundo
    useEffect(() => {
        const intervalId = setInterval(() => {
            let day = new Date().getDate()
            let month = new Date().getMonth() + 1
            let year = new Date().getFullYear()
            let hour = new Date().getHours()
            let minute = new Date().getMinutes()
            let seconds = new Date().getSeconds()

            let nowIs = `Data: ${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${seconds < 10 ? '0' + seconds : seconds}`

            setCurrentDate(nowIs);
        }, 1000);

        // Limpar o intervalo quando o componente é desmontado
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <i className={styles.date_container}>
                <Tooltip title={currentDate} placement="left">
                    <IconButton>
                        {/* Info mostra a hora */}
                        <PiClockFill />
                        {/*  */}
                    </IconButton>
                </Tooltip>
            </i >
        </>
    );
}
