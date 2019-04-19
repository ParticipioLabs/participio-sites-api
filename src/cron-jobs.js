import cron from 'node-cron';
import curl from 'curl-request';


export const netlifyRebuildCron = cron.schedule(`*/${process.env.NETLIFY_REBUILD_CRON_SCHEDULE_MINUTES} * * * *`, () => {
  new curl()
    .setBody({})
    .post(process.env.NETLIFY_REBUILD_WEBHOOK_URL)
    .then(({statusCode, body, headers}) => {
      console.log(`Status: ${statusCode} - Netlify rebuild triggered!`)
    })
    .catch((e) => {
      console.log(e);
    });
}, {});
