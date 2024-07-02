import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));  // Add this line to enable logging

app.get('/', (req, res) => {
    res.send('Webhook Tester Backend is running');
  });
  

app.post('/webhooks', async (req, res) => {
    const { url, event } = req.body;
    console.log(`Received webhook creation request: URL=${url}, Event=${event}`); // Custom log statement
    const webhook = await prisma.webhook.create({
      data: {
        url,
        event
      }
    });
    console.log(`Webhook created with ID=${webhook.id}`); // Custom log statement
    res.status(201).json(webhook);
  });
  

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
