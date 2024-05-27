import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, deleteComment, updateComment } from '../../redux/commentsSlice';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Container, Typography, List, Button, TextField, Backdrop, CircularProgress } from '@mui/material';

const PostDetail = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { comments, status } = useSelector((state) => state.comments);
    const [editingComment, setEditingComment] = useState(null);
    const [updatedBody, setUpdatedBody] = useState('');

    useEffect(() => {
        dispatch(getComments(postId));
    }, [dispatch, postId]);

    const handleEdit = (comment) => {
        setEditingComment(comment.id);
        setUpdatedBody(comment.body);
    };

    const handleDelete = (commentId) => {
        dispatch(deleteComment(commentId));
    };

    const handleUpdate = (commentId) => {
        dispatch(updateComment({ id: commentId, body: updatedBody }));
        setEditingComment(null);
    };

    if (status === 'loading') {
        return <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    if (status === 'failed') {
        return <Typography>İçerikler Yüklenirken Hata Oluştu, Lütfen Tekrar Deneyin</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Yorumlar
            </Typography>
            <List>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        {editingComment === comment.id ? (
                            <div>
                                <TextField
                                    fullWidth
                                    value={updatedBody}
                                    onChange={(e) => setUpdatedBody(e.target.value)}
                                />
                                <Button onClick={() => handleUpdate(comment.id)}>Güncelle</Button>
                            </div>
                        ) : (
                            <Comment comment={comment} onEdit={() => handleEdit(comment)} onDelete={() => handleDelete(comment.id)} />
                        )}
                    </div>
                ))}
            </List>
            <CommentForm postId={postId} />
        </Container>
    );
};

export default PostDetail;
