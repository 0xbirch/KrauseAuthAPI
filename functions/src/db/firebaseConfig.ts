const functions = require("firebase-functions");

export default {
  apiKey: functions.config().fb.api_key as string,
  authDomain: functions.config().fb.auth_domain as string,
  projectId: functions.config().fb.project_id as string,
  storageBucket: functions.config().fb.storage_bucket as string,
  messagingSenderId: functions.config().fb.messaging_sender_id as string,
  appId: functions.config().fb.app_id as string,
};
