import DataEngine from '@/components/data-engine';
import ContactActions from '@/components/contact-actions';
import PravoHero from '@/components/pravo-hero';
import ReachGlobe from '@/components/reach-globe';
import LogoCloudBlock from '@/components/ui/logo-cloud-3';
import { siteConfig } from '@/config/site';

const proof = [
  { value: '+30', label: 'clientes gerenciados' },
  { value: '+R$ 1,5M', label: 'em investimento administrado' },
  { value: 'Brasil + Latam', label: 'experiência multicultural' },
  { value: 'Múltiplos nichos', label: 'negócios físicos e digitais' },
];

const transformations = [
  {
    number: '01',
    title: 'Criamos demanda',
    text: 'Levamos sua oferta às pessoas certas e transformamos atenção em novas oportunidades comerciais.',
  },
  {
    number: '02',
    title: 'Conectamos mídia e comercial',
    text: 'O que acontece depois do lead volta para a estratégia e melhora a qualidade das próximas campanhas.',
  },
  {
    number: '03',
    title: 'Evoluímos com dados',
    text: 'Transformamos sinais em testes, decisões e uma alocação mais inteligente do investimento.',
  },
];

const digitalFoundation = [
  {
    title: 'Presença que converte',
    text: 'Landing pages e mensagens que apresentam sua oferta com clareza e conduzem para a ação.',
  },
  {
    title: 'Medição confiável',
    text: 'Estruturamos o rastreamento necessário para entender o caminho entre anúncio, lead e venda.',
  },
  {
    title: 'Atendimento que converte',
    text: 'Ajudamos a organizar a chegada, o acompanhamento e o retorno comercial dos leads gerados.',
  },
];

const faqs = [
  {
    question: 'Qual valor preciso investir em anúncios?',
    answer: 'O valor ideal depende do mercado, do objetivo e da maturidade da operação. A recomendação é definida depois de entendermos o seu cenário.',
  },
  {
    question: 'Em quanto tempo aparecem os resultados?',
    answer: 'Não prometemos prazos sem diagnóstico. Primeiro coletamos sinais, validamos hipóteses e evoluímos a operação com transparência.',
  },
  {
    question: 'Preciso ter uma estrutura digital pronta?',
    answer: 'Não. Se a base ainda não existe, podemos ajudar a construir a página, a medição, a mensagem e o fluxo necessário para começar.',
  },
];

export default function Home() {
  return (
    <main>
      <PravoHero />

      <div className="pravo-shell">

      <section className="proof-band" aria-label="Experiência da Pravo">
        {proof.map((item) => (
          <div className="proof-item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="transformation-section" id="transformacao">
        <div className="transformation-heading">
          <p className="section-label">O que transformamos</p>
          <h2>Mais demanda. Mais clareza.<br /><em>Melhores decisões.</em></h2>
          <p>Não cuidamos apenas dos anúncios. Conectamos mídia, dados e comercial para fortalecer toda a jornada — da atenção à venda.</p>
        </div>
        <div className="transformation-grid">
          {transformations.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reach-section" id="alcance">
        <div className="reach-copy">
          <p className="section-label">Alcance sem fronteiras</p>
          <h2>Seu negócio pode estar na rua, na tela ou em qualquer lugar do mundo.</h2>
          <p className="reach-description">Experiência no Brasil e na América Latina, com estratégia preparada para alcançar novos mercados. O cenário muda. O princípio permanece: encontrar as pessoas certas e gerar demanda com consistência.</p>
        </div>
        <ReachGlobe />
      </section>

      <LogoCloudBlock />

      <div className="dark-chapter">
        <DataEngine />
      </div>

      <section className="foundation-section" id="estrutura">
        <div className="foundation-intro">
          <p className="section-label">Estrutura digital</p>
          <h2>Se a base ainda não existe,<br /><em>nós ajudamos a construir.</em></h2>
          <p>Antes de escalar anúncios, sua empresa precisa estar pronta para receber, medir e converter a demanda.</p>
          <a className="foundation-link" href="#contato">Construir minha operação <span>↗</span></a>
        </div>
        <div className="foundation-list">
          {digitalFoundation.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-title">
          <p className="section-label">Perguntas frequentes</p>
          <h2>Antes de<br /><em>começar.</em></h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}<span>+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-glow" />
        <p className="section-label light-label">Próximo passo</p>
        <h2>Vamos descobrir onde<br />sua empresa pode crescer.</h2>
        <p>Conte um pouco sobre o seu momento. Avaliamos sua oferta, sua estrutura e as oportunidades mais promissoras para gerar demanda.</p>
        <ContactActions
          whatsappUrl={siteConfig.whatsappUrl}
          schedulingUrl={siteConfig.schedulingUrl}
        />
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#inicio">PRAVO<span>.</span></a>
        <p>Estratégia. Dados. Performance.</p>
        <p>© 2026 Pravo</p>
      </footer>
      </div>
    </main>
  );
}
