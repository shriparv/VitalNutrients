import { Nutrient } from '../types';

export const NUTRIENTS: Nutrient[] = [
  // MACROS
  {
    id: 'protein',
    name: 'Protein',
    category: 'Macro',
    type: 'Protein',
    importance: 'The building blocks of body tissue.',
    effects: 'Used for building and repairing muscles, skin, enzymes, and hormones.',
    benefits: ['Muscle growth', 'Tissue repair', 'Enzyme production', 'Immune function'],
    deficiency: {
      effects: 'Causes muscle wasting and weakened immunity.',
      symptoms: ['Edema', 'Fatty liver', 'Skin/hair issues', 'Loss of muscle mass']
    },
    sources: ['Chicken', 'Lentils', 'Eggs', 'Tofu', 'Greek Yogurt', 'Quinoa']
  },
  {
    id: 'carbohydrates',
    name: 'Carbohydrates',
    category: 'Macro',
    type: 'Carbohydrate',
    importance: 'The body\'s primary source of energy.',
    effects: 'Broken down into glucose to fuel the brain and muscles.',
    benefits: ['Brain function', 'Energy regulation', 'Digestive health (via fiber)'],
    deficiency: {
      effects: 'Ketosis, lethargy, and decreased physical performance.',
      symptoms: ['Fatigue', 'Headaches', 'Constipation', 'Bad breath']
    },
    sources: ['Oats', 'Brown Rice', 'Sweet Potatoes', 'Fruits', 'Whole Wheat']
  },
  {
    id: 'healthy-fats',
    name: 'Healthy Fats',
    category: 'Macro',
    type: 'Fat',
    importance: 'Essential for hormone production and nutrient absorption.',
    effects: 'Provides energy and supports cell growth.',
    benefits: ['Hormone balance', 'Heart health', 'Vitamin absorption (A, D, E, K)', 'Brain protection'],
    deficiency: {
      effects: 'Hormonal imbalances and dry skin.',
      symptoms: ['Dry skin', 'Brittle nails', 'Constant hunger', 'Inability to focus']
    },
    sources: ['Avocado', 'Olive Oil', 'Walnuts', 'Salmon', 'Chia Seeds']
  },

  // MICROS - VITAMINS
  {
    id: 'vitamin-a',
    name: 'Vitamin A (Retinol)',
    category: 'Micro',
    type: 'Vitamin',
    importance: 'Crucial for vision, growth, and cell division.',
    effects: 'Acts as an antioxidant and supports eye health.',
    benefits: ['Night vision', 'Skin health', 'Immune support', 'Reproduction'],
    deficiency: {
      effects: 'Can lead to night blindness and increased infection risk.',
      symptoms: ['Dry eyes', 'Night blindness', 'Scaly skin', 'Frequent respiratory infections']
    },
    sources: ['Carrots', 'Spinach', 'Sweet Potato', 'Beef Liver', 'Egg Yolks']
  },
  {
    id: 'vitamin-c',
    name: 'Vitamin C (Ascorbic Acid)',
    category: 'Micro',
    type: 'Vitamin',
    importance: 'Vital for collagen synthesis and antioxidant protection.',
    effects: 'Protects cells from damage and aids in wound healing.',
    benefits: ['Collagen production', 'Iron absorption', 'Immune defense', 'Wound healing'],
    deficiency: {
      effects: 'Scurvy, weakened blood vessels, and poor healing.',
      symptoms: ['Bleeding gums', 'Easy bruising', 'Joint pain', 'Slow wound healing']
    },
    sources: ['Oranges', 'Bell Peppers', 'Strawberries', 'Broccoli', 'Kiwi']
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D (Calciferol)',
    category: 'Micro',
    type: 'Vitamin',
    importance: 'Regulates calcium and phosphate in the body.',
    effects: 'Crucial for bone health and muscle function.',
    benefits: ['Bone density', 'Calcium absorption', 'Mood regulation', 'Immune health'],
    deficiency: {
      effects: 'Rickets in children and osteomalacia in adults.',
      symptoms: ['Bone pain', 'Muscle weakness', 'Fatigue', 'Low mood/Depression']
    },
    sources: ['Sunlight', 'Fatty Fish', 'Fortified Milk', 'Egg Yolks', 'Mushrooms (exposed to UV)']
  },
  {
    id: 'vitamin-b12',
    name: 'Vitamin B12 (Cobalamin)',
    category: 'Micro',
    type: 'Vitamin',
    importance: 'Essential for red blood cell formation and nerve function.',
    effects: 'Critical for DNA synthesis and brain health.',
    benefits: ['Energy levels', 'Red blood cell production', 'Nervous system health', 'Cognitive function'],
    deficiency: {
      effects: 'Anemia and neurological problems.',
      symptoms: ['Tingling in hands/feet', 'Memory loss', 'Pale skin', 'Shortness of breath']
    },
    sources: ['Milk', 'Beef', 'Salmon', 'Cheese', 'B12 Fortified Cereals']
  },

  // MICROS - MINERALS
  {
    id: 'iron',
    name: 'Iron',
    category: 'Micro',
    type: 'Mineral',
    importance: 'A key component of hemoglobin.',
    effects: 'Transports oxygen from the lungs to the rest of the body.',
    benefits: ['Oxygen transport', 'Energy metabolism', 'Focus', 'Immune health'],
    deficiency: {
      effects: 'Anemia, leading to extreme tiredness.',
      symptoms: ['Fatigue', 'Brittle nails', 'Cold hands and feet', 'Paleness']
    },
    sources: ['Red Meat', 'Spinach', 'Beans', 'Pumpkin Seeds', 'Quinoa']
  },
  {
    id: 'magnesium',
    name: 'Magnesium',
    category: 'Micro',
    type: 'Mineral',
    importance: 'Involved in over 300 biochemical reactions.',
    effects: 'Supports muscle and nerve function, and energy production.',
    benefits: ['Muscle relaxation', 'Nervous system regulation', 'Protein synthesis', 'Blood pressure control'],
    deficiency: {
      effects: 'Can cause muscle cramps and cardiac issues.',
      symptoms: ['Muscle cramps', 'Insomnia', 'Anxiety', 'Fatigue', 'Migraines']
    },
    sources: ['Dark Chocolate', 'Almonds', 'Black Beans', 'Bananas', 'Spinach']
  },
  {
    id: 'zinc',
    name: 'Zinc',
    category: 'Micro',
    type: 'Mineral',
    importance: 'Vital for immune function and protein synthesis.',
    effects: 'Helps the immune system fight off bacteria and viruses.',
    benefits: ['Immune system strength', 'Taste and smell', 'DNA synthesis', 'Metabolism function'],
    deficiency: {
      effects: 'Stunted growth and impaired immune response.',
      symptoms: ['Hair loss', 'Loss of appetite', 'Slow wound healing', 'Impaired taste']
    },
    sources: ['Oysters', 'Beef', 'Chickpeas', 'Cashews', 'Hemp Seeds']
  },
  {
    id: 'calcium',
    name: 'Calcium',
    category: 'Micro',
    type: 'Mineral',
    importance: 'The most abundant mineral in the body.',
    effects: 'Essential for blood clotting, muscle contraction, and heart rhythm.',
    benefits: ['Bone health', 'Teeth strength', 'Nerve transmission', 'Muscle function'],
    deficiency: {
      effects: 'Osteoporosis and increased fracture risk.',
      symptoms: ['Weak bones', 'Muscle spasms', 'Numbness in fingers', 'Abnormal heart rhythm']
    },
    sources: ['Milk', 'Kale', 'Sardines', 'Yogurt', 'Fortified Juices']
  },
  {
    id: 'potassium',
    name: 'Potassium',
    category: 'Micro',
    type: 'Mineral',
    importance: 'Essential for fluid balance and nerve signals.',
    effects: 'Helps maintain normal levels of fluid inside our cells.',
    benefits: ['Healthy blood pressure', 'Heart function', 'Muscle contractions', 'Fluid balance'],
    deficiency: {
      effects: 'Hypokalemia, leading to muscle paralysis or heart rhythm problems.',
      symptoms: ['Muscle weakness', 'Digestive issues', 'Heart palpitations', 'Muscle aches']
    },
    sources: ['Bananas', 'Potatoes', 'Avocado', 'Spinach', 'Coconut Water']
  }
];
