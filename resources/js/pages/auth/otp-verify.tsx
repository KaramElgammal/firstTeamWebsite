import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef, FormEventHandler } from 'react';
import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import axios from 'axios';

interface OtpVerifyProps {
    email: string;
}

export default function OtpVerify({ email }: OtpVerifyProps) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        email: email,
        otp: '',
    });

    const [otpArray, setOtpArray] = useState<string[]>(Array(6).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
    const [isResending, setIsResending] = useState(false);
    const [resendMessage, setResendMessage] = useState('');
    
    useEffect(() => {
        if (timeLeft <= 0) return;
        const intervalId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);

    useEffect(() => {
        // Sync array to form data
        setData('otp', otpArray.join(''));
        if (errors.otp) clearErrors('otp');
    }, [otpArray]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleOtpChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;
        const newOtp = [...otpArray];
        newOtp[index] = element.value;
        setOtpArray(newOtp);

        if (element.value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (otpArray[index] === '' && index > 0) {
                inputRefs.current[index - 1]?.focus();
                const newOtp = [...otpArray];
                newOtp[index - 1] = '';
                setOtpArray(newOtp);
            } else {
                const newOtp = [...otpArray];
                newOtp[index] = '';
                setOtpArray(newOtp);
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain').slice(0, 6).replace(/\D/g, '');
        if (pastedData) {
            const newOtp = [...otpArray];
            pastedData.split('').forEach((char, index) => {
                newOtp[index] = char;
            });
            setOtpArray(newOtp);
            if (pastedData.length === 6) {
                inputRefs.current[5]?.focus();
            } else {
                inputRefs.current[pastedData.length]?.focus();
            }
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (timeLeft <= 0) return;
        post(route('otp.verify'));
    };

    const resendOtp = async () => {
        setIsResending(true);
        setResendMessage('');
        try {
            const response = await axios.post(route('otp.resend'), { email });
            setResendMessage(response.data.message || 'OTP resent successfully!');
            setTimeLeft(180);
            setOtpArray(Array(6).fill(''));
            inputRefs.current[0]?.focus();
        } catch (error: any) {
            setResendMessage(error.response?.data?.message || 'Failed to resend OTP.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <AuthLayout title="Verify Your Account" description={`We have sent a verification code to ${email}`}>
            <Head title="OTP Verification" />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                        {otpArray.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={digit}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleOtpChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-14 text-center text-xl font-bold rounded-md bg-[#171110] border border-[#f3b8b1]/30 text-white focus:border-[#f3b8b1] focus:ring-1 focus:ring-[#f3b8b1] outline-none transition-all"
                            />
                        ))}
                    </div>
                    <InputError message={errors.otp} className="text-center" />
                </div>

                <div className="text-center text-xl font-mono tracking-widest text-[#f3b8b1]">
                    {formatTime(timeLeft)}
                </div>

                <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={processing || timeLeft <= 0 || otpArray.join('').length < 6}
                >
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Verify Account
                </Button>

                {timeLeft <= 0 && (
                    <div className="text-center space-y-3">
                        <p className="text-red-400 text-sm">Your OTP has expired.</p>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={resendOtp} 
                            disabled={isResending}
                            className="w-full border-[#f3b8b1] text-[#f3b8b1] hover:bg-[#f3b8b1] hover:text-[#171110] bg-transparent"
                        >
                            {isResending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Resend OTP
                        </Button>
                    </div>
                )}
                
                {resendMessage && (
                    <p className="text-center text-sm text-green-400 mt-2">{resendMessage}</p>
                )}
            </form>
        </AuthLayout>
    );
}
