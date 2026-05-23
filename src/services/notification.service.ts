import { api } from "@/lib/api";

export const getNotifications = async () => {
    const res = await api.get("/notifications");
    return res.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
    const res = await api.put(`/notifications/${notificationId}`);
    return res.data;
};

export const markAllNotificationsAsRead = async () => {
    const res = await api.put("/notifications/mark-all");
    return res.data;
};
