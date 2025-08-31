export class Category {
  constructor({ id, slug, title, entries = [], isVirtual = false, createdAt, updatedAt }) {
    if (!slug) throw new Error('Category.slug is required');
    if (!title) throw new Error('Category.title is required');

    this.id = id;                 
    this.slug = slug;             
    this.title = title;            
    this.entries = entries;        
    this.isVirtual = isVirtual;    
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  enableEntry(entrySlug) {
    const e = this.entries.find(x => x.slug === entrySlug);
    if (!e) throw new Error('Entry not found');
    e.active = true;
  }
}
