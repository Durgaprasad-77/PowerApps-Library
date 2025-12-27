"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';

interface FormGroupPreviewProps {
    settings: SettingsValues;
}

export function FormGroupPreview({ settings }: FormGroupPreviewProps) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    const title = (settings.title as string) || 'Contact Us';
    const description = (settings.description as string) || 'We\'d love to hear from you';
    const backgroundColor = (settings.backgroundColor as string) || '#111111';
    const inputBgColor = (settings.inputBackgroundColor as string) || '#1a1a1a';
    const buttonColor = (settings.buttonColor as string) || '#3b82f6';
    const borderRadius = (settings.borderRadius as number) || 12;

    const hasError = showError && email.length > 0 && !email.includes('@');

    return (
        <div className="form-group-preview">
            <style jsx>{`
                .form-group-preview {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    height: 100%;
                }
                .form-card {
                    width: 100%;
                    max-width: 360px;
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .form-title {
                    font-size: 20px;
                    font-weight: 700;
                    color: white;
                    margin: 0;
                }
                .form-description {
                    font-size: 14px;
                    color: #9ca3af;
                    margin: 0;
                }
                .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .form-label {
                    font-size: 14px;
                    font-weight: 600;
                    color: white;
                }
                .form-input {
                    padding: 12px 16px;
                    font-size: 14px;
                    color: white;
                    outline: none;
                    border: 1px solid #333;
                    transition: all 0.2s ease;
                }
                .form-input:focus {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
                }
                .form-input::placeholder {
                    color: #6b7280;
                }
                .form-textarea {
                    min-height: 80px;
                    resize: none;
                }
                .error-text {
                    font-size: 12px;
                    color: #ef4444;
                }
                .submit-btn {
                    padding: 12px 24px;
                    font-size: 14px;
                    font-weight: 600;
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .submit-btn:hover {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }
            `}</style>

            <div
                className="form-card"
                style={{
                    backgroundColor,
                    borderRadius: `${borderRadius}px`
                }}
            >
                <h3 className="form-title">{title}</h3>
                <p className="form-description">{description}</p>

                <div className="form-field">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsFocused('email')}
                        onBlur={() => { setIsFocused(null); setShowError(true); }}
                        style={{
                            backgroundColor: inputBgColor,
                            borderRadius: `${borderRadius - 4}px`,
                            borderColor: hasError ? '#ef4444' : (isFocused === 'email' ? buttonColor : '#333'),
                        }}
                    />
                    {hasError && <span className="error-text">Please enter a valid email</span>}
                </div>

                <div className="form-field">
                    <label className="form-label">Message</label>
                    <textarea
                        className="form-input form-textarea"
                        placeholder="How can we help?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setIsFocused('message')}
                        onBlur={() => setIsFocused(null)}
                        style={{
                            backgroundColor: inputBgColor,
                            borderRadius: `${borderRadius - 4}px`,
                            borderColor: isFocused === 'message' ? buttonColor : '#333',
                        }}
                    />
                </div>

                <button
                    className="submit-btn"
                    style={{
                        backgroundColor: buttonColor,
                        borderRadius: `${borderRadius - 4}px`,
                    }}
                >
                    Send Message
                </button>
            </div>
        </div>
    );
}
