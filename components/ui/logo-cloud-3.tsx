"use client";

import {
  RiAdvertisementFill,
  RiBarChartBoxFill,
  RiCodeBoxFill,
  RiCustomerServiceFill,
  RiFacebookFill,
  RiInstagramFill,
  RiMetaFill,
  RiWhatsappFill,
} from "@remixicon/react";

const ecosystem = [
  { name: "Meta Ads", Icon: RiMetaFill },
  { name: "Instagram", Icon: RiInstagramFill },
  { name: "Facebook", Icon: RiFacebookFill },
  { name: "WhatsApp", Icon: RiWhatsappFill },
  { name: "Criativos", Icon: RiAdvertisementFill },
  { name: "Landing pages", Icon: RiCodeBoxFill },
  { name: "Mensuração", Icon: RiBarChartBoxFill },
  { name: "Comercial", Icon: RiCustomerServiceFill },
];

export default function LogoCloudBlock() {
  return (
    <section className="ecosystem-cloud" aria-labelledby="ecosystem-title">
      <div className="ecosystem-heading">
        <p className="section-label light-label" id="ecosystem-title">Ecossistema conectado</p>
        <p>Da mídia ao atendimento, cada ponto trabalha para a mesma decisão: crescer com eficiência.</p>
      </div>

      <div className="logo-cloud-mask">
        <div className="logo-cloud-track">
          {[...ecosystem, ...ecosystem].map(({ name, Icon }, index) => (
            <div
              className="logo-cloud-item"
              key={`${name}-${index}`}
              aria-hidden={index >= ecosystem.length ? "true" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
