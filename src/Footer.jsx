import React from 'react';

export default function Footer() {
    const thisYear = new Date().getFullYear();
    return (
        <>
            <footer className="bg-dark text-white text-center py-3">
                <div className="container">
                    <p>&copy; {thisYear} E-Shop. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}