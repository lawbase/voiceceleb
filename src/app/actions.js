'use server';

import nodemailer from 'nodemailer';
import OpenAI from 'openai';

export async function sendEmail(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic Server-side Validation
    if (!name || !email || !message) {
        return { success: false, error: 'Missing required fields' };
    }

    // Debug: Log the attempt
    console.log(`Attempting to send email from ${email} (${name})`);
    console.log('SMTP Config Check:', {
        host: process.env.SMTP_HOST,
        user: process.env.SMTP_USER,
        hasPass: !!process.env.SMTP_PASS
    });

    // Check if SMTP variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        console.error('SMTP Environment variables are not set.');
        // In dev mode, we might want to pretend it worked or show a specific error
        // For now, return a specific error so the user knows to configure it.
        return {
            success: false,
            error: 'Server misconfiguration: SMTP settings missing.'
        };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address (often must match auth user)
            to: "dahaebon@gmail.com", // List of receivers
            replyTo: email, // Actual sender's email
            subject: `[VoiceCeleb Inquiry] Message from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message:
${message}
      `,
            html: `
<h3>New Inquiry from VoiceCeleb</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<hr/>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return { success: true };

    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: 'Failed to send email. Please try again later.' };
    }
}


export async function generateAudio(text, voiceId) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return { success: false, error: 'OpenAI API Key is missing.' };
    }

    const openai = new OpenAI({
        apiKey: apiKey,
    });



    // Map internal voice IDs to OpenAI Voice names

    const voiceMap = {
        'alloy': 'alloy',
        'echo': 'echo',
        'fable': 'fable',
        'onyx': 'onyx',
        'nova': 'nova',
        'shimmer': 'shimmer',
        // Fallback
        'default': 'alloy'
    };

    const selectedVoice = voiceMap[voiceId] || voiceMap['default'];

    try {
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: selectedVoice,
            input: text,
        });


        const buffer = Buffer.from(await mp3.arrayBuffer());

        const audioContent = buffer.toString('base64');

        return { success: true, audioContent: audioContent };

    } catch (error) {
        console.error('Error generating audio with OpenAI:', error);
        return { success: false, error: error.message || 'Failed to generate audio.' };
    }
}
