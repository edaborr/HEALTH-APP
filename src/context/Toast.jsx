import { useNotifications } from "../context/NotificationContext";

const Toast = () => {
  const { toast } = useNotifications();

  if (!toast) return null;

  return (
    <div className="fixed top-5 right-5 bg-black text-white px-5 py-3 rounded-xl shadow-lg z-50">
      {toast}
    </div>
  );
};

export default Toast;