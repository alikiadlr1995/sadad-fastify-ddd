// ESM
import fp from 'fastify-plugin';
import { MongoCategoryRepository } from '../../../infrastructure/repositories/charity/MongoCategoryRepository.js';
import { ListCategories } from '../../../application/charity/ListCategories.js';
import { GetCategoryBySlug } from '../../../application/charity/GetCategoyBySlug.js';
import { UpsertCategory } from '../../../application/charity/UpsertCategory.js';
import { slugParam, upsertCategoryBody } from '../schemas/charitySchemas.js';

async function routes(fastify) {
  const categoryRepo = new MongoCategoryRepository();

  fastify.get('/charity/categories', async (req, reply) => {
    const out = await ListCategories({ categoryRepo });
    reply.send(out.map(c => ({
      id: c.id, slug: c.slug, title: c.title, isVirtual: c.isVirtual,
      entries: c.entries.map(e => ({ id: e.id, slug: e.slug, title: e.title, active: e.active }))
    })));
  });

  fastify.get('/charity/categories/:slug', { schema: { params: slugParam } }, async (req, reply) => {
    const c = await GetCategoryBySlug({ categoryRepo }, { slug: req.params.slug });
    reply.send({
      id: c.id, slug: c.slug, title: c.title, isVirtual: c.isVirtual,
      entries: c.entries.map(e => ({ id: e.id, slug: e.slug, title: e.title, active: e.active }))
    });
  });

  fastify.post('/charity/categories', { schema: { body: upsertCategoryBody } }, async (req, reply) => {
    const saved = await UpsertCategory({ categoryRepo }, req.body);
    reply.code(201).send({
      id: saved.id, slug: saved.slug, title: saved.title, isVirtual: saved.isVirtual,
      entries: saved.entries.map(e => ({ id: e.id, slug: e.slug, title: e.title, active: e.active }))
    });
  });
}

export default fp(routes);
