import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Activities.css';

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', scheduledTime: '', duration: '', type: 'exercise', intensity: 'medium'
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('/api/activity');
      setActivities(response.data.activities);
    } catch (error) {
      console.error('Failed to fetch activities', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/activity', formData);
      setShowForm(false);
      fetchActivities();
      setFormData({ title: '', scheduledTime: '', duration: '', type: 'exercise', intensity: 'medium' });
    } catch (error) {
      console.error('Failed to add activity', error);
    }
  };

  const checkActivity = async (activityId: string) => {
    try {
      const response = await axios.post(`/api/activity/check/${activityId}`);
      alert(`Recommendation: ${response.data.recommendation.reason}`);
    } catch (error) {
      console.error('Failed to check activity', error);
    }
  };

  return (
    <div className="activities">
      <div className="header">
        <h1>Activities</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Activity'}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h2>New Activity</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Activity Title" value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            <input type="datetime-local" value={formData.scheduledTime}
              onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})} required />
            <input type="number" placeholder="Duration (minutes)" value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})} required />
            <button type="submit" className="btn-primary">Add Activity</button>
          </form>
        </div>
      )}

      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity._id} className="card activity-card">
            <h3>{activity.title}</h3>
            <p>{new Date(activity.scheduledTime).toLocaleString()}</p>
            <p>{activity.duration} minutes</p>
            <button onClick={() => checkActivity(activity._id)} className="btn-secondary">
              Check Recommendation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
