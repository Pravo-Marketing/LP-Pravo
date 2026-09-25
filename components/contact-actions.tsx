"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type ContactActionsProps = {
  whatsappUrl: string;
  schedulingUrl: string | null;
};

function trackContact(event: "Contact" | "Schedule") {
  window.fbq?.("track", event);
}

export default function ContactActions({
  whatsappUrl,
  schedulingUrl,
}: ContactActionsProps) {
  return (
    <div className="contact-actions">
      <div className="contact-buttons">
        <a
          className="button contact-button"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact("Contact")}
        >
          Falar no WhatsApp <b>↗</b>
        </a>

        {schedulingUrl && (
          <a
            className="button contact-button contact-button-secondary"
            href={schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact("Schedule")}
          >
            Agendar conversa <b>↗</b>
          </a>
        )}
      </div>
      <span className="contact-note">Atendimento direto pelo WhatsApp</span>
    </div>
  );
}
