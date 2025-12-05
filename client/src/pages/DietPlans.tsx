import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/DietPlans.css';

export default function DietPlans() {
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('/api/diet/recommendations?goal=general health');
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="diet-plans">
      <h1>Diet Recommendations</h1>

      {recommendations && (
        <div className="recommendations">
          <div className="card">
            <h2>Suggestions</h2>
            <ul>
              {recommendations.suggestions.map((suggestion: string, idx: number) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2>Foods to Include</h2>
            <div className="food-tags">
              {recommendations.foodsToInclude.map((food: string, idx: number) => (
                <span key={idx} className="tag tag-green">{food}</span>
              ))}
            </div>
          </div>

          {recommendations.foodsToAvoid.length > 0 && (
            <div className="card">
              <h2>Foods to Avoid</h2>
              <div className="food-tags">
                {recommendations.foodsToAvoid.map((food: string, idx: number) => (
                  <span key={idx} className="tag tag-red">{food}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
