import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, List, ListItem, Divider, Paper } from '@mui/material';

const getUserStatus = (userId) => {
    if (userId % 2 === 0 && userId % 3 === 0) {
        return { status: 'Platinum', color: '#a8a8a8' };
    } else if (userId % 2 === 0) {
        return { status: 'Silver', color: '#808080' };
    } else if (userId % 3 === 0) {
        return { status: 'Gold', color: '#ffd700' };
    } else {
        return { status: 'Diamond', color: '#6495ed' };
    }
};

const PostList = ({ posts, viewMode }) => {
    const navigate = useNavigate();
    const [hoveredPostId, setHoveredPostId] = useState(null);

    const handleClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleMouseEnter = (postId) => {
        setHoveredPostId(postId);
    };

    const handleMouseLeave = () => {
        setHoveredPostId(null);
    };

    if (viewMode === 'list') {
        return (
            <List>
                {posts.map((post, index) => {
                    const { status, color } = getUserStatus(post.userId);
                    return (
                        <React.Fragment key={post.id}>
                            <ListItem
                                onClick={() => handleClick(post.id)}
                                onMouseEnter={() => handleMouseEnter(post.id)}
                                onMouseLeave={handleMouseLeave}
                                style={{ backgroundColor: hoveredPostId === post.id ? '#f0f0f0' : 'inherit' }}
                            >
                                <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2">{post.body}</Typography>
                                        <Typography variant="caption" style={{ color }}>{status}</Typography>
                                    </CardContent>
                                </Paper>
                            </ListItem>
                            {index !== posts.length - 1 && <Divider />}
                        </React.Fragment>
                    );
                })}
            </List>
        );
    }

    return (
        <Grid container spacing={3}>
            {posts.map((post) => {
                const { status, color } = getUserStatus(post.userId);
                return (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Paper
                            onClick={() => handleClick(post.id)}
                            onMouseEnter={() => handleMouseEnter(post.id)}
                            onMouseLeave={handleMouseLeave}
                            elevation={3}
                            style={{ padding: '10px', marginBottom: '10px', backgroundColor: hoveredPostId === post.id ? '#f0f0f0' : 'inherit' }}
                        >
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2">{post.body}</Typography>
                                <Typography variant="caption" style={{ color }}>{status}</Typography>
                            </CardContent>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default PostList;
