export const BRAND_NAME = "THE CASA BASICS";

export const BRAND_EMBLEM_URL = "https://lh3.googleusercontent.com/aida/AEtjO1X73iWtV_EK5ts4GNrKVrLbl6x86Hr1ZaOMRw9zqOImzLkKUXxUr9SmN8UVh2eONmm42TNlg4l5ogbDznNUOrd_Rsys24QQl6kp62u2pbn5N81_3s7WStnosfDz0QV12R9_GLcBlSRaHK28rv5JpzX5hxrQaizfD2Y1TGvx_FShoCh5-pSejnp95nZ9cE5I5rCfnh8WEqDLw-l8JtUAzvBkuOhsiZiiAaLMLcZN_1gp";

export const USER_PROFILE_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuAC1R3GpMeYQlYYk5jcY3_mLxLWXxvdPg7FSDdhBk-DGv9tKFcBWBjmK9uJcmtUhTYcihb2qXKYPpXLs29FA-mItuOBVjIvpHlIHYlBJkXjNYNPgTBuExVWCsWiPErRulVUmZ-WMB6LV4iscHxAUXG96U-1eyS3ZZpixRYcpxH-gcqO8AlCx86rPxpo5YsGaTYHmQHARIHX1Go00d-7RgMo9GEKfGeJp42e5fszpTE";

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'apps', count: 12 },
  { id: 'cookware', name: 'Cookware', icon: 'skillet', count: 48 },
  { id: 'prep', name: 'Prep & Cutlery', icon: 'flatware', count: 36 },
  { id: 'pantry', name: 'Pantry Storage', icon: 'kitchen', count: 52 },
  { id: 'dining', name: 'Dining Sets', icon: 'table_bar', count: 28 },
  { id: 'bakeware', name: 'Bakeware', icon: 'bakery_dining', count: 19 },
  { id: 'eco', name: 'Eco Friendly', icon: 'eco', count: 15 },
];

