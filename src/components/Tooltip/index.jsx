import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { BsInfoLg } from "react-icons/bs";

export default function TooltipComponent() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Tooltip title="Informações" placement="top">
                <IconButton onClick={handleOpen}>
                    <BsInfoLg />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Informações
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        O campo "Mensagem Customizada" fica salvo apenas do lado do cliente, logo, não há registros salvos em nosso servidores, a informação nele é salva por 1 ano em cache do seu navegador, ou seja, se ele for desinstalado ou for limpo manualmente nas configurações pelo, usuário será perdido! reforçamos que nenhuma informação inserida ficará salva do nosso lado, fico feliz em ter ajudado ^^
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
