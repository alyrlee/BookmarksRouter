require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { NODE_ENV } = require('./config');
const { v4: uuid } = require('uuid');
const logger = require('../src/logger')
const app = express();
app.use(express.json());

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'dev';

app.use(morgan(morganOption));
app.use(cors());


const bookmarksRouter = express.Router()
const bodyParser = express.json()


// Write a route handler for the endpoint GET /bookmarks that returns a list of bookmarks
// Write a route handler for the endpoint GET /bookmarks/:id that returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid
// Write a route handler for POST /bookmarks that accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.
// Write a route handler for the endpoint DELETE /bookmarks/:id that deletes the bookmark with the given ID.


bookmarksRouter
.route('/bookmarks')
.get((req, res) => {
  res.json(store.bookmarks)
})    

.post(bodyParser, (req, res)=>{
     const { title, content } = req.body
 if (!title) {
    logger.error(`Title is required`);
 return res
})
})

app.get('/bookmarksRouter', (req, res) => {
    });

    if (!bookmarks) {
        logger.error(`Can't locate bookmark.`);
        return res
          .status(404)
          .send('Bookmark Not Found');
      }
    
      res.json(bookmarks);
    });

    
app.get('/bookmarksRouter/:id', (req, res) => {
     });

     const { id } = req.params;
     const list = lists.find(li => li.id === Number(id));
   
     // make sure we found a list
     if (!list) {
       logger.error(`List with id ${id} not found.`);
       return res
         .status(404)
         .send('List Not Found');
     }
   
     res.json(list);

 app.post('/bookmarksRouter', (req, res) => {
    const { title, content } = req.body;

    if (!title) {
      logger.error('Title is required');
      return res
        .status(400)
        .send('Invalid data');
    } 
    if (!content) {
        logger.error('Content is required');
        return res
          .status(400)
          .send('Invalid data');
      }
    
      // get an id
      const id = uuid();
      const bookmarks = {
        id,
        title,
        description
      };
    
      bookmarks.push(bookmarks);
    
      logger.info(`Bookmark with id ${id} created`);
    
      res
        .status(201)
        .location(`http://localhost:8000/bokmarks/${id}`)
        .json(bookmarks);
    });
    
      // check bookmarks IDs
      if (bookmarksIds.length > 0) {
        let valid = true;
        bookmarksIds.forEach(cid => {
          const bookmarks = bookmarks.find(c => b.id === Number(bid));
          if (!bookmarks) {
            logger.error(`Bookmark Card with id ${cid} not found in bookmarks array.`);
            valid = false;
          }
        });
    
        if (!valid) {
          return res
            .status(400)
            .send('Invalid data');
        }
      }
    
      // get an id
      const id = uuid();
    
      const list = {
        id,
        header,
        bookmarksIds
      };
    
      lists.push(list);
    
      logger.info(`List with id ${id} created`);
    
      res
        .status(201)
        .location(`http://localhost:8000/list/${id}`)
        .json({ id });
    });
    
    
    app.delete((req, res) => {
      const { bookmarks_id } = req.params;
    
      const bookmarksIndex = store.bookmarks.findbookmarksIndex(b => b.id == bookmarks_id);
    
      if (bookmarksIndex === -1) {
        logger.error(`Bookmark with id ${bookmark_id} not found.`);
        return res
          .status(404)
          .send('Bookmark Not found');
      }
    
      //remove card from lists
      //assume cardIds are not duplicated in the cardIds array
      lists.forEach(list => {
        const bookmarksdIds = list.bookmarksIds.filter(bid => bid !== Number(id) );
        list.bookmarksIds = bokmarksIds;
      });
    
      store.bookmarks.splice(bookmarskIndex, 1);
    
      logger.info(`Bookmark with id ${bookmarks_id} deleted.`);
    
      res
        .status(204)
        .end();
    })

 module.exports = bookmarksRouter;   
    
    