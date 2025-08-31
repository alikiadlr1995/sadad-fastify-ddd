export async function ListCategories({ categoryRepo }) {
  const items = await categoryRepo.listAll();
  return items;
}
