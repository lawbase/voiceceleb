'use server';

import nodemailer from 'nodemailer';

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
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        return { success: false, error: 'API Key is missing.' };
    }

    // Map simple voice IDs to Google TTS Voice names
    // This is a simplified mapping. Real app would have a robust map.
    const voiceMap = {
        'male_std': { languageCode: 'ko-KR', name: 'ko-KR-Neural2-C' }, // Male Neural
        'female_std': { languageCode: 'ko-KR', name: 'ko-KR-Neural2-A' }, // Female Neural
        'male_pro': { languageCode: 'en-US', name: 'en-US-Studio-M' }, // Studio Male
        'female_emo': { languageCode: 'en-US', name: 'en-US-Studio-O' }, // Studio Female
        // Default fallback
        'default': { languageCode: 'ko-KR', name: 'ko-KR-Neural2-A' }
    };

    const selectedVoice = voiceMap[voiceId] || voiceMap['default'];

    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    const payload = {
        input: { text: text },
        voice: selectedVoice,
        audioConfig: { audioEncoding: 'MP3' }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('TTS API API Error:', errorData);
            return { success: false, error: errorData.error?.message || 'TTS request failed' };
        }

        const data = await response.json();
        return { success: true, audioContent: data.audioContent }; // Base64 string

    } catch (error) {
        console.error('Error generating audio:', error);
        return { success: false, error: 'Failed to generate audio.' };
    }
}
