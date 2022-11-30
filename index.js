import cookieParser from 'cookie-parser';
import 'dotenv/config';
import "./database/connectdb.js";
import express from 'express';
import cors from "cors";

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.router.js';
import roleRouter from './routes/role.router.js';
import configurationRouter from './routes/configuration.router.js';
import schoolRouter from './routes/school.router.js';
import linkRouter from './routes/link.route.js';
import teacherRouter from './routes/teacher.router.js';
const app = express();

const whiteList = [
    process.env.ORIGIN1,
    process.env.ORIGIN2
];

app.use(cors({
    origin: function(origin, callback) {
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin);
        }

        return callback("Error de CORS: " + origin + " No autorizado!");
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/configuration', configurationRouter);
app.use('/api/v1/school', schoolRouter);
app.use('/api/v1/teacher', teacherRouter);
app.use('/api/v1/links', linkRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("http://localhost:" + PORT))