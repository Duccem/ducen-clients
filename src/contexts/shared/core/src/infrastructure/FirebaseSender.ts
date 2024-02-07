import { ServiceAccount, app, credential, initializeApp, messaging } from 'firebase-admin';
import { NotificationPayload, NotificationSender } from '../domain/NotificationSender';
export class FirebaseSender extends NotificationSender {
  private firebaseApp: app.App;
  constructor(serviceAccount: ServiceAccount) {
    super();
    this.firebaseApp = initializeApp({
      credential: credential.cert(serviceAccount),
    });
  }

  async SendPushNotification({ actionUrl = '', data = {}, title, body, devices, userId }: NotificationPayload) {
    const notification = {
      body,
      title,
      data,
      user: userId,
      devices: devices.map((device) => device._id),
      type: 'PUSH',
    };
    const tokens = devices.map((device) => device.token);
    await messaging(this.firebaseApp).sendToDevice(tokens, {
      notification: {
        title,
        body,
        clickAction: actionUrl,
      },
      data,
    });
    return notification;
  }
}
