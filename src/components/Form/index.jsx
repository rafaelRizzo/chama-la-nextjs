'use client'

// Imports gerais
import React, { useState, useEffect } from 'react';
import styles from "@/components/Form/Form.module.css";
import Cookies from 'js-cookie';
import { RiWhatsappFill, RiSendPlaneFill } from "react-icons/ri";
import TooltipComponent from '@/components/Tooltip/';

import { Button, TextField } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const Form = () => {
    const [numberToCall, setNumberToCall] = useState(''); // Hook para o input do numero
    const [cookieExists, setCookieExists] = useState(''); // Hook para o textarea da mensagem custom
    const [currentDate, setCurrentDate] = useState(''); // Hook para a hora
    const [isChecked, setIsChecked] = useState(true);  // Hook para o select
    const [error, setError] = useState(false); // Hook para validação do input 

    const handleSwitchChange = (event) => { // Função para alterar o estado do select
        setIsChecked(event.target.checked);
    };

    const isNumeric = (str) => { // Use uma expressão regular para verificar se a string contém apenas números
        return /^\d+$/.test(str);
    };

    const handleFormSubmit = (event) => { // Função para manipular o form
        event.preventDefault();
        let numberValue = numberToCall // Definindo a variável para receber o state do input número
        let textareaValue = event.target.querySelector("#outlined-multiline-static").value; // Definindo variável para receber o valor da mensagem custom

        // Função para verificar se o campo de entrada contém apenas números
        if (!isNumeric(numberValue)) {
            // O campo de entrada contém caracteres não numéricos
            setError(true);
            return;
        }

        // Configurando e setando o Cookie
        Cookies.set('msgCustom', textareaValue, {
            expires: 365,
            sameSite: 'None',
            secure: true
        });

        setCookieExists(textareaValue);
        setError(false); // Redefina o erro para falso após o envio bem-sucedido

        // Abra a página do WhatsApp com a URL apropriada
        if (isChecked) {
            if (cookieExists) {
                const whatsappURL = `https://api.whatsapp.com/send?1=pt_BR&phone=55${numberValue}&text=${cookieExists}`;
                window.open(whatsappURL, '_blank');
            }
            const whatsappURL = `https://api.whatsapp.com/send?1=pt_BR&phone=55${numberValue}`;
            window.open(whatsappURL, '_blank');
        } else {
            if (cookieExists) {
                const whatsappURL = `https://web.whatsapp.com/send?phone=55${numberValue}&text=${cookieExists}`;
                window.open(whatsappURL, '_blank');
            }
            const whatsappURL = `https://web.whatsapp.com/send?phone=55${numberValue}`;
            window.open(whatsappURL, '_blank');
        }

        numberValue = setNumberToCall('') // Limpo o input para o usuário
    };

    const handleTextareaChange = (event) => { // Atualizando o valor do estado do textarea
        setCookieExists(event.target.value);
    };

    useEffect(() => {
        // Verifique se o cookie existe no início
        const meuCookie = Cookies.get('msgCustom');
        if (meuCookie) {
            setCookieExists(meuCookie);
        }
    }, []);

    // Atualizando a data atual a cada segundo
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
        <div className={styles.container} >
            <form action="" onSubmit={handleFormSubmit}>
                <RiWhatsappFill />
                <h1>Inicializador de Conversa</h1>

                {/* Info box inputs e select */}
                <div className={styles.container_inputs}>
                    {/* Info mostra o input do número que quer chamar */}
                    <TextField
                        error={error} // Adicione a propriedade error para estilizar o campo quando há erro
                        helperText={error && 'Só é permitido números!'}
                        id="outlined-basic"
                        label="Número de quem quero chamar..."
                        variant="outlined"
                        type='tel'
                        autoComplete='off'
                        value={numberToCall}
                        onChange={(e) => setNumberToCall(e.target.value)}
                    />
                    {/*  */}

                    {/* Info mostra textarea */}
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
                    {/*  */}

                    {/* Info mostra select */}
                    <FormGroup>
                        <FormControlLabel id='check_app'
                            control={<Switch checked={isChecked} onChange={handleSwitchChange} />} label="Abrir via App" />
                    </FormGroup >
                    {/*  */}
                </div>
                {/*  */}

                {/* Botão principal */}
                <Button type="submit" variant="contained" className={styles.container_btn}>
                    Chamar
                    <RiSendPlaneFill />
                </Button>
                {/*  */}

                {/* Info mostra Linkedin */}
                <i>
                    <a href="https://www.linkedin.com/in/rafael-rizzo-breschi-b02547216/" target="_blank">Powered - Rafael Rizzo</a>
                </i>
                {/*  */}

                {/* Info mostra a hora */}
                <i className={styles.date_container}>
                    {typeof window !== 'undefined' && currentDate}
                </i>
                {/*  */}

            </form>
        </div>
    );
};
