import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Comment = ({ comment, onEdit, onDelete }) => {
    return (
        <Card sx={{ mb: 2, p: 2 }} >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" component="div">{comment.name}</Typography>
                    <Box>
                        <IconButton onClick={onEdit} color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={onDelete} color="primary">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" component="div">{comment.body}</Typography>
            </CardContent>
        </Card>
    );
};

export default Comment;
