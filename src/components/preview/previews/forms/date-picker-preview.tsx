"use client";

import { useState } from 'react';
import { SettingsValues } from '@/lib/settings-types';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePreviewTheme } from '@/contexts/preview-theme-context';

interface DatePickerPreviewProps {
    settings: SettingsValues;
}

export function DatePickerPreview({ settings }: DatePickerPreviewProps) {
    const { theme } = usePreviewTheme();
    const placeholder = (settings.placeholder as string) || 'Select a date';
    const appearance = (settings.appearance as string) || (theme === 'dark' ? 'filledDarker' : 'outline');

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const bgColor = appearance === 'filledLighter' ? (theme === 'dark' ? '#2a2a2a' : '#f3f4f6')
        : appearance === 'outline' ? 'transparent'
            : (theme === 'dark' ? '#1a1a1a' : '#ffffff');
    const borderColor = appearance === 'outline' ? (theme === 'dark' ? '#444' : '#e5e7eb') : 'transparent';
    const dropdownBg = theme === 'dark' ? '#1a1a1a' : '#ffffff';
    const textColor = theme === 'dark' ? '#ffffff' : '#111827';
    const mutedColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
    const hoverBg = theme === 'dark' ? '#333' : '#f3f4f6';

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

    return (
        <div className="datepicker-preview">
            <style jsx>{`
                .datepicker-preview {
                    position: relative;
                    padding: 20px;
                }
                .datepicker-input {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 14px;
                    border-radius: 8px;
                    cursor: pointer;
                    min-width: 200px;
                    transition: all 0.2s;
                }
                .datepicker-input:hover {
                    filter: brightness(1.1);
                }
                .datepicker-text {
                    flex: 1;
                    font-size: 14px;
                }
                .datepicker-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 20px;
                    background: ${dropdownBg};
                    border-radius: 12px;
                    padding: 16px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    z-index: 10;
                    min-width: 280px;
                }
                .calendar-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 16px;
                }
                .calendar-nav {
                    background: transparent;
                    border: none;
                    color: ${mutedColor};
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                }
                .calendar-nav:hover {
                    color: ${textColor};
                    background: ${hoverBg};
                }
                .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 4px;
                }
                .calendar-day-name {
                    text-align: center;
                    font-size: 12px;
                    color: #6b7280;
                    padding: 8px 0;
                }
                .calendar-day {
                    text-align: center;
                    padding: 8px;
                    font-size: 14px;
                    color: ${mutedColor};
                    border-radius: 6px;
                    cursor: pointer;
                    background: transparent;
                    border: none;
                }
                .calendar-day:hover {
                    background: ${hoverBg};
                    color: ${textColor};
                }
                .calendar-day.selected {
                    background: #6366f1;
                    color: white;
                }
                .calendar-day.today {
                    border: 1px solid #6366f1;
                }
            `}</style>

            <div
                className="datepicker-input"
                style={{
                    backgroundColor: bgColor,
                    border: `1px solid ${borderColor}`,
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`datepicker-text ${selectedDate ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : 'text-gray-500'}`} style={{ color: selectedDate ? textColor : mutedColor }}>
                    {selectedDate ? formatDate(selectedDate) : placeholder}
                </span>
            </div>

            {isOpen && (
                <div className="datepicker-dropdown">
                    <div className="calendar-header">
                        <button
                            className="calendar-nav"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-medium" style={{ color: textColor }}>
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                            className="calendar-nav"
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="calendar-grid">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="calendar-day-name">{day}</div>
                        ))}

                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}

                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            const isToday = new Date().toDateString() === date.toDateString();

                            return (
                                <button
                                    key={day}
                                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                                    onClick={() => {
                                        setSelectedDate(date);
                                        setIsOpen(false);
                                    }}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
