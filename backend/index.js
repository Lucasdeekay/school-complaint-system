const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { port, mongoURI } = require('./config');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/', authRoutes);
app.use('/complaints', complaintRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

