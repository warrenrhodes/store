import notificationapi, { notificationsEnabled } from './notificationConfig'
import { v4 as uuidv4 } from 'uuid'

export const sendEmailNotifications = async ({
  data,
  email,
  notificationId,
}: {
  data: Record<string, any>
  email: string
  notificationId: string
}): Promise<boolean> => {
  if (!notificationsEnabled) return false
  try {
    notificationapi.send({
      notificationId: notificationId,
      user: {
        id: uuidv4(),
        email: email,
      },
      mergeTags: {
        ...data,
      },
    })

    return true
  } catch (error) {
    console.log('error in sendEmailNotifications', error)
    return false
  }
}

export const sendSmsNotifications = async ({
  data,
  phoneNumber,
  notificationId,
}: {
  data: Record<string, any>
  phoneNumber: string
  notificationId: string
}): Promise<boolean> => {
  if (!notificationsEnabled) return false
  try {
    notificationapi.send({
      notificationId: notificationId,
      user: {
        id: uuidv4(),
        number: phoneNumber,
      },
      mergeTags: {
        ...data,
      },
    })

    return true
  } catch (error) {
    console.log('error in sendSmsNotifications', error)
    return false
  }
}
