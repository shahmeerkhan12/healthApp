import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [trends, setTrends] = useState<any[]>([]);
  const [recentRecords, setRecentRecords] = useState<any[]>([]);
  const [weeklySummary, setWeeklySummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [trendsRes, recordsRes] = await Promise.all([
        axios.get('/api/health/trends'),
        axios.get('/api/health/records')
      ]);
      setTrends(trendsRes.data.trends);
      const records = recordsRes.data.records;
      setRecentRecords(records.slice(0, 5));
      generateWeeklySummary(records);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const generateWeeklySummary = (records: any[]) => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekRecords = records.filter((r: any) => new Date(r.date) >= weekAgo);

    if (weekRecords.length === 0) {
      setWeeklySummary(null);
      return;
    }

    const avgPain = weekRecords.reduce((sum: number, r: any) => sum + (r.painLevel || 0), 0) / weekRecords.length;
    const avgEnergy = weekRecords.reduce((sum: number, r: any) => sum + (r.energyLevel || 0), 0) / weekRecords.length;
    const avgSleep = weekRecords.reduce((sum: number, r: any) => sum + (r.vitals?.sleepHours || 0), 0) / weekRecords.length;

    const summary = {
      recordCount: weekRecords.length,
      avgPain: avgPain.toFixed(1),
      avgEnergy: avgEnergy.toFixed(1),
      avgSleep: avgSleep.toFixed(1),
      painTrend: getPainTrend(weekRecords),
      energyTrend: getEnergyTrend(weekRecords),
      recommendations: generateRecommendations(avgPain, avgEnergy, avgSleep)
    };

    setWeeklySummary(summary);
  };

  const getPainTrend = (records: any[]) => {
    if (records.length < 2) return 'stable';
    const firstHalf = records.slice(0, Math.floor(records.length / 2));
    const secondHalf = records.slice(Math.floor(records.length / 2));
    const firstAvg = firstHalf.reduce((sum: number, r: any) => sum + (r.painLevel || 0), 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum: number, r: any) => sum + (r.painLevel || 0), 0) / secondHalf.length;
    if (secondAvg < firstAvg - 1) return 'improving';
    if (secondAvg > firstAvg + 1) return 'worsening';
    return 'stable';
  };

  const getEnergyTrend = (records: any[]) => {
    if (records.length < 2) return 'stable';
    const firstHalf = records.slice(0, Math.floor(records.length / 2));
    const secondHalf = records.slice(Math.floor(records.length / 2));
    const firstAvg = firstHalf.reduce((sum: number, r: any) => sum + (r.energyLevel || 0), 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum: number, r: any) => sum + (r.energyLevel || 0), 0) / secondHalf.length;
    if (secondAvg > firstAvg + 1) return 'improving';
    if (secondAvg < firstAvg - 1) return 'declining';
    return 'stable';
  };

  const generateRecommendations = (avgPain: number, avgEnergy: number, avgSleep: number) => {
    const recs = [];
    if (avgPain > 5) recs.push('Consider consulting a healthcare provider about your pain levels');
    if (avgEnergy < 5) recs.push('Try to increase physical activity and maintain a balanced diet');
    if (avgSleep < 7) recs.push('Aim for 7-9 hours of sleep per night for better recovery');
    if (avgSleep > 9) recs.push('Excessive sleep may indicate underlying issues - consider medical advice');
    if (recs.length === 0) recs.push('Keep up the good work! Your health metrics look great');
    return recs;
  };

  const downloadHealthReport = () => {
    const report = generateHealthReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  const generateHealthReport = () => {
    let report = '=== HEALTH MONITOR REPORT ===\n\n';
    report += `Generated: ${new Date().toLocaleString()}\n\n`;
    
    if (weeklySummary) {
      report += '--- WEEKLY SUMMARY ---\n';
      report += `Records Logged: ${weeklySummary.recordCount}\n`;
      report += `Average Pain Level: ${weeklySummary.avgPain}/10 (${weeklySummary.painTrend})\n`;
      report += `Average Energy Level: ${weeklySummary.avgEnergy}/10 (${weeklySummary.energyTrend})\n`;
      report += `Average Sleep: ${weeklySummary.avgSleep} hours\n\n`;
      
      report += '--- RECOMMENDATIONS ---\n';
      weeklySummary.recommendations.forEach((rec: string, idx: number) => {
        report += `${idx + 1}. ${rec}\n`;
      });
      report += '\n';
    }

    report += '--- RECENT RECORDS ---\n';
    recentRecords.forEach((record, idx) => {
      report += `\n${idx + 1}. ${new Date(record.date).toLocaleDateString()}\n`;
      if (record.painLevel) report += `   Pain: ${record.painLevel}/10\n`;
      if (record.energyLevel) report += `   Energy: ${record.energyLevel}/10\n`;
      if (record.vitals?.sleepHours) report += `   Sleep: ${record.vitals.sleepHours} hours\n`;
      if (record.mood) report += `   Mood: ${record.mood}\n`;
    });

    report += '\n\n--- END OF REPORT ---';
    return report;
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={downloadHealthReport} className="btn-download">
          📊 Download Health Report
        </button>
      </div>

      {weeklySummary && (
        <div className="weekly-summary card">
          <h2>📅 Weekly Summary (Last 7 Days)</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-icon">📝</div>
              <div className="summary-content">
                <div className="summary-value">{weeklySummary.recordCount}</div>
                <div className="summary-label">Records Logged</div>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon">😊</div>
              <div className="summary-content">
                <div className="summary-value">{weeklySummary.avgPain}/10</div>
                <div className="summary-label">Avg Pain ({weeklySummary.painTrend})</div>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon">⚡</div>
              <div className="summary-content">
                <div className="summary-value">{weeklySummary.avgEnergy}/10</div>
                <div className="summary-label">Avg Energy ({weeklySummary.energyTrend})</div>
              </div>
            </div>
            <div className="summary-item">
              <div className="summary-icon">😴</div>
              <div className="summary-content">
                <div className="summary-value">{weeklySummary.avgSleep}h</div>
                <div className="summary-label">Avg Sleep</div>
              </div>
            </div>
          </div>
          <div className="recommendations-section">
            <h3>💡 Recommendations</h3>
            <ul>
              {weeklySummary.recommendations.map((rec: string, idx: number) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="dashboard-grid">
        <div className="card">
          <h2>📈 Health Trends</h2>
          {trends.length === 0 ? (
            <p>No trends available yet. Start logging your health data!</p>
          ) : (
            trends.map((trend, idx) => (
              <div key={idx} className="trend-item">
                <h3>{trend.metric}</h3>
                <span className={`trend-badge ${trend.trend}`}>{trend.trend}</span>
                <p>{trend.recommendation}</p>
              </div>
            ))
          )}
        </div>

        <div className="card">
          <h2>📋 Recent Health Records</h2>
          {recentRecords.length === 0 ? (
            <p>No records yet. Add your first health record!</p>
          ) : (
            recentRecords.map((record) => (
              <div key={record._id} className="record-item">
                <div className="record-date">{new Date(record.date).toLocaleDateString()}</div>
                <div className="record-details">
                  {record.painLevel !== undefined && <span>😊 Pain: {record.painLevel}/10</span>}
                  {record.energyLevel !== undefined && <span>⚡ Energy: {record.energyLevel}/10</span>}
                  {record.vitals?.sleepHours && <span>😴 Sleep: {record.vitals.sleepHours}h</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="health-apps-section card">
        <h2>🔗 Connect Health Apps</h2>
        <p className="info-text">Connect your health tracking apps to automatically sync your data</p>
        <div className="health-apps-grid">
          <button className="health-app-btn" disabled>
            <span className="app-icon">📱</span>
            <span>Samsung Health</span>
            <span className="coming-soon">Coming Soon</span>
          </button>
          <button className="health-app-btn" disabled>
            <span className="app-icon">⌚</span>
            <span>Apple Health</span>
            <span className="coming-soon">Coming Soon</span>
          </button>
          <button className="health-app-btn" disabled>
            <span className="app-icon">🏃</span>
            <span>Google Fit</span>
            <span className="coming-soon">Coming Soon</span>
          </button>
          <button className="health-app-btn" disabled>
            <span className="app-icon">💪</span>
            <span>Fitbit</span>
            <span className="coming-soon">Coming Soon</span>
          </button>
        </div>
      </div>
    </div>
  );
}
