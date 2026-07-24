export const onRequestPost: PagesFunction<{ SEB: SendEmail }> = async (context) => {
    const { request, env } = context;
    const body = await request.json();
    const { name, email, phone, message, company } = body;

    // Honeypot tripped — silently pretend success so bots don't learn anything
    if (company) {
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (!name || !email || !message) {
        return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const msg = new EmailMessage(
        "contact-form@happyfolkegardens.co.uk",
        "jakwagy@gmail.com",
        `From: Contact Form <contact-form@happyfolkegardens.co.uk>
To: you@yourdomain.com
Subject: New contact form submission
Content-Type: text/plain

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Message: ${message}`
    );

    try {
        await env.SEB.send(msg);
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Send failed" }), { status: 500 });
    }
};