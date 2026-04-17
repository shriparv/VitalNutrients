export type NutrientType = 'Vitamin' | 'Mineral' | 'Fat' | 'Protein' | 'Carbohydrate' | 'Fiber' | 'Water';
export type NutrientCategory = 'Macro' | 'Micro';

export interface Nutrient {
  id: string;
  name: string;
  category: NutrientCategory;
  type: NutrientType;
  importance: string;
  effects: string;
  benefits: string[];
  deficiency: {
    effects: string;
    symptoms: string[];
  };
  sources: string[];
}

export interface SymptomAnalysis {
  possibleDeficiencies: string[];
  explanation: string;
  recommendations: string[];
}
