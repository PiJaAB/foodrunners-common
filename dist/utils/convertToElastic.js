"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recursiveClean_1 = __importDefault(require("./recursiveClean"));
function isGlutenFree(product) {
    var _a, _b;
    if ((_a = product.markedFreeFrom) === null || _a === void 0 ? void 0 : _a.includes('FREE_FROM_GLUTEN'))
        return true;
    if (((_b = product.allergenInfo) === null || _b === void 0 ? void 0 : _b.CONTAINS) == null)
        return false;
    const { CONTAINS } = product.allergenInfo;
    const glutenCodes = ['AY', 'AW'];
    return !CONTAINS.some((code) => glutenCodes.includes(code));
}
function isLowGluten(product) {
    var _a;
    if ((_a = product.markedFreeFrom) === null || _a === void 0 ? void 0 : _a.includes('VERY_LOW_GLUTEN'))
        return true;
    return isGlutenFree(product);
}
function isMilkFree(product) {
    var _a, _b;
    if ((_a = product.markedFreeFrom) === null || _a === void 0 ? void 0 : _a.includes('FREE_FROM_MILK'))
        return true;
    if (((_b = product.allergenInfo) === null || _b === void 0 ? void 0 : _b.CONTAINS) == null)
        return false;
    const { CONTAINS } = product.allergenInfo;
    return !CONTAINS.includes('AM');
}
function isLactoseFree(product) {
    var _a, _b;
    if (isMilkFree(product) ||
        Boolean((_a = product.markedFreeFrom) === null || _a === void 0 ? void 0 : _a.includes('FREE_FROM_LACTOSE'))) {
        return true;
    }
    if (((_b = product.allergenInfo) === null || _b === void 0 ? void 0 : _b.CONTAINS) == null)
        return false;
    const { CONTAINS } = product.allergenInfo;
    const lactoseCodes = ['AM', 'ML'];
    return !CONTAINS.some((code) => lactoseCodes.includes(code));
}
function isLowLactose(product) {
    var _a;
    if ((_a = product.markedFreeFrom) === null || _a === void 0 ? void 0 : _a.includes('REDUCED_LACTOSE'))
        return true;
    return isLactoseFree(product);
}
function isPeanutFree(product) {
    var _a, _b;
    if ((_a = product.markedFreeFrom) === null || _a === void 0 ? void 0 : _a.includes('FREE_FROM_PEANUTS'))
        return true;
    if (((_b = product.allergenInfo) === null || _b === void 0 ? void 0 : _b.CONTAINS) == null)
        return false;
    const { CONTAINS } = product.allergenInfo;
    return !CONTAINS.includes('AP');
}
function isNutFree(product) {
    var _a;
    if (((_a = product.allergenInfo) === null || _a === void 0 ? void 0 : _a.CONTAINS) == null)
        return false;
    const { CONTAINS } = product.allergenInfo;
    const nutCodes = ['AN', 'AP'];
    return !CONTAINS.some((code) => nutCodes.includes(code));
}
function convertToElastic(doc) {
    var _a, _b, _c;
    /* eslint-disable @typescript-eslint/naming-convention */
    const { name, brand, category, description, subBrand: sub_brand } = doc;
    const ret = recursiveClean_1.default({
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
        product_group_id: (_a = doc.productGroup) === null || _a === void 0 ? void 0 : _a.id,
        product_group_name: ((_b = doc.productGroup) === null || _b === void 0 ? void 0 : _b.searchTerm) || ((_c = doc.productGroup) === null || _c === void 0 ? void 0 : _c.name),
        product_data: doc,
    });
    return ret;
    /* eslint-enable @typescript-eslint/naming-convention */
}
exports.default = convertToElastic;
