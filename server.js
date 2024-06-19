import express from 'express';
import 'express-async-errors'; // Automatically handle async errors
import cors from 'cors';
import helmet from 'helmet';
import cronJobs from './cronJobs.js';
import notFoundMiddleware from './Middleware/not-found.js';
import errorHandlerMiddleware from './Middleware/error-handler.js';
import authMiddleware from './Middleware/authMiddleware.js';
import webRoutes from './Routes/Web/index.js';
import appRoutes from './Routes/App/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/web', webRoutes);
app.use('/api/app', appRoutes);



// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
