// cronJobs/DeleteClosedEvents.js

const { CronJob } = require('cron');
const eventModel = require('../models/eventModel');

const job = new CronJob(
    '0 * * * *', // Runs every day at midnight
    async function () {
        try {
            const now = new Date();
            const result = await eventModel.deleteMany({ date: { $lt: now } });
            console.log(`[CRON] Deleted ${result.deletedCount} closed events`);
        } catch (error) {
            console.error('[CRON] Error deleting closed events:', error);
        }
    },
    null, // onComplete
    false, // don't start immediately
    'America/Los_Angeles' // adjust timezone as needed
);

// Export a function to start it after DB is connected
module.exports = () => {
    console.log('[CRON] Scheduled auto-delete job for closed events');
    job.start();
};
