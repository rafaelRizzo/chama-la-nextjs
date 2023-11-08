'use client'

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { RiWhatsappFill, RiSendPlaneFill } from "react-icons/ri";
import { Button, TextField } from "@mui/material";
import styles from "@/components/Form/Form.module.css";
import TooltipComponent from '@/components/Tooltip/';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const Form = () => {
    const [cookieExists, setCookieExists] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [isChecked, setIsChecked] = useState(true);
    const [error, setError] = useState(false);

    const handleSwitchChange = (event) => {
        setIsChecked(event.target.checked);
    };

    useEffect(() => {
        // Verifique se o cookie existe no início
        const meuCookie = Cookies.get('msgCustom');
        if (meuCookie) {
            setCookieExists(meuCookie);
        }
    }, []);

    const isNumeric = (str) => {
        // Use uma expressão regular para verificar se a string contém apenas números
        return /^\d+$/.test(str);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const numberValue = event.target.querySelector("#outlined-basic").value;
        const textareaValue = event.target.querySelector("#outlined-multiline-static").value;

        // Verifique se o campo de entrada contém apenas números
        if (!isNumeric(numberValue)) {
            // O campo de entrada contém caracteres não numéricos
            setError(true);
            return;
        }

        // Configure o cookie com SameSite=None e secure=true
        Cookies.set('msgCustom', textareaValue, {
            expires: 365,
            sameSite: 'None',
            secure: true
        });

        setCookieExists(textareaValue);
        setError(false); // Redefina o erro para falso após o envio bem-sucedido

        // Abra a página do WhatsApp com a URL apropriada

        if (isChecked) {
            const whatsappURL = `https://api.whatsapp.com/send?1=pt_BR&phone=55${numberValue}`;
            window.open(whatsappURL, '_blank');
        } else {
            const whatsappURL = `https://web.whatsapp.com/send?phone=55${numberValue}`;
            window.open(whatsappURL, '_blank');
        }
    };

    const handleTextareaChange = (event) => {
        setCookieExists(event.target.value);
    };

    // Atualize a data atual a cada segundo
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(`${new Date().getHours()}h`);
        }, 1000);

        // Limpar o intervalo quando o componente é desmontado
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className={styles.container}>
            <form action="" onSubmit={handleFormSubmit}>
                <RiWhatsappFill />
                <h1>Inicializador de Conversa</h1>

                <div className={styles.container_inputs}>
                    <TextField
                        error={error} // Adicione a propriedade error para estilizar o campo quando há erro
                        helperText={error && 'Só é permitido números!'}
                        id="outlined-basic"
                        label="Número de quem quero chamar..."
                        variant="outlined"
                        type='tel'
                        autoComplete='off'
                    />
                    <div className={styles.container_textarea}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Mensagem customizada (opcional)"
                            multiline
                            rows={4}
                            value={cookieExists}
                            onChange={handleTextareaChange}
                        />
                        <div className={styles.container_tooltip}>
                            <TooltipComponent />
                        </div>
                    </div>

                    <FormGroup>
                        <FormControlLabel id='check_app'
                            control={<Switch checked={isChecked} onChange={handleSwitchChange} />} label="Abrir via App" />
                    </FormGroup >
                </div>
                <Button type="submit" variant="contained" className={styles.container_btn}>
                    Chamar
                    <RiSendPlaneFill />
                </Button>

                <i><a href="https://www.linkedin.com/in/rafael-rizzo-breschi-b02547216/" target="_blank">Powered - Rafael Rizzo</a></i>

                <i className={styles.date_container}>
                    {typeof window !== 'undefined' && currentDate}
                </i>

            </form>
        </div>
    );
};
