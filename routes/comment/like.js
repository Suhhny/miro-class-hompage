/*
    AUTHOR: Suhhny
    CREATED: 20181120

    RESOURCE: /api/comment/like
    METHOD: POST
    DESCRIPTION: Comment like process on BoardShow

    QUERY: {
        id: string
    }

    BODY: { }

    res.data: {
        success: Bool
    }

    ERRORCODES
        -1: invalid token
        0: extra error
        1: no comment
*/

import express from 'express';
const router = express.Router();

import { Comment } from '../../models';

router.post('/', async (req, res) => {
    try{
        const comment = await Comment.findOne({ _id: req.query.id }).catch(() => res.status(500).json({ success: false, error: 0 }));

        if(!comment){
            return res.status(404).json({ success: false, error: 1 });
        }

        await comment.like++;
        await comment.save().catch(() => res.status(500).json({ success: false, error: 0 }));
        return res.status(204).json({ success: true });

    }catch(err){
        console.log(err);
        return res.status(500).json({ success: false, error: 0 });
    }
});

export default router;