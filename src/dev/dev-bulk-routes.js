import fp from 'fastify-plugin';
import { CategoryModel } from '../infrastructure/models/charity/categoryModel.js';

const bulkInsertSchema = {
  body: {
    type: 'array',
    minItems: 1,
    items: {
      type: 'object',
      required: ['slug', 'title'],
      properties: {
        slug:      { type: 'string', minLength: 2, maxLength: 64 },
        title:     { type: 'string', minLength: 1, maxLength: 128 },
        isVirtual: { type: 'boolean', default: false },
        entries: {
          type: 'array',
          default: [],
          items: {
            type: 'object',
            required: ['slug', 'title'],
            properties: {
              id:     { type: 'string' },
              slug:   { type: 'string', minLength: 2, maxLength: 64 },
              title:  { type: 'string', minLength: 1, maxLength: 128 },
              active: { type: 'boolean', default: true }
            }
          }
        }
      }
    }
  }
};

const bulkUpdateSchema = {
  body: {
    type: 'object',
    required: ['filter', 'update'],
    properties: {
      filter:  { type: 'object', additionalProperties: true },
      update:  { type: 'object', additionalProperties: true },
      options: { type: 'object', additionalProperties: true }
    }
  }
};

function normalizeCategory(c) {
  return {
    slug: String(c.slug).toLowerCase().trim(),
    title: String(c.title).trim(),
    isVirtual: !!c.isVirtual,
    entries: (c.entries ?? []).map(e => ({
      id: e.id ?? String(e.slug).toLowerCase().trim(),
      slug: String(e.slug).toLowerCase().trim(),
      title: String(e.title).trim(),
      active: e.active !== false
    }))
  };
}

async function devBulkRoutes(fastify) {

  fastify.post('/dev/charity/bulk-insert', { schema: bulkInsertSchema }, async (req, reply) => {
    const normalized = req.body.map(normalizeCategory);


    const ops = normalized.map(c => ({
      updateOne: {
        filter: { slug: c.slug },
        update: {
          $set: {
            title: c.title,
            isVirtual: c.isVirtual,
            entries: c.entries
          },
          $setOnInsert: { slug: c.slug }
        },
        upsert: true
      }
    }));

    const res = await CategoryModel.bulkWrite(ops, { ordered: false });

    const slugs = normalized.map(c => c.slug);
    const docs = await CategoryModel.find({ slug: { $in: slugs } });

    reply.code(201).send({
      matched:   res.matchedCount ?? 0,
      modified:  res.modifiedCount ?? 0,
      upserted:  res.upsertedCount ?? 0,
      categories: docs.map(d => ({
        id: d._id.toString(),
        slug: d.slug,
        title: d.title,
        isVirtual: d.isVirtual,
        entries: (d.entries ?? []).map(e => ({
          id: e.id, slug: e.slug, title: e.title, active: e.active
        }))
      }))
    });
  });

  fastify.patch('/dev/charity/bulk-update', { schema: bulkUpdateSchema }, async (req, reply) => {
    const { filter, update, options = {} } = req.body;

    const res = await CategoryModel.updateMany(
      filter,
      update,
      { runValidators: true, ...options }
    );

    const matched  = res.matchedCount  ?? res.n  ?? 0;
    const modified = res.modifiedCount ?? res.nModified ?? 0;
    reply.send({ matched, modified });
  });
}

export default fp(devBulkRoutes);
