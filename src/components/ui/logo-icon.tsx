interface LogoIconProps {
    size?: number;
    className?: string;
}

export function LogoIcon({ size = 32, className = "" }: LogoIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <rect width="32" height="32" rx="6" fill="black" />
            <path
                d="M12 8L8 16L12 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 8L24 16L20 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <rect x="14" y="11" width="4" height="4" rx="1" fill="white" />
            <rect x="14" y="17" width="4" height="4" rx="1" fill="white" />
        </svg>
    );
}
