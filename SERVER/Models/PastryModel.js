import mongoose from 'mongoose';

const pastrySchema = mongoose.Schema({
  name: String,
  number: Number,
  order: Number,
});

const pastry = mongoose.model('pastry', pastrySchema);
export default pastry