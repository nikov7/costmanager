/*
    Nikita Vinnik 312535529
    Bar Salem 207351784
    Netanel Aharoni 312541576
*/

import {useEffect, useRef} from 'react';
import {Toast} from 'bootstrap';

// Main notifier, generates notifications
function Notifier({notifications, notifierCallback}) {
    return (
        <div className='toast-container position-absolute m-2' style={{top:0, right:0}}>
            {notifications.map(n=> {
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

// Notification component with fade out
function Notification({id, title, text, callBack}) {
    const toastRef = useRef();

    // Specify the notification timeout
    const NOTIFY_TIMEOUT = 3000;

    useEffect(() => {

        // get the reference
        let myToast = toastRef.current;

        // grab toast instance
        let toast = Toast.getInstance(myToast);

        // instance doesn't exist
        if (!toast) {

            // create Toast from the reference and display it
            toast = new Toast(myToast, {autohide: false});
            toast.show();


            // hide and destroy notification after timeout
            setTimeout(() => {
                toast.hide();

                // destroy notification
                callBack(id);
            }, NOTIFY_TIMEOUT);
        }
    }, []);

    return (
        <div className='toast' ref={toastRef}>
            <div className='toast-header'>
                <strong className='mr-auto'>{title}</strong>
            </div>
            <div className='toast-body'>
                {text}
            </div>
        </div>
    );
}

export default Notifier;
