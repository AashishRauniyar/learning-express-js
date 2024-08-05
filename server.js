import express from 'express';
import path from 'path';
import {fileURLToPath} from'url';
import posts from './routes/posts.js';
const port = process.env.PORT || 8000;
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFoundHandler from './middleware/notFound.js';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express();


// Body parser middleware
app.use(express.json());

// URL encoded form data
app.use(express.urlencoded({ extended: false }));

// logger middle ware
app.use(logger)

// setup static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/posts', posts);




// Not found handler
app.use(notFoundHandler);
// Error handler
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});