const AllItem = require('../models/itemModel');

// Create a new item
// const createItem = async (req, res) => {
//   try {
//     const item = new AllItem(req.body);
//     await item.save();
//     res.status(201).json(item);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const createItem = async (req, res) => {
  try {
      const post = new Post({
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          subcategory: req.body.subcategory,
      });

      if (!req.file) {
          throw new Error('No file uploaded');
      }

      const image = req.file;

      const imagePath = {
          path: image.path,
          url: `"https://tracking-backend-ull9.onrender.com/uploads/${encodeURIComponent(image.filename)}`,
      };

      post.image = imagePath;

      const postData = await post.save();

      res.status(200).send({ success: true, msg: 'Item Data Successfully', data: postData });
  } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
  }
}

// Get items by subcategory and optional parentId
// const getItemsBySubcategory = async (req, res) => {
//   try {
//     const { subcategory, parentId } = req.query;
    
//     if (!subcategory) {
//       return res.status(400).json({ error: 'Subcategory query parameter is required' });
//     }
    
//     const filter = { subcategory };
//     if (parentId) {
//       filter.parentId = parentId;
//     }
    
//     const items = await AllItem.find(filter);
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const getItems = async (req, res) => {
  try {
    const items = await AllItem.find().populate("category").populate("subcategory"); // Retrieve all items from the database
    res.status(200).json(items); // Respond with the retrieved items and a 200 OK status
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respond with a 500 Internal Server Error status if an error occurs
  }
};

// Get a single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await AllItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an item by ID
const updateItemById = async (req, res) => {
  try {
    const item = await AllItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an item by ID
const deleteItemById = async (req, res) => {
  try {
    const item = await AllItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItemById,
  deleteItemById,
};
