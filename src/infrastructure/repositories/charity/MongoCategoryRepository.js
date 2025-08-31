import { CategoryModel } from '../../models/charity/categoryModel.js';
import { Category } from '../../../domain/charity/Category.js';

// Mapper
const toEntity = (doc) => doc ? new Category({
  id: doc._id.toString(),
  slug: doc.slug,
  title: doc.title,
  isVirtual: doc.isVirtual,
  entries: doc.entries?.map(e => ({ id: e.id, slug: e.slug, title: e.title, active: e.active })) ?? [],
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt
}) : null;

export class MongoCategoryRepository {
  async listAll() {
    const docs = await CategoryModel.find({}).sort({ isVirtual: 1, slug: 1 });
    return docs.map(toEntity);
  }
  async findBySlug(slug) {
    return toEntity(await CategoryModel.findOne({ slug }));
  }
  async save(category) {
    const up = await CategoryModel.findOneAndUpdate(
      { slug: category.slug },
      {
        $set: {
          title: category.title,
          isVirtual: !!category.isVirtual,
          entries: category.entries
        }
      },
      { new: true, upsert: true }
    );
    return toEntity(up);
  }
}
