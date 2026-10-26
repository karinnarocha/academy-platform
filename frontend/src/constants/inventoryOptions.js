export const OTHER = "Other...";

export const CATEGORIES = ["Merch", "Supply"];

const KIDS_GI_SIZES = ["M000", "M00", "M0", "M1", "M2", "M3", "M4"];
const ADULT_GI_SIZES = ["A0", "A1", "A2", "A3", "A4", "A5"];
const SHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const GI_COLORS = ["White", "Blue", "Black"];
const BELT_COLORS = ["White", "Grey", "Yellow", "Orange", "Green", "Blue", "Purple", "Brown", "Black"];

// Each item lists its sizes and colors. Empty list = no dropdown options (only "Other...").
export const ITEMS = {
    Merch: {
        "Kids Gi": { sizes: KIDS_GI_SIZES, colors: GI_COLORS },
        "Adult Gi": { sizes: ADULT_GI_SIZES, colors: GI_COLORS },
        Rashguard: { sizes: SHIRT_SIZES, colors: ["Black", "White"] },
        Shorts: { sizes: SHIRT_SIZES, colors: ["Black"] },
        "T-Shirt": { sizes: SHIRT_SIZES, colors: ["Black", "White"] },
        Hoodie: { sizes: SHIRT_SIZES, colors: ["Black", "Grey"] },
        Belt: { sizes: [...KIDS_GI_SIZES, ...ADULT_GI_SIZES], colors: BELT_COLORS },
    },
    Supply: {
        "Mat Tape": { sizes: [], colors: [] },
        "Cleaning Spray": { sizes: [], colors: [] },
        "Mat Cleaner": { sizes: [], colors: [] },
        "First Aid Kit": { sizes: [], colors: [] },
    },
};

// "Kids Gi · M1 · White"
export function productLabel(product) {
    return [product.item, product.size, product.color].filter(Boolean).join(" · ");
}