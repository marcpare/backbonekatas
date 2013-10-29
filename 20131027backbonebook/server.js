var application_root = __dirname,
express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
microdb = require('nodejs-microdb');

var myDB = new microdb({
  'file':'books.db',
  'datatype':1,
  'flushonexit':true
});

//mongoose.connect('mongodb://localhost/library_database');
var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});
var BookModel = mongoose.model('Book', Book);

var app = express();
app.configure(function(){
  // parses request body and populate request.body
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, 'site')));
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.get('/api', function(request, response){
  response.send('i am runnin');
});

app.get('/api/books', function(request, response){
  var books = myDB.findAllWithKey('title');
  return response.send(
    books.map(function(ident){ 
      var book = myDB.data[ident];
      book.id = ident;
      return book; })
  );
});

app.get('/api/books/:id', function(request, response){
  var book = myDB.data[request.params.id];
  return response.send(book);
  /*
  return BookModel.findById(request.params.id, function(err, book){
    if(!err){ return response.send(book); }
    else{ return console.log(err); }
  });
  */
});

app.put('/api/books/:id', function(request, response){
  console.log('updating book ' + request.body.title);
  var book = myDB.data[request.params.id];
  book.title = request.body.title;
  book.author = request.body.author;
  book.releaseDate = request.body.releaseDate;
  book.keywords = request.body.keywords;
  myDB.save();
  return response.send(book);
});

app.post('/api/books', function(request, response){
  /*
  var book = new BookModel({
    title: request.body.title,
    author: request.body.author,
    releaseDate: request.body.releaseDate
  });
  book.save(function(err){
    if(!err){ return console.log('created'); }
    else { return console.log(err); }
  });
  return response.send(book);
  */
  var book = {
    title: request.body.title,
    author: request.body.author,
    releaseDate: request.body.releaseDate,
    keywords: request.body.keywords
  };
  var ident = myDB.add(book);
  myDB.save();
  return response.send(book);
});

app.delete('/api/books/:id', function(request, response){
  console.log('deleting book with id: '+request.params.id);
  myDB.del(request.params.id);
  myDB.save();
})

var port = 4711;
app.listen(port, function(){
  console.log('Express server listening on port %d is %s mode', port, app.settings.env);
});
