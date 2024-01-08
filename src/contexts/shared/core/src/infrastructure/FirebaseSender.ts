import { App, cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { NotificationPayload, NotificationSender } from '../domain/NotificationSender';
export class FirebaseSender extends NotificationSender {
  private firebaseApp: App;
  constructor(serviceAccount: ServiceAccount) {
    super();
    this.firebaseApp = initializeApp({
      credential: cert(serviceAccount),
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
    await getMessaging(this.firebaseApp).sendToDevice(tokens, {
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
