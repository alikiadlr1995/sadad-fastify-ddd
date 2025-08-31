export const slugParam = {
  type: 'object',
  required: ['slug'],
  properties: { slug: { type: 'string', minLength: 2, maxLength: 64 } }
};

export const upsertCategoryBody = {
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
};

