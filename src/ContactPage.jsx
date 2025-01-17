import React from 'react';

export default function ContactPage() {

    return (
        <>
            <div className="container mt-5">
                <h1>Contact Us</h1>
                <p>Fill in the form below & we'll get back within 3 working days.</p>
            </div>

            <form>
                <div className="mt-5">
                    <label for="name" className="form-label">Name</label>
                    <input type="password" className="form-control" id="name" />
                </div>
                <div className="mt-5">
                    <label for="InputEmail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" />
                </div>
                <div className="mt-5">
                    <label for="EmailSubject" className="form-label">Subject</label>
                    <input type="email" className="form-control" id="EmailSubject" aria-describedby="emailHelp" />
                </div>
                <div className="mt-5">
                    <label for="message" className="form-label">Message</label>
                    <input type="password" className="form-control" id="message" />
                </div>

                <button type="submit" className="btn btn-primary">Send a message</button>
            </form>
        </>
    )
}