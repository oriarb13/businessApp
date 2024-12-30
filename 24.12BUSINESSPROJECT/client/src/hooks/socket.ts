import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const useSocketNotifications = (businessId: string) => {
  useEffect(() => {
    if (businessId) {
      // להצטרף לחדר של העסק
      socket.emit("subscribe", businessId);

      // האזנה להתראות
      socket.on("notification", (message:string) => {
        alert(message); // תוכל לשפר את זה עם Toast או Component
      });

      // יציאה מהחדר כאשר הקומפוננטה מתנקה
      return () => {
        socket.emit("unsubscribe", businessId);
        socket.off("notification");
      };
    }
  }, [businessId]);

  return null;
};

export default useSocketNotifications;
