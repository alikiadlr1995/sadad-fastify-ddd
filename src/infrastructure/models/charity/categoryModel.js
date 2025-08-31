import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const EntrySchema = new Schema({
  id:    { type: String, required: true },                
  slug:  { type: String, required: true, lowercase: true, trim: true },
  title: { type: String, required: true, trim: true },
  active:{ type: Boolean, default: true }
}, { _id: false });

const CategorySchema = new Schema({
  slug:     { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  title:    { type: String, required: true, trim: true },
  isVirtual:{ type: Boolean, default: false },                
  entries:  { type: [EntrySchema], default: [] }
}, { timestamps: true });

CategorySchema.index({ 'entries.slug': 1 });

export const CategoryModel = model('Category', CategorySchema);
