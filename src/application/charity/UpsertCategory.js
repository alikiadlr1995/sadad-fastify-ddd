// ESM
import { randomUUID } from 'node:crypto';

export async function UpsertCategory({ categoryRepo }, payload) {
  const { slug, title, isVirtual = false, entries = [] } = payload;

  const normalizedEntries = entries.map(e => ({
    id: e.id || randomUUID(),
    slug: String(e.slug).toLowerCase().trim(),
    title: String(e.title).trim(),
    active: e.active !== false
  }));

  const saved = await categoryRepo.save({
    slug: String(slug).toLowerCase().trim(),
    title: String(title).trim(),
    isVirtual: !!isVirtual,
    entries: normalizedEntries
  });

  return saved;
}
