import { useEffect, useRef } from "react";
import { Toast } from "bootstrap";

// Notifier component displays toast notifications based on the notifications array.
function Notifier({ notifications, notifierCallback }) {
    return (
        <div className="toast-container position-absolute m-2" style={{ top: 0, right: 0 }}>
            {/* Map through notifications and render Notification components */}
            {notifications.map(n => {
                return (
                    <Notification
                        key={n.id}
                        id={n.id}
                        title={n.title}
                        text={n.text}
                        callBack={notifierCallback}
                    ></Notification>
                );
            })}
        </div>
    );
}

// Notification component displays a single toast notification.
function Notification({ id, title, text, callBack }) {
    const toastRef = useRef();

    const NOTIFY_TIMEOUT = 3000;

    useEffect(() => {
        let myToast = toastRef.current;
        let toast = Toast.getInstance(myToast);

        if (!toast) {
            toast = new Toast(myToast, { autohide: false });
            toast.show();

            // Set a timeout to hide the notification after NOTIFY_TIMEOUT milliseconds
            setTimeout(() => {
                toast.hide();
                callBack(id);
            }, NOTIFY_TIMEOUT);
        }
    }, []);

    return (
        <div className="toast" ref={toastRef}>
            <div className="toast-header">
                <strong className="mr-auto">{title}</strong>
            </div>
            <div className="toast-body">
                {text}
            </div>
        </div>
    );
}

export default Notifier;
