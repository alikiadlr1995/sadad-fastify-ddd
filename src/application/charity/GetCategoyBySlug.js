export async function GetCategoryBySlug({ categoryRepo }, { slug }) {
  const cat = await categoryRepo.findBySlug(slug);
  if (!cat) {
    const err = new Error('Category not found');
    err.statusCode = 404;
    throw err;
  }
  return cat;
}
