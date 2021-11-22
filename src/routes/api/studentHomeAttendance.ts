import express, { Request, Response } from 'express';
const router = express.Router();
import authMiddleware from './../../middleware/auth';
import dayjs from 'dayjs';

/*
@route    api/posts
@desc     Test Route
@access   Public 
*/

interface StudentReqInterface {
    fromDate: Date;
    toDate: Date;
    studentEmail: string;
}

router.get('/', authMiddleware, (req: Request, res: Response) => {
    console.log(req.query);
    const fromDate: string = req.query['fromDate'] as string;
    const toDate: string = req.query['toDate'] as string;
    const studentEmail: string = req.query['studentEmail'] as string;
    const fromDateString = dayjs(fromDate).format('DD-MM-YYYY');
    const toDateString = dayjs(toDate).format('DD-MM-YYYY');
    console.log(fromDateString);
    console.log(toDateString);
    console.log(studentEmail);
    res.json(req.query);
});

export default router;
