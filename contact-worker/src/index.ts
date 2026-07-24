import { EmailMessage } from "cloudflare:email";

export interface Env {
    SEB: SendEmail;
}

const ALLOWED_ORIGINS = [
    "https://preview.happy-folke.pages.dev",
    "https://happy-folke.pages.dev",
];

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const origin = request.headers.get("Origin") || "";
        const corsHeaders = {
            "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : "",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405, headers: corsHeaders });
        }

        const body = await request.json() as {
            name?: string; email?: string; phone?: string; message?: string; company?: string;
        };
        const { name, email, phone, message, company } = body;

        // Honeypot tripped — fake success
        if (company) {
            return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
        }

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400, headers: corsHeaders });
        }

        const msg = new EmailMessage(
            "contact-form@happyfolkegardens.co.uk",
            "jakwagy@gmail.com",
            `From: Contact Form <contact-form@happyfolkegardens.co.uk>
To: jakwagy@gmail.com
Subject: New contact form submission
Content-Type: text/plain

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Message: ${message}`
        );

        try {
            await env.SEB.send(msg);
            return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
        } catch (e) {
            return new Response(JSON.stringify({ error: "Send failed" }), { status: 500, headers: corsHeaders });
        }
    },
};