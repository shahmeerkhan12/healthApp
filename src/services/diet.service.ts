import { DietRecommendation } from '../models/Diet';
import { HealthRecord } from '../models/HealthRecord';

export class DietService {
  generateDietRecommendations(healthRecords: HealthRecord[], userGoal: string): DietRecommendation {
    const avgEnergyLevel = this.calculateAverageEnergy(healthRecords);
    const hasPain = healthRecords.some(r => (r.painLevel || 0) > 5);

    const recommendations: DietRecommendation = {
      goal: userGoal,
      suggestions: [],
      foodsToInclude: [],
      foodsToAvoid: []
    };

    // Energy-based recommendations
    if (avgEnergyLevel < 5) {
      recommendations.suggestions.push('Increase iron-rich foods for better energy');
      recommendations.foodsToInclude.push('Spinach', 'Lean meats', 'Beans', 'Nuts');
    }

    // Pain management diet
    if (hasPain) {
      recommendations.suggestions.push('Include anti-inflammatory foods');
      recommendations.foodsToInclude.push('Fatty fish', 'Berries', 'Turmeric', 'Green tea');
      recommendations.foodsToAvoid.push('Processed foods', 'Excess sugar', 'Trans fats');
    }

    // General health
    recommendations.suggestions.push('Stay hydrated - aim for 8 glasses of water daily');
    recommendations.foodsToInclude.push('Fruits', 'Vegetables', 'Whole grains');

    return recommendations;
  }

  private calculateAverageEnergy(records: HealthRecord[]): number {
    const energyRecords = records.filter(r => r.energyLevel !== undefined);
    if (energyRecords.length === 0) return 5;
    return energyRecords.reduce((sum, r) => sum + (r.energyLevel || 0), 0) / energyRecords.length;
  }
}
