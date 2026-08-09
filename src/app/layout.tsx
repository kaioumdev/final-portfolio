import type { Metadata } from 'next';
import '../style.css';

export const metadata: Metadata = {
    title: 'Md Kaioum Islam - Portfolio',
    description:
        "I'm Md Kaioum Islam, a Full-Stack Software Engineer. Welcome to my interactive 3D portfolio.",
    openGraph: {
        type: 'website',
        url: 'https://mdkaioumislam.dev/',
        title: 'Md Kaioum Islam - Full-Stack Software Engineer',
        description:
            "I'm Md Kaioum Islam, a Full-Stack Software Engineer. Welcome to my interactive 3D portfolio.",
        images: [
            {
                url: '/images/profile.jpg',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mdkaioumislam.dev/',
        title: 'Md Kaioum Islam - Full-Stack Software Engineer',
        description:
            "I'm Md Kaioum Islam, a Full-Stack Software Engineer. Welcome to my interactive 3D portfolio.",
        images: ['/images/profile.jpg'],
    },
    icons: {
        icon: '/images/favicon.ico',
        apple: '/images/apple-touch-icon.png',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
