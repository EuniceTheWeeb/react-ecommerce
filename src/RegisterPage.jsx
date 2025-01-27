import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';
import axios from 'axios';

export default function RegisterPage() {
    const { showMessage } = useFlashMessage();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        salutation: "",
        marketingPreferences: [],
        country: "",
    };

    const [, setLocation] = useLocation();
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    // Here make an API call to register the user
    const handleSubmit = async (values, formikHelpers) => {
        setErrorMessage(null);
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, values);
            console.log('Registration successful:', values);
            showMessage('Registration successful!', 'success');

            setShowSuccess(true);
            formikHelpers.resetForm();
            setLocation("/=");

        } catch (error) {
            console.log(values)
            console.log("Registration failed:", error);
            showMessage('Registration failed. Please try again.', 'error');

        } finally {
            formikHelpers.setSubmitting(false);
            setLoading(false);
        }
    };


    const validationSchema = Yup.object({
        name: Yup.string().required("Required field"),
        email: Yup.string().email("Invalid email address").required("Required field"),
        password: Yup.string().min(8, "Password must be at least 8 characters").required("Required field"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required field"),
        salutation: Yup.string().required("Required field"),
        country: Yup.string().required("Required field"),
        marketingPreferences: Yup.array().required("Required field"),
    });

    return (
        <>
            <div className="container mt-5">
                <h1>Register</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {(formik) => (
                        <Form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <Field
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                    />
                                    {formik.errors.name && formik.touched.name ? (
                                        <div className="text-danger">{formik.errors.name}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                    />
                                    {formik.errors.email && formik.touched.email ? (
                                        <div className="text-danger">{formik.errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3 form-check-inline">
                                    <label className="form-label">Salutation</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <Field
                                                className="form-check-input"
                                                type="radio"
                                                name="salutation"
                                                id="mr"
                                                value="Mr"
                                            />
                                            <label className="form-check-label" htmlFor="mr">
                                                Mr
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field
                                                className="form-check-input"
                                                type="radio"
                                                name="salutation"
                                                id="ms"
                                                value="Ms"
                                            />
                                            <label className="form-check-label" htmlFor="ms">
                                                Ms
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field
                                                className="form-check-input"
                                                type="radio"
                                                name="salutation"
                                                id="mrs"
                                                value="Mrs"
                                            />
                                            <label className="form-check-label" htmlFor="mrs">
                                                Mrs
                                            </label>
                                        </div>
                                    </div>
                                    {formik.errors.salutation && formik.touched.salutation ? (
                                        <div className="text-danger">{formik.errors.salutation}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Marketing Preferences</label>
                                    <div className="form-check">
                                        <Field
                                            className="form-check-input"
                                            type="checkbox"
                                            id="emailMarketing"
                                            name="marketingPreferences"
                                            value="email"
                                        />
                                        <label className="form-check-label" htmlFor="emailMarketing">
                                            Email Marketing
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <Field
                                            className="form-check-input"
                                            type="checkbox"
                                            id="smsMarketing"
                                            name="marketingPreferences"
                                            value="sms"
                                        />
                                        <label className="form-check-label" htmlFor="smsMarketing">
                                            SMS Marketing
                                        </label>
                                    </div>
                                    {formik.errors.marketingPreferences &&
                                        formik.touched.marketingPreferences ? (
                                        <div className="text-danger">{formik.errors.marketingPreferences}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="country" className="form-label">
                                        Country
                                    </label>
                                    <Field
                                        as="select"
                                        className="form-select"
                                        id="country"
                                        name="country"
                                    >
                                        <option value="">Select Country</option>
                                        <option value="sg">Singapore</option>
                                        <option value="my">Malaysia</option>
                                        <option value="in">Indonesia</option>
                                        <option value="th">Thailand</option>
                                    </Field>
                                    {formik.errors.country && formik.touched.country ? (
                                        <div className="text-danger">{formik.errors.country}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                    />
                                    {formik.errors.password && formik.touched.password ? (
                                        <div className="text-danger">{formik.errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
                                    <Field
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                    />
                                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                        <div className="text-danger">{formik.errors.confirmPassword}</div>
                                    ) : null}
                                </div>

                            <div className="mb-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={formik.isSubmitting}
                                >Register</button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {showSuccess && <div className="alert alert-success">Registration Successful!</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            </div>
        </>
    );
}
