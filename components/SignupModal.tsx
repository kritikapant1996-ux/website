"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, ChevronRight, ChevronLeft, Calendar, Laptop, Smartphone, Tablet, User, Clock, Mail } from "lucide-react";

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    studentName: string;
    grade: string;
    confidenceLevel: string;
    deviceType: string;
    timeZone: string;
    preferredDate: string;
    email: string;
    phone: string;
}

const INITIAL_DATA: FormData = {
    studentName: "",
    grade: "",
    confidenceLevel: "",
    deviceType: "",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    preferredDate: "",
    email: "",
    phone: ""
};

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [meetLink, setMeetLink] = useState<string | null>(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setIsSuccess(false);
            setMeetLink(null);
            setFormData({
                ...INITIAL_DATA,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
            });
        }
    }, [isOpen]);

    const updateFields = (fields: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    if (!isOpen) return null;

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/book-class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Booking Success:", data);
                if (data.data?.meetLink && data.data.meetLink.startsWith('http')) {
                    setMeetLink(data.data.meetLink);
                }
                setIsSuccess(true);
            } else {
                console.error("Booking Failed:", data.error);
                alert("Something went wrong. Please try again. " + (data.details || ""));
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Failed to connect to server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Validation Logic
    const isStep1Valid = formData.studentName.trim().length > 0 && formData.grade !== "";
    const isStep2Valid = formData.confidenceLevel !== "" && formData.deviceType !== "";
    const isStep3Valid = formData.timeZone !== "" && formData.preferredDate !== "";
    const isStep4Valid = formData.email.includes("@") && formData.email.includes(".");

    const isCurrentStepValid = () => {
        switch (step) {
            case 1: return isStep1Valid;
            case 2: return isStep2Valid;
            case 3: return isStep3Valid;
            case 4: return isStep4Valid;
            default: return false;
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl relative flex flex-col max-h-[90vh]">

                {/* Close Button */}
                {!isSuccess && (
                    <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground z-10">
                        <X className="w-5 h-5" />
                    </button>
                )}

                {/* SUCCESS STATE */}
                {isSuccess ? (
                    <div className="p-8 flex flex-col items-center justify-center">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in spin-in-180 duration-500">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>

                            <h2 className="text-3xl font-bold text-foreground">You're booked!</h2>
                            <p className="text-muted-foreground text-lg">
                                We will contact you shortly at <span className="font-bold text-foreground">{formData.email}</span>.
                            </p>

                            <div className="bg-secondary/50 p-6 rounded-2xl border border-border/50">
                                <p className="font-medium mb-2">Next Steps:</p>
                                <p className="text-sm text-muted-foreground">
                                    Check your email for details. We look forward to seeing you!
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* PROGRESS BAR */}
                        <div className="px-8 pt-8 pb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                    Step {step} of 4
                                </span>
                                <span className="text-xs font-medium text-primary">
                                    {step === 1 && "Profile"}
                                    {step === 2 && "Experience"}
                                    {step === 3 && "Scheduling"}
                                    {step === 4 && "Contact"}
                                </span>
                            </div>
                            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-300 ease-out"
                                    style={{ width: `${(step / 4) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* CONTENT AREA */}
                        <div className="px-8 py-4 flex-grow overflow-y-auto">

                            {/* STEP 1: PROFILE */}
                            {step === 1 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold">Let's personalize your learning.</h2>
                                        <p className="text-muted-foreground">Who will be taking this class?</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Student Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    value={formData.studentName}
                                                    onChange={e => updateFields({ studentName: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                    placeholder="Enter name"
                                                    autoFocus
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Grade / Age Group</label>
                                            <select
                                                value={formData.grade}
                                                onChange={e => updateFields({ grade: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                                            >
                                                <option value="" disabled>Select an option</option>
                                                <option value="Grades 1-3">Grades 1-3 (Early Elementary)</option>
                                                <option value="Grades 4-6">Grades 4-6 (Upper Elementary)</option>
                                                <option value="Grades 7-9">Grades 7-9 (Middle School)</option>
                                                <option value="Grades 10-12">Grades 10-12 (High School)</option>
                                                <option value="Adult">Adult / Professional</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: EXPERIENCE */}
                            {step === 2 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold">Tell us about your starting point.</h2>
                                        <p className="text-muted-foreground">This helps us tailor the first lesson.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-3">
                                            <label className="text-sm font-medium">Current Confidence Level</label>
                                            <div className="grid grid-cols-1 gap-2">
                                                {['Beginner/Shy', 'Intermediate', 'Advanced/Competitor'].map((level) => (
                                                    <label
                                                        key={level}
                                                        className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${formData.confidenceLevel === level ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-input hover:bg-secondary/50'}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="confidence"
                                                            value={level}
                                                            checked={formData.confidenceLevel === level}
                                                            onChange={e => updateFields({ confidenceLevel: e.target.value })}
                                                            className="sr-only"
                                                        />
                                                        <div className={`w-4 h-4 rounded-full border border-primary mr-3 flex items-center justify-center ${formData.confidenceLevel === level ? 'bg-primary' : 'bg-transparent'}`}>
                                                            {formData.confidenceLevel === level && <div className="w-2 h-2 rounded-full bg-white" />}
                                                        </div>
                                                        <span className="font-medium">{level}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Device Type</label>
                                            <div className="relative">
                                                <select
                                                    value={formData.deviceType}
                                                    onChange={e => updateFields({ deviceType: e.target.value })}
                                                    className="w-full pl-4 pr-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                                                >
                                                    <option value="" disabled>Select device</option>
                                                    <option value="Laptop/Desktop">Laptop / Desktop</option>
                                                    <option value="Tablet">Tablet</option>
                                                    <option value="Mobile">Mobile</option>
                                                </select>
                                            </div>
                                            <p className="text-xs text-muted-foreground flex items-center">
                                                <Laptop className="w-3 h-3 mr-1" />
                                                Laptop/Desktop recommended for Google Meet features.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: SCHEDULING */}
                            {step === 3 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold">Choose a time for your Free Demo.</h2>
                                        <p className="text-muted-foreground">We will confirm this slot within 24 hours.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Time Zone</label>
                                            <div className="relative">
                                                <Clock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    value={formData.timeZone}
                                                    readOnly
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-secondary/50 text-muted-foreground cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Preferred Date & Time</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <input
                                                    type="datetime-local"
                                                    value={formData.preferredDate}
                                                    onChange={e => updateFields({ preferredDate: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: CONTACT */}
                            {step === 4 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-bold">Where should we send the details?</h2>
                                        <p className="text-muted-foreground">Enter your contact info so we can reach out.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => updateFields({ email: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                    placeholder="you@gmail.com"
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                We will contact you at this email address.
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">SMS Reminder Number <span className="text-muted-foreground font-normal">(Optional)</span></label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={e => updateFields({ phone: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                    placeholder="+1 (555) 000-0000"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* FOOTER ACTIONS */}
                        <div className="p-8 pt-4 flex gap-3">
                            {step > 1 && (
                                <button
                                    onClick={prevStep}
                                    className="px-6 py-3 rounded-full font-bold border border-input hover:bg-secondary transition-colors"
                                >
                                    Back
                                </button>
                            )}

                            {step < 4 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={!isCurrentStepValid()}
                                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Next Step
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!isCurrentStepValid() || isSubmitting}
                                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? "Booking..." : "Book Demo"}
                                    {!isSubmitting && <CheckCircle2 className="w-4 h-4" />}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
