"use client";

import DemandFlow from "@/components/demand-flow";
import GlyphPortal from "@/components/ui/glyph-portal";

export default function PravoHero() {
  return (
    <div id="inicio">
      <GlyphPortal
        word="PRAVO"
        focusChar="A"
        interactive={false}
        scrollLength={1.55}
        fontFamily={'-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'}
        fontWeight={700}
        enterLabel=""
        className="pravo-portal"
        style={{
          "--gp-paper": "#050505",
          "--gp-ink": "#8e8e93",
          "--gp-field": "#f5f5f7",
          "--gp-foreground": "#050505",
        }}
        front={<>
          <p className="portal-support">Performance nasce de boas decisões.</p>
        </>}
      >
        <div className="portal-message">
          <div className="portal-copy">
            <h1><span>Transformamos</span><span>atenção em</span><strong>demanda.</strong></h1>
            <span>Gestão estratégica de Meta Ads para gerar leads e vendas — conectando anúncios, estrutura digital e inteligência comercial.</span>
            <a className="portal-cta" href="#contato">Falar sobre meu negócio <b>↗</b></a>
          </div>
          <DemandFlow />
        </div>
      </GlyphPortal>
    </div>
  );
}
