import recursiveClean from './recursiveClean';
import type { Product, ElasticDoc } from './types/product';

function isGlutenFree(product: Product): boolean {
  if (product.markedFreeFrom?.includes('FREE_FROM_GLUTEN')) return true;
  if (product.allergenInfo?.CONTAINS == null) return false;
  const { CONTAINS } = product.allergenInfo;
  const glutenCodes = ['AY', 'AW'];
  return !CONTAINS.some((code) => glutenCodes.includes(code));
}

function isLowGluten(product: Product): boolean {
  if (product.markedFreeFrom?.includes('VERY_LOW_GLUTEN')) return true;
  return isGlutenFree(product);
}

function isMilkFree(product: Product): boolean {
  if (product.markedFreeFrom?.includes('FREE_FROM_MILK')) return true;
  if (product.allergenInfo?.CONTAINS == null) return false;
  const { CONTAINS } = product.allergenInfo;
  return !CONTAINS.includes('AM');
}

function isLactoseFree(product: Product): boolean {
  if (
    isMilkFree(product) ||
    Boolean(product.markedFreeFrom?.includes('FREE_FROM_LACTOSE'))
  ) {
    return true;
  }
  if (product.allergenInfo?.CONTAINS == null) return false;
  const { CONTAINS } = product.allergenInfo;
  const lactoseCodes = ['AM', 'ML'];
  return !CONTAINS.some((code) => lactoseCodes.includes(code));
}

function isLowLactose(product: Product): boolean {
  if (product.markedFreeFrom?.includes('REDUCED_LACTOSE')) return true;
  return isLactoseFree(product);
}

function isPeanutFree(product: Product): boolean {
  if (product.markedFreeFrom?.includes('FREE_FROM_PEANUTS')) return true;
  if (product.allergenInfo?.CONTAINS == null) return false;
  const { CONTAINS } = product.allergenInfo;
  return !CONTAINS.includes('AP');
}

function isNutFree(product: Product): boolean {
  if (product.allergenInfo?.CONTAINS == null) return false;
  const { CONTAINS } = product.allergenInfo;
  const nutCodes = ['AN', 'AP'];
  return !CONTAINS.some((code) => nutCodes.includes(code));
}

export default function convertToElastic(doc: Product): ElasticDoc {
  /* eslint-disable @typescript-eslint/naming-convention */
  const { name, brand, category, description, subBrand: sub_brand } = doc;
  const ret = recursiveClean({
    id: doc.gtin,
    name,
    brand,
    sub_brand,
    category,
    description,
    gluten_free: isGlutenFree(doc),
    low_gluten: isLowGluten(doc),
    milk_free: isMilkFree(doc),
    lactose_free: isLactoseFree(doc),
    low_lactose: isLowLactose(doc),
    peanut_free: isPeanutFree(doc),
    nut_free: isNutFree(doc),
    has_price: doc.lowestPrice != null,
    has_product_group: doc.productGroup != null,
    product_group_id: doc.productGroup?.id,
    product_group_name: doc.productGroup?.searchTerm || doc.productGroup?.name,
    product_data: doc,
  });
  return ret;
  /* eslint-enable @typescript-eslint/naming-convention */
}
