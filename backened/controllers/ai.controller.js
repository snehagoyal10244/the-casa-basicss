/**
 * AI Kitchen Assistant Controller
 *
 * IMPORTANT: No actual AI service is connected.
 * This controller returns the static prompt library (same data as the frontend's
 * aiPromptsData.js) and provides an honest stub for the chat endpoint.
 * When a real AI service (e.g. Gemini, OpenAI) is integrated, replace the
 * /chat handler with actual API calls.
 */

const AI_PROMPTS = [
  {
    id: "sourdough",
    label: "Making Homemade Sourdough 🥖",
    title: "Artisan Sourdough Plan",
    dish: "Country Sourdough Boule",
    summary: "Sourdough hinges on moisture control during the initial bake and tension during shaping.",
    steps: [
      { step: "Step 1: Autolyse", text: "Rest flour & water 45m" },
      { step: "Step 2: Coil Folds", text: "4 turns every 30m" },
      { step: "Step 3: Proofing", text: "Cold retard 12–16h" },
      { step: "Step 4: Steam Bake", text: "20m lidded @ 230°C" }
    ],
    matchScore: "98% Kitchen Compatibility"
  },
  {
    id: "curry",
    label: "Authentic Thai Green Curry 🍛",
    title: "Vibrant Thai Curry Plan",
    dish: "Aromatic Coconut Green Curry",
    summary: "Crush whole aromatics to release essential oils, then split the coconut cream over steady high heat.",
    steps: [
      { step: "Step 1: Paste Fry", text: "Fry herbs till oil separates" },
      { step: "Step 2: Simmer Stock", text: "Add kaffir leaves & poultry" },
      { step: "Step 3: Veggie Infusion", text: "Bamboo shoots & eggplants" },
      { step: "Step 4: Finish & Fragrance", text: "Sweet Thai basil & fish sauce" }
    ],
    matchScore: "96% Kitchen Compatibility"
  },
  {
    id: "storage",
    label: "Small Kitchen Organization 🗄️",
    title: "Mindful Space Workflow",
    dish: "Japandi Pantry Stacking System",
    summary: "Clear counter clutter with modular stackable ceramic and airtight borosilicate glassware.",
    steps: [
      { step: "Step 1: Decant", text: "Transfer dry goods to glass" },
      { step: "Step 2: Tiered Zones", text: "Group spices by cook frequency" },
      { step: "Step 3: Vertical Racks", text: "Hang knives and spatulas" },
      { step: "Step 4: Labeling", text: "Minimal typographic tags" }
    ],
    matchScore: "99% Kitchen Compatibility"
  },
  {
    id: "dinner",
    label: "Host a 6-person Dinner 🍷",
    title: "Feast Preparation Blueprint",
    dish: "Braised Short Ribs & Table Setting",
    summary: "Deliberate slow cooking with one-pot Dutch oven braise, served straight to the dining table.",
    steps: [
      { step: "Step 1: Deep Sear", text: "Caramelize meat in Dutch oven" },
      { step: "Step 2: Aromatics", text: "Shallots, wine, and rosemary" },
      { step: "Step 3: Slow Braise", text: "3.5h @ 160°C undisturbed" },
      { step: "Step 4: Table Service", text: "Rest 20m before carving" }
    ],
    matchScore: "97% Kitchen Compatibility"
  }
];

// ── GET /api/ai/prompts ───────────────────────────────────
exports.getPrompts = (req, res) => {
  res.json({ success: true, prompts: AI_PROMPTS });
};

// ── POST /api/ai/chat ─────────────────────────────────────
exports.chat = (req, res) => {
  // Stub — returns an honest message explaining no AI is connected.
  res.json({
    success: true,
    stub: true,
    message: "The AI Kitchen Assistant is not yet connected to a live AI service. " +
             "To enable real responses, configure an AI provider (e.g. Google Gemini, OpenAI) " +
             "and replace the stub handler in controllers/ai.controller.js.",
    echo: req.body.message || null,
  });
};