export const PRODUCTS = [
  {
    id: 1,
    title: "Nordic Cast Iron Dutch Oven",
    subtitle: "Sage Mist • 5.5 Qt",
    category: "cookware",
    material: "Enamelled Cast Iron",
    price: 89,
    origPrice: 119,
    discountTag: "Save 25%",
    badge: "Best Seller #1",
    stock: "Only 4 left!",
    rating: 4.9,
    reviewCount: 512,
    colors: [
      { name: "Sage Mist", hex: "#5E7A68" },
      { name: "Warm Terracotta", hex: "#C86446" },
      { name: "Oatmeal Cream", hex: "#ECE5D8" },
      { name: "Slate Charcoal", hex: "#3F4843" }
    ],
    sizes: [
      { name: "3.5 Qt", capacity: "2–3 Servings", price: 69, orig: 95 },
      { name: "5.5 Qt", capacity: "4–6 Servings", price: 89, orig: 119, isDefault: true, tag: "Standard" },
      { name: "7.2 Qt", capacity: "6–8+ Family", price: 115, orig: 149 }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvRB6y_fM8gTI4ehGJsubC5kcs_X86MRWpNdduZus0Uwe5S-fe1QyXmRNdwvC_KsU4n8A7PcDBMMMJdMc1CjTshizabJkjNKkax4RRQRrcqHyO59y2Hlf0ipwxtxl8ylasOx11dreYWTpcv-EbAwx82g0BuKcmzjhxzEwo2JCWwm09vjEJxgkIKtZQ5fwdAcRJEgUs81Uh8Fq4lTd1jJZPbilerv_tm1bHjgixO0g",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYPtFNZjul-t4NIY0vwaBUvOgwRNVP9dqaDAjCwBR1tLgKgRuloR_T_HJJt0G_oiI0IMK6Oy0Ah1fLqkqJCc9ytWlKMhqxVkJphIO9ILzqdyVLKUiBMFfcOsalJ50SHdbok8sho3PmMOe7XIIX2jgeWOZETwIFg2XwO4b3n-wDd3ib_9em_psxXVGxD8QKLv511PyY1Io1DQmy3TBmf9xZPB-JW4h4CzAbw6xcs64",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCE2jQVcXsh6r5NsmANmnnAYzkkQPpMTrW3G_EFslyhAhHnByqP22qwMmcc8W1vd1rhTKYmhRyksjOhKQM8qgKv23ctamtFHQFgfCRclXuUI08VqjHcgBjNlQKsjjHP79jWNacCYLaPOV3KFZp4aMkNx4l27HtCUBPbBDMoRyY8KtwUs2SMWODbSQb6mIZMGXDxlR2zQXLwN_q2rH_89KmChLAHai-TAIyROqD54fs",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9DpkpJm32LAj5cTxJ8Ld16p1rLgcwQepj5b8ZVNTBPNnyEZrxLPE3Oyo_dA_pvAK4dTG9pRHxttJ0i3K6Rsd_98QYwX7V7-7SjBw90v3A-M8omyOetS5yXKm96F8inDZac_T8BNwCmIYUB2XlHhNC3xxnvUYwA14aIBmahL1VUOg6JGLbUB_Q3m59w6Zr-Gcqsnq1ilPWTtmjSwKV77sS0rIOeKmYZrdAuPdfy04"
    ],
    description: "Handcrafted heritage pieces designed for deliberate slow feasts. Heavy cast iron locks in natural aromas with our signature self-basting condensation dots and brushed brass hardware.",
    features: [
      { title: "Chip-Proof Vitreous", desc: "Smooth micro-porous glaze resists cracking & acid staining." },
      { title: "Multi-Stove Heat Ready", desc: "Oven safe up to 500°F (260°C), compatible with induction, gas, & ceramic." },
      { title: "Self-Basting Lid", desc: "Continuous internal droplet system redistributes moisture back into meats & stews." },
      { title: "Ergonomic Brass Knob", desc: "Solid brushed satin brass hardware designed for safe grip with oven mitts." }
    ],
    specs: {
      "Weight": "11.4 lbs (5.17 kg)",
      "Dimensions": "11.2\" Diameter x 6.4\" Height",
      "Oven Safe": "Up to 500°F (260°C)",
      "Cleaning": "Dishwasher safe; hand washing recommended for lifetime sheen",
      "Origin": "Designed in Copenhagen, artisanal molded in Alsace"
    }
  },
  {
    id: 2,
    title: "Artisan 8\" Damascus Santoku Knife",
    subtitle: "67-Layer Steel • Olive Wood",
    category: "prep",
    material: "Damascus Steel & Olive Wood",
    price: 64,
    origPrice: 78,
    discountTag: "-18%",
    badge: "Craftsmen Grade",
    stock: "In Stock",
    rating: 4.9,
    reviewCount: 420,
    colors: [
      { name: "Olive Wood", hex: "#9E734A" },
      { name: "Dark Walnut", hex: "#4A3222" }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxtsOYLd0uul6tbhxaL7VdeFk7opaaUWQpqGwco38a8oq9bhl1ubtfMKeN0uBLQFXgXFR_4L9TD9E2NU0tVDjTz4CIqI792Qx4aB65IBpRfO63YeFBJDvi03tKjH8pQVYBSLiJkROR6BZB_UBvRnkwhn9vZYtWVqtzEQklqjmLR6IG7D8KClnGK4qm20vQAw41NsWYMAJ1mLudsLsEgx-PwfTxysgiRk8Q_sMySfM"
    ],
    description: "Hand-forged 67-layer Japanese steel with organic octagonal olive wood handle. Razor-sharp 15-degree double bevel blade for effortless paper-thin slices.",
    features: [
      { title: "67-Layer Forged Steel", desc: "VG-10 high-carbon core core encased in 66 layers of stainless damascus." },
      { title: "Octagonal Grip", desc: "Traditional Japanese Wa-handle crafted from sustainably aged Italian olive wood." }
    ],
    specs: {
      "Blade Length": "8.0 inches (203 mm)",
      "Hardness": "60±1 HRC Rockwell",
      "Handle Material": "Natural Italian Olive Wood",
      "Weight": "195 grams"
    }
  },
  {
    id: 3,
    title: "Borosilicate Airtight Spice Jars",
    subtitle: "12-Piece Set • Bamboo Lids",
    category: "pantry",
    material: "Borosilicate Glass",
    price: 38,
    origPrice: 48,
    discountTag: "Eco Friendly",
    badge: "12-Piece Set",
    stock: "In Stock",
    rating: 4.8,
    reviewCount: 310,
    colors: [
      { name: "Natural Bamboo", hex: "#C2A27A" },
      { name: "Dark Walnut", hex: "#654321" }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEg0TE6U-fP_fFJpFfJ-NV1PpjXr5JbEaf5--anWxiHaP7CH8Pu5_o8fABIroyJjtRwxjcT5HMiqoDC9jrjQ3uaAJW7nIj4jX3fTslXGzzFcD4ETwiw5-wMXWfE-EnkSL1iPd-Ype36OIoQdiGQ1kNNHyjzLRIcIsH7KE0pP3CeuQ3K66CH4Mr4zjHgf3MN3X0f9HACiwREudVfB8y9zyoeHQTf1fdvMOjLGsmi2Y"
    ],
    description: "Keep whole spices, sea salts, and specialty herbs hermetically sealed with borosilicate clarity and sustainable bamboo lids.",
    features: [
      { title: "Airtight Silicone Ring", desc: "100% moisture and insect barrier ensures spices maintain essential oils." },
      { title: "Pure Borosilicate", desc: "Ultra-clear lab grade glass that resists odor absorption and clouding." }
    ],
    specs: {
      "Set Quantity": "12 Glass Jars with Lids",
      "Capacity": "4.2 fl oz (125 ml) per jar",
      "Lid Material": "Sustainably harvested bamboo",
      "Labels": "Includes 48 minimalist water-resistant pantry labels"
    }
  },
  {
    id: 4,
    title: "Organic Washed Flax Apron",
    subtitle: "Terracotta • One Size",
    category: "dining",
    material: "Pure Flax Linen",
    price: 32,
    origPrice: 42,
    discountTag: "Pure Flax",
    badge: "Natural Fiber",
    stock: "In Stock",
    rating: 4.9,
    reviewCount: 165,
    colors: [
      { name: "Terracotta", hex: "#C86446" },
      { name: "Oat Linen", hex: "#ECE5D8" },
      { name: "Nordic Sage", hex: "#5E7A68" }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJiqRgfmpe_l8UtjUtT3QwXOZpcoPZEbVY4Nqg1YNtzEki2DFsX-GK9JFNZLtj7NIYh8lIhrVJhkYrR27fGdtWKAtC6cXNkmj4DR4Obz8KNxBdZhC7AJY3_tInOhANnHeTXr_oCXw8IYVDQjJBkDwfWlCh4vxPtfrKgy6rEwBAWm6kbGRMI6RuTDhPtpY8ksTE8gpMmGvmW3i_vwNPVxu_1rq_cuWBbUVn4GcuWY4"
    ],
    description: "Stone-washed French flax linen apron with Japanese cross-back design. No ties or neck strain, softening with every wash for a vintage heirloom drape.",
    features: [
      { title: "Cross-Back Comfort", desc: "Distributes weight evenly across shoulders without neck friction." },
      { title: "Deep Kangaroo Pockets", desc: "Dual reinforced front pockets for timers, tasting spoons, and hand towels." }
    ],
    specs: {
      "Material": "100% French Stone-Washed Flax (240 GSM)",
      "Fit": "Relaxed Japanese Cross-Back, Universal Sizing",
      "Care": "Machine wash cold gentle, air dry recommended"
    }
  },
  {
    id: 5,
    title: "Stoneware Pour-Over Carafe & Dripper",
    subtitle: "Oat Cream • Ribbed Matte Glaze",
    category: "dining",
    material: "Stoneware Ceramic",
    price: 42,
    origPrice: 54,
    discountTag: "Free Cotton Filter",
    badge: "Artisanal",
    stock: "In Stock",
    rating: 4.8,
    reviewCount: 112,
    colors: [
      { name: "Oat Cream", hex: "#E5DACE" },
      { name: "Terracotta", hex: "#B36044" },
      { name: "Sage Green", hex: "#758E7D" }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdE6CVWsV2JATM_AmUdFcB9OyTDL_TYeF1l6zBgtQczgP2k9Js6Oixy8J4wj3koJU9DOjBVWTL4pc2O-RXhpP9G2vKvYA-_c3zyDlLydMbcujf0QfvZ1ZBstjbVI2QndT5SEbLN2jCQeGneQ0a17eB9kpu-GGOjU5H6IQVR7gQbM-a4C7hJ3pFMCuny72D-mTnvbKJ0Ddru0kARHKMheTcmREhzEX-SSpJYLfGQNY"
    ],
    description: "Slow coffee ritual made tactile. Wheel-thrown stoneware dripper with internal spiral extraction ribs designed for uniform water dispersion.",
    features: [
      { title: "Internal Spiral Flutes", desc: "Optimizes coffee extraction velocity and bloom aeration." },
      { title: "Heat Retentive Clay", desc: "Thick ceramic walls maintain brewing temperatures at optimum 92°C." }
    ],
    specs: {
      "Capacity": "24 fl oz (700 ml / 2-3 cups)",
      "Material": "Kiln-fired ceramic stoneware",
      "Filter Size": "Compatible with standard #02 conical filters"
    }
  },
  {
    id: 6,
    title: "Hand-Turned Acacia Salad Bowl & Servers",
    subtitle: "Solid Acacia • Heirloom Grain",
    category: "prep",
    material: "Acacia Hardwood",
    price: 48,
    origPrice: 62,
    discountTag: "Low Stock (3)",
    badge: "Heirloom Craft",
    stock: "Only 3 left!",
    rating: 4.9,
    reviewCount: 86,
    colors: [
      { name: "Natural Dark Acacia", hex: "#654321" },
      { name: "Honey Ash", hex: "#9E734A" }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMoBsh-92BRW2pVlJgZmPW_HxHm977YjXPDqz_m9uQS_UWEcnlnit-EAdInaJMMh4K3A3WLj-XmFb6ai87Gl9KEF9t0mzWC7Onb2m4EYpVdlOGYdzipUvKqAkWvn4clmWYPF-1tVv8BrsqZ0likUfQQFaeUsJzztks6dbLum87vxM7KujeCEMHhcsQxjRQ6czMxatHZoh-fHzEZd5H0OH1w-ZJlGxuVDLx_tD0mNo"
    ],
    description: "Carved from single pieces of responsibly sourced acacia wood. Finished with certified food-grade cold-pressed walnut oil for silky non-toxic luster.",
    features: [
      { title: "Seamless Monoblock", desc: "No glue seams or veneers; carved from a single dense hardwood trunk." },
      { title: "Matching Servers Included", desc: "Ergonomic wide paddle spoons designed for gentle toss without bruising greens." }
    ],
    specs: {
      "Bowl Diameter": "12.0 inches (30.5 cm)",
      "Server Length": "11.5 inches (29 cm)",
      "Finish": "Pure food-safe walnut oil"
    }
  },
  {
    id: 7,
    title: "Non-Stick Ceramic Sauté Pan 11\"",
    subtitle: "Toxin-Free • Brass Ergonomic Handle",
    category: "cookware",
    material: "Stainless & Ceramic",
    price: 58,
    origPrice: 72,
    discountTag: "-20%",
    badge: "Eco Friendly",
    stock: "In Stock",
    rating: 4.7,
    reviewCount: 240,
    colors: [
      { name: "Sage Green", hex: "#5E7A68" },
      { name: "Terracotta", hex: "#C86446" },
      { name: "Charcoal Matte", hex: "#363A37" }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWBAOTXjVnwMVYjKBojK8xKiZUOwMp8H72XHx3bOlhLnbhZMacEBjD7I601MeWHFQsO5zQ59aJ98NYyB51dGjNZLbxnVRGN3LDOlr3h3xHE5f5b4IhmlE3cXr6B8dKH4uRuhzeTBmH174pZfT_qrlfv9w_A2sWLfazZzKV9M5hRi2CdzYw3jLRbMppQenD6pixbNg6whMvAczmaMKrushVahlki-2L8NvB65u_xmI"
    ],
    description: "Silky smooth ceramic mineral non-stick coating entirely free of PTFE, PFOA, lead, and cadmium. Heats up 40% faster with induction-grade multi-ply base.",
    features: [
      { title: "Mineral Non-Stick", desc: "Eggs and delicate fillets glide effortlessly with minimal butter or oil." },
      { title: "Stay-Cool Brass Handle", desc: "Die-cast hollow handle dissipates cooktop heat for safe handling." }
    ],
    specs: {
      "Diameter": "11 inches (28 cm)",
      "Coating": "Titanium-infused Sol-Gel Ceramic",
      "Stove Compatibility": "Induction, Gas, Electric, Glass"
    }
  },
  {
    id: 8,
    title: "Stackable Ceramic Pantry Containers (Set of 4)",
    subtitle: "Oatmeal Matte • Airtight Oak Lids",
    category: "pantry",
    material: "Ceramic & Oak",
    price: 36,
    origPrice: 48,
    discountTag: "Sustainable",
    badge: "Set of 4",
    stock: "In Stock",
    rating: 4.9,
    reviewCount: 178,
    colors: [
      { name: "Oatmeal Matte", hex: "#EDE7DF" },
      { name: "Earthy Sage", hex: "#758E7D" }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCBdU5D9f3KYbVsqNORtRdL4w3xnb_Wbgmw0kZprY7Cl_uWChwelUYalpgR1wLYQaSPzjuSNwx6tPsLADy2J_64Qq1tu53ucC0yrKVx7IUY5FjYSbnkf-ui1IC2VylnvZxrmQ-pqhMeRqTjravSWfv8I8NDETIClnV7V6WmO9-7HMKC58ePSmfWSM0nSgy0432w3o8hsVHsDUC0Dwb7Pb4E8yVeA_kVr25kwRrDjg"
    ],
    description: "Architectural ceramic canisters that stack cleanly to maximize vertical kitchen storage while shielding dry goods from light degradation.",
    features: [
      { title: "Light-Blocking Ceramic", desc: "Protects coffee beans, teas, and whole grains from UV light degradation." },
      { title: "Stackable Rim Geometry", desc: "Recessed lid rims seat firmly for safe modular stacking." }
    ],
    specs: {
      "Sizes Included": "Small (16 oz), Medium (28 oz), Large (42 oz), Tall (64 oz)",
      "Lids": "Solid FSC-certified White Oak with Food-grade silicone gasket"
    }
  },
  {
    id: 9,
    title: "Magnetic Walnut Knife Block & 4 Prep Knives",
    subtitle: "Solid Walnut • Damascus Steel",
    category: "prep",
    material: "American Walnut",
    price: 128,
    origPrice: 165,
    discountTag: "Artisan Set",
    badge: "Master Set",
    stock: "In Stock",
    rating: 5.0,
    reviewCount: 94,
    colors: [
      { name: "American Walnut", hex: "#4A3222" },
      { name: "Light Oak", hex: "#C2A27A" }
    ],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCan6EvjSy8I0iI2VChKi8B_UpX9VU7PaP_TDCdrK_pUFtIggohXvNaSXTxrT67tz-lUymnS5cX1togx2BsUDysHAw1hMxAHdj8rEeTia-EST2ab-cClw-GnF9S0QnPs3LqPqN0NFBMPrXY8aF7g6HkIYqfahI5zuE64BxVd0ZioCl2QacFGSlrIgMMiZ9Afsjb4OinJGfsxuXqdWTUDHxTSX5ONH8xNtpx-WOTO0I"
    ],
    description: "Freestanding architectural magnetic block displaying cutlery with hygienic open air drying and instant culinary access.",
    features: [
      { title: "Dual-Sided Neodymium", desc: "Invisible ultra-strong rare-earth magnets hold knives firmly on both sides." },
      { title: "Includes 4 Core Blades", desc: "Chef's knife, Santoku, Nakiri vegetable cleaver, and Paring knife." }
    ],
    specs: {
      "Dimensions": "10.5\" Height x 9.0\" Width x 4.0\" Depth",
      "Steel Grade": "VG-10 67-Layer Damascus",
      "Block Wood": "Solid North American Black Walnut"
    }
  }
];

export const STARTER_BUNDLE_WEEK = {
  id: "bundle-starter-kit",
  title: "The Minimalist Starter Kit",
  subtitle: "Dutch Oven + Damascus Santoku + Washed Flax Apron",
  price: 140,
  origPrice: 185,
  savings: 45,
  description: "Essential Dutch oven, artisan santoku, and organic flax apron in one bundled keepsake set.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjW3BiaWytClXJjEXy8ABq5GkoWJn9nhVFP2rB8an-6tSztNRQRPUDnE2_n2vfJXEcKkPiwtNuTFjm3fVICJppvXy-nrX3LYh-wcOKtlESrKzSVrN8bszl5oRDsHvaQXKtGbsIslMguGANv4zH9cdVjI4I6GHI8cCoK98BNC1JZDG0m5YbU8brcLMgMoPgpLPlTBxYsfeOPAKXWngKp1NX7ciNEOBgA3l1VeiAULs"
};

