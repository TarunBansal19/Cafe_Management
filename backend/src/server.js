import dotenv from 'dotenv';
import app from './app.js'
import {prisma} from './lib/prisma.ts'

dotenv.config();

const PORT = process.env.PORT || 3000;

await prisma.$connect();
console.log('DB connected');

app.listen(PORT , ()=> console.log(`Server is running at port : ${PORT}`));
