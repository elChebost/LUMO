import * as activityService from '../services/activityService.js';

/**
 * Activity Controller - Manejo de requests HTTP para actividades
 */

// POST /api/missions/:missionId/activities
export const createActivity = async (req, res) => {
  try {
    const { missionId } = req.params;
    const activity = await activityService.createActivity(missionId, req.body);
    
    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Error creating activity' });
  }
};

// GET /api/missions/:missionId/activities
export const getActivitiesByMission = async (req, res) => {
  try {
    const { missionId } = req.params;
    const activities = await activityService.getActivitiesByMission(missionId);
    
    res.json(activities);
  } catch (error) {
    console.error('Error getting activities:', error);
    res.status(500).json({ error: 'Error getting activities' });
  }
};

// PUT /api/activities/:id
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await activityService.updateActivity(id, req.body);
    
    res.json(activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Error updating activity' });
  }
};

// DELETE /api/activities/:id
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    await activityService.deleteActivity(id);
    
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Error deleting activity' });
  }
};

// PATCH /api/missions/:missionId/activities/reorder
export const reorderActivities = async (req, res) => {
  try {
    const { missionId } = req.params;
    const { activitiesOrder } = req.body; // Array de { id, order }
    
    const activities = await activityService.reorderActivities(missionId, activitiesOrder);
    
    res.json(activities);
  } catch (error) {
    console.error('Error reordering activities:', error);
    res.status(500).json({ error: 'Error reordering activities' });
  }
};
