import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List } from '@mui/material';
import Comment from './Comment';

const CommentForm = ({ postId }) => {
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [comments, setComments] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || body.trim() === '') {
            return;
        }
        const newComment = {
            name: name,
            body: body,
        };

        if (editIndex !== null) {
            const updatedComments = [...comments];
            updatedComments[editIndex] = newComment;
            setComments(updatedComments);
            setEditIndex(null);
        } else {
            setComments([...comments, newComment]);
        }
        setName('');
        setBody('');
    };

    const handleEdit = (index) => {
        const commentToEdit = comments[index];
        setName(commentToEdit.name);
        setBody(commentToEdit.body);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedComments = [...comments];
        updatedComments.splice(index, 1);
        setComments(updatedComments);
        if (editIndex === index) {
            setEditIndex(null);
            setName('');
            setBody('');
        }
    };

    return (
        <Box>
            <List>
                {comments.map((comment, index) => (
                    <Comment
                        key={index}
                        comment={comment}
                        onDelete={() => handleDelete(index)}
                        onEdit={() => handleEdit(index)}
                    />
                ))}
            </List>
            <Typography variant="h5" gutterBottom sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                Bir Yorum Ekle
            </Typography>
            <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="İsim"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Yorum"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        {editIndex !== null ? 'Yorumu Güncelle' : 'Yeni Yorum'}
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default CommentForm;
