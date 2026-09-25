const SCHEDULING_PLACEHOLDER = "COLAR_LINK_DE_AGENDAMENTO_AQUI";
const PIXEL_PLACEHOLDER = "COLAR_ID_DO_PIXEL_AQUI";

const schedulingValue =
  process.env.NEXT_PUBLIC_SCHEDULING_URL?.trim() || SCHEDULING_PLACEHOLDER;
const pixelValue =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || PIXEL_PLACEHOLDER;

const whatsappMessage =
  "Olá! Conheci a PRAVO pelo site e quero conversar sobre gestão de tráfego para o meu negócio.";

export const siteConfig = {
  whatsappUrl: `https://wa.me/5511932534072?text=${encodeURIComponent(whatsappMessage)}`,

  // Você também pode substituir diretamente o texto abaixo pelo link completo.
  schedulingUrl: /^https:\/\//i.test(schedulingValue) ? schedulingValue : null,

  // Você também pode substituir diretamente o texto abaixo pelo ID numérico.
  metaPixelId: /^\d{5,30}$/.test(pixelValue) ? pixelValue : null,
};

/*
  API DE CONVERSÕES DA META
  ---------------------------------
  Cole o token somente na variável privada META_CONVERSIONS_API_TOKEN.
  Nunca coloque esse token neste arquivo ou em uma variável NEXT_PUBLIC_.
  O arquivo .env.example mostra exatamente onde preencher quando a integração
  de servidor for configurada.
*/
