import express from 'express';
import path from 'path';
import {fileURLToPath} from'url';
import posts from './routes/posts.js';
const port = process.env.PORT || 8000;
import logger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import notFoundHandler from './middleware/notFound.js';
import mongoose from 'mongoose';
import Blog from './models/blog.js';
// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express();


// connect to mongodb
const dbURI = "mongodb+srv://acisraw:acisraw@nodejs.35zse.mongodb.net/node-js?retryWrites=true&w=majority&appName=nodejs"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=>app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }))
    .catch((err)=>console.log(err));


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

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res)=>{
    const blog = new Blog(
        {
            title: 'new blog 3',
            snippet: 'about my new blog',
            body: 'more about my new blog'

        }
    );

    blog.save()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });

})


app.get('/all-blogs', (req, res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
}
)

app.get('/single-blog',(req,res)=>{
    Blog.findById('66b266e7424e3c5da41ba408')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });

})




// Not found handler
app.use(notFoundHandler);
// Error handler
app.use(errorHandler);
