require('dotenv').config();
const express = require('express');
const { v4: uuid } = require('uuid');
const { isWebUri } = require('valid-url');
const logger = require('./logger')
const store = require('./store')


const bookmarksRouter = express.Router()
const bodyParser = express.json()


bookmarksRouter
.route('/bookmarks') //use with id to get bookmark route using id
.get((req, res) => {
  res.json(store.bookmarks) //return boookmarks data based upon body parser
})    

.post(bodyParser, (req, res)=>{
    for (const field of [ 'title', 'url', 'rating']) {
 //make sure arguments match body title, url, rating from store required
 if (!req.boody[field]) {
    logger.error(`${field} is required`); //field 
 return res.status(400).semd(`'${field}' is required`)
}
}

const { title, url, description, rating } = req.body

//rating
if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
  logger.error(`Invalid rating '${rating}' supplied`)
  return res.status(400).send(`'rating' must be a number between 0 and 5`)
}

//require url syntax
if (!isWebUri(url)) {
  logger.error(`Invalid url '${url}' supplied`)
  return res.status(400).send(`'url' must be a valid URL`)
}

const bookmark = { id: uuid(), title, url, description, rating }

store.bookmarks.push(bookmark)

logger.info(`Bookmark with id ${bookmark.id} created`)
res
  .status(201)
  .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
  .json(bookmark)
})


bookmarksRouter
  .route('/bookmarks/:bookmark_id')
  .get((req, res) => {
     const { bookmark_id } = req.params;
     const bookmark = store.bookmarks.find(c => c.id == bookmark_id);
     console.log(bookmark);
   
     // make sure we found a bookmark
     if (!bookmark) {
       logger.error(`Bookmark with id ${id} not found.`);
       return res
         .status(404)
         .send('Bookmark Not Found');
     }
   
     res.json(bookmark);
    });

    bookmarksRouter
    
    .delete((req, res) => {
      const { bookmark_id } = req.params;
    
      const bookmarksIndex = store.bookmarks.findbookmarksIndex(b => b.id == bookmarks_id);
      
      //remove bookmark from lists
      //assume bookmark ids are not duplicated in the bokmard ids array

      if (bookmarksIndex === -1) {
        logger.error(`Bookmark with id ${bookmark_id} not found.`);
        return res
          .status(404)
          .send('Bookmark Not found');
      }
    
    
      // lists.forEach(list => {
      //   const bookmarksdIds = list.bookmarksIds.filter(bid => bid !== Number(id) );
      //   list.bookmarksIds = bokmarksIds;
      // });
    
      store.bookmarks.splice(bookmarskIndex, 1);
    
      logger.info(`Bookmark with id ${bookmark_id} deleted.`);
    
      res
        .status(204)
        .end();
    })

 module.exports = bookmarksRouter; 