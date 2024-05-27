import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Grid, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === 'Postter1' && password === 'KLM1234567') {
            dispatch(loginSuccess());
            navigate('/posts');
        } else {
            dispatch(loginFailure('Kullanıcı adı veya parola yanlıştır'));
            toast.error('Kullanıcı adı veya parola yanlış', {
                position: 'top-center'
            });
        }
    };

    const handleGoogleLogin = () => {
        alert('Bu özellik geliştirme aşamasında...')
    }

    const handleRegister = () => {
        setIsRegisterOpen(true);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    const handleCloseRegister = () => {
        setIsRegisterOpen(false);
    };

    const handleRegisterSubmit = () => {

        if (!username || !password || !confirmPassword || !firstName || !lastName) {
            toast.error('Lütfen tüm alanları doldurunuz.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Parolalar eşleşmiyor');
            return;
        }

        toast.error('Yeni üye alımları kapalı');
        setIsRegisterOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Box mt={10}>
                <Paper elevation={3}>
                    <Box p={4}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Giriş Yap
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Kullanıcı Adı"
                                fullWidth
                                margin="normal"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                variant="outlined"
                            />
                            <TextField
                                label="Parola"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Giriş Yap
                            </Button>
                            <Box mt={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button onClick={handleGoogleLogin} variant="outlined" color="primary" fullWidth>
                                            Google ile Giriş Yap
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={handleRegister} variant="outlined" color="primary" fullWidth>
                                            Kayıt Ol
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    </Box>
                </Paper>
            </Box>
            <ToastContainer />
            <Dialog open={isRegisterOpen} onClose={handleCloseRegister}>
                <DialogTitle>Kayıt Ol</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Adı"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Soyadı"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Kullanıcı Adı"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Parola"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        required
                    />
                    <TextField
                        label="Parolayı Onayla"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        variant="outlined"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRegister} color="primary">
                        İptal
                    </Button>
                    <Button onClick={handleRegisterSubmit} color="primary">
                        Kayıt Ol
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Login;
