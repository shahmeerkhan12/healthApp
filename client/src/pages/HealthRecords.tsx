import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/HealthRecords.css';

export default function HealthRecords() {
  const [records, setRecords] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    painLevel: '',
    painLocation: '',
    energyLevel: '',
    mood: '',
    vitals: { sleepHours: '', heartRate: '', weight: '' },
    notes: ''
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get('/api/health/records');
      setRecords(response.data.records);
    } catch (error) {
      console.error('Failed to fetch records', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/health/records/${editingId}`, formData);
      } else {
        await axios.post('/api/health/records', formData);
      }
      setShowForm(false);
      setEditingId(null);
      fetchRecords();
      resetForm();
    } catch (error) {
      console.error('Failed to save record', error);
    }
  };

  const handleEdit = (record: any) => {
    setEditingId(record._id);
    setFormData({
      painLevel: record.painLevel || '',
      painLocation: record.painLocation || '',
      energyLevel: record.energyLevel || '',
      mood: record.mood || '',
      vitals: {
        sleepHours: record.vitals?.sleepHours || '',
        heartRate: record.vitals?.heartRate || '',
        weight: record.vitals?.weight || ''
      },
      notes: record.notes || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`/api/health/records/${id}`);
        fetchRecords();
      } catch (error) {
        console.error('Failed to delete record', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      painLevel: '', painLocation: '', energyLevel: '', mood: '',
      vitals: { sleepHours: '', heartRate: '', weight: '' }, notes: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    resetForm();
  };

  const getPainIcon = (level: string) => {
    const num = parseInt(level) || 0;
    if (num === 0) return '😊';
    if (num <= 3) return '😐';
    if (num <= 6) return '😟';
    if (num <= 8) return '😣';
    return '😫';
  };

  const getPainLabel = (level: string) => {
    const num = parseInt(level) || 0;
    if (num === 0) return 'No Pain';
    if (num <= 3) return 'Mild';
    if (num <= 6) return 'Moderate';
    if (num <= 8) return 'Severe';
    return 'Very Severe';
  };

  const getEnergyIcon = (level: string) => {
    const num = parseInt(level) || 0;
    if (num === 0) return '😴';
    if (num <= 3) return '😪';
    if (num <= 6) return '😐';
    if (num <= 8) return '🙂';
    return '⚡';
  };

  const getEnergyLabel = (level: string) => {
    const num = parseInt(level) || 0;
    if (num === 0) return 'Exhausted';
    if (num <= 3) return 'Low';
    if (num <= 6) return 'Moderate';
    if (num <= 8) return 'Good';
    return 'Excellent';
  };

  return (
    <div className="health-records">
      <div className="header">
        <h1>Health Records</h1>
        <button onClick={() => { setShowForm(!showForm); if (showForm) handleCancel(); }} className="btn-primary">
          {showForm ? 'Cancel' : 'Add Record'}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <h2>{editingId ? 'Edit Health Record' : 'New Health Record'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Pain Level (0-10) {getPainIcon(formData.painLevel)}</label>
                <input type="range" min="0" max="10" value={formData.painLevel || 0}
                  onChange={(e) => setFormData({...formData, painLevel: e.target.value})} />
                <div className="level-display">
                  <span className="level-value">{formData.painLevel || 0}</span>
                  <span className="level-label">{getPainLabel(formData.painLevel)}</span>
                </div>
              </div>
              <div className="form-group">
                <label>Energy Level (0-10) {getEnergyIcon(formData.energyLevel)}</label>
                <input type="range" min="0" max="10" value={formData.energyLevel || 0}
                  onChange={(e) => setFormData({...formData, energyLevel: e.target.value})} />
                <div className="level-display">
                  <span className="level-value">{formData.energyLevel || 0}</span>
                  <span className="level-label">{getEnergyLabel(formData.energyLevel)}</span>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Pain Location</label>
                <input type="text" value={formData.painLocation}
                  onChange={(e) => setFormData({...formData, painLocation: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Mood</label>
                <input type="text" value={formData.mood}
                  onChange={(e) => setFormData({...formData, mood: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Sleep Hours</label>
                <input type="number" step="0.5" value={formData.vitals.sleepHours}
                  onChange={(e) => setFormData({...formData, vitals: {...formData.vitals, sleepHours: e.target.value}})} />
              </div>
              <div className="form-group">
                <label>Heart Rate</label>
                <input type="number" value={formData.vitals.heartRate}
                  onChange={(e) => setFormData({...formData, vitals: {...formData.vitals, heartRate: e.target.value}})} />
              </div>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea value={formData.notes} rows={3}
                onChange={(e) => setFormData({...formData, notes: e.target.value})} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Save'} Record</button>
              <button type="button" onClick={handleCancel} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="records-list">
        {records.map((record) => (
          <div key={record._id} className="card record-card">
            <div className="record-header">
              <h3>{new Date(record.date).toLocaleDateString()}</h3>
              <div className="record-actions">
                <button onClick={() => handleEdit(record)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(record._id)} className="btn-delete">Delete</button>
              </div>
            </div>
            <div className="record-body">
              {record.painLevel !== undefined && <p><strong>Pain:</strong> {record.painLevel}/10</p>}
              {record.painLocation && <p><strong>Location:</strong> {record.painLocation}</p>}
              {record.energyLevel !== undefined && <p><strong>Energy:</strong> {record.energyLevel}/10</p>}
              {record.mood && <p><strong>Mood:</strong> {record.mood}</p>}
              {record.vitals?.sleepHours && <p><strong>Sleep:</strong> {record.vitals.sleepHours} hours</p>}
              {record.vitals?.heartRate && <p><strong>Heart Rate:</strong> {record.vitals.heartRate} bpm</p>}
              {record.notes && <p><strong>Notes:</strong> {record.notes}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
