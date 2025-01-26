import { atom, useAtom } from 'jotai';

export const flashMessageAtom = atom({
    message: '',
    type: 'info',
});

export const useFlashMessage = () => {
    const [flashMessage, setFlashMessage] = useAtom(flashMessageAtom);

    const showMessage = (message, type = 'info') => {
        console.log(message, "(", type, ")" );
        setFlashMessage({ message, type });
    };

    const clearMessage = () => {
        setFlashMessage({ message: '', type: 'info' });
    };

    const getMessage = () => {
        return flashMessage;
    };

    return {
        getMessage,
        showMessage,
        clearMessage
    };
}

// import React from 'react';
// import { useFlashMessage } from './flashMessageAtom';  // Import your custom hook

// const FlashMessage = () => {
//     const { getMessage, clearMessage } = useFlashMessage();
//     const { message, type } = getMessage();  // Get the message and type

//     if (!message) return null;  // Don't render anything if there's no message

//     // Determine the alert class based on the message type
//     const alertClass = `alert alert-${type}`; // e.g., "alert alert-success"

//     return (
//         <div className={alertClass}>
//             <span>{message}</span>
//             <button onClick={clearMessage}>Close</button>
//         </div>
//     );
// };

// export default FlashMessage;
