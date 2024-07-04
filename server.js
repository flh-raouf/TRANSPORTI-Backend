import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import notFoundMiddleware from './Middleware/not-found.js';
import errorHandlerMiddleware from './Middleware/error-handler.js';
import webRoutes from './Routes/Web/index.js';
import appRoutes from './Routes/App/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json({limit : '100mb'}));
app.use(express.urlencoded({limit : '100mb', extended : true }));

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
