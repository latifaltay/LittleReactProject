import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/postsSlice';
import PostList from './PostList';
import { Container, Typography, TextField, Backdrop, CircularProgress } from '@mui/material';

const SearchBar = () => {
    const dispatch = useDispatch();
    const { posts, status } = useSelector((state) => state.posts);
    const viewMode = useSelector((state) => state.viewMode);
    const [keyword, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(keyword.toLowerCase()) ||
            post.body.toLowerCase().includes(keyword.toLowerCase())
    );

    if (status === 'loading') {
        return (
            <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (status === 'failed') {
        return <Typography>İçerikler Yüklenirken Hata Oluştu, Lütfen Tekrar Deneyin</Typography>;
    }

    return (
        <Container>
            <TextField
                label="Ara"
                fullWidth
                margin="normal"
                value={keyword}
                onChange={handleSearchChange}
            />
            {filteredPosts.length === 0 ? (
                <Typography variant="body1" align="center">Sonuç Bulunamadı</Typography>
            ) : (
                <PostList posts={filteredPosts} viewMode={viewMode} />
            )}
        </Container>
    );

};

export default SearchBar;
