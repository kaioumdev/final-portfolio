import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * POST /api/send-email
 * Sends contact form submissions to Md Kaioum Islam's email.
 * Env vars: FOLIO_EMAIL, FOLIO_PASSWORD
 */
export async function POST(request: NextRequest) {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.FOLIO_EMAIL,
            pass: process.env.FOLIO_PASSWORD,
        },
    });

    try {
        await transporter.verify();
    } catch (e) {
        console.error('SMTP transport verification failed:', e);
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }

    try {
        await transporter.sendMail({
            from: `"${name}" <${process.env.FOLIO_EMAIL}>`,
            to: 'mdkaioumislam.dev@gmail.com',
            subject: `Portfolio Contact: Message from ${name} <${email}>`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });
        return NextResponse.json({ message: 'success' });
    } catch (e) {
        console.error('Email send failed:', e);
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
