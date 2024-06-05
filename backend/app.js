// Import required modules
const express = require('express');
const multer=require('multer')
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
require("./dbcon")
const Item = require("./service")
app.use(express.json());
app.use(cors());


const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });
app.post('/api/items', upload.single('image'), async (req, res) => {
  try {
    const newItem = new Item({
      itemName: req.body.itemName,
      price: req.body.price,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype
      }
    });
    await newItem.save();
    res.status(200).json({ message: 'Item with image uploaded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading item with image' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    if (req.query.id) {
      // If an 'id' query parameter is provided, fetch specific item data
      const item = await Item.findById(req.query.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      return res.json(item);
    } else {
      // If no 'id' query parameter is provided, fetch all item data
      const items = await Item.find();
      return res.json(items);
    }
  } catch (error) {
    // If there's an error, send an error response
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try{
    const {id} = req.params;
    const item = await Item.findByIdAndDelete(id);
    if(!item){
      return res.status(404).json({message: "product not Found!"});
    }
    res.status(200).json({message:"Product deleted Successfully!"});
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
});



// PUT endpoint to update an item by ID
app.put('/api/items/:id', async (req, res) => {
  try{
  const {id} = req.params;
 const item = await Item.findByIdAndUpdate(id,req.body);
 if(!item){
  return res.status(404).json({message:"not found"});
 }
}catch(error){
res.status(500).json({message:error.message});
}
});



// Start the server

app.listen(PORT);
