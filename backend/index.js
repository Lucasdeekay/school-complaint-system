// backend/index.js
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { port as _port, mongoURI } from './config';
import authRoutes from './routes/authRoutes';
import complaintRoutes from './routes/complaintRoutes';

const app = express();
const port = _port;

app.use(cors());
app.use(json());

// MongoDB connection
connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api', authRoutes);
app.use('/api/complaints', complaintRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
