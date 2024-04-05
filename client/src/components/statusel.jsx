import React from 'react';
import { List, ListItem, ListItemText, Button, CardContent, Typography, Box } from '@mui/material';

const StatusItem = ({ status }) => {
    return (
        <div style={{ boxShadow: '1px 2px 9px #000f0f', margin: '1em', padding: '0.5em' }}>
            <Box sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ color: 'yellowgreen', fontSize: 14 }} color="text.secondary" gutterBottom>
                        {status.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Narxi: {status.price} UZS
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Bir kunda: {status.how_many_ads} reklama ko'ra olasiz
                    </Typography>
                    <Typography variant="body2">
                        Har bir ko'rilgan reklama uchun: {status.ads_pay} UZS olasiz
                    </Typography>
                    <Button>
                        Ulanish
                    </Button>
                </CardContent>
            </Box>
        </div>
    );
};
export default StatusItem