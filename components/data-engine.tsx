import type { CSSProperties } from 'react';
import Timeline from '@/components/ui/timeline';

const signals = [
  { label: 'Taxa de clique', value: 'Sinal capturado', width: '78%' },
  { label: 'Custo por oportunidade', value: 'Hipótese em teste', width: '61%' },
  { label: 'Qualidade do lead', value: 'Contexto comercial', width: '88%' },
  { label: 'Conversão em venda', value: 'Decisão de verba', width: '71%' },
];

export default function DataEngine() {
  return (
    <section className="data-section" id="dados">
      <div className="data-heading">
        <p className="section-label light-label">Inteligência de performance</p>
        <h2>O algoritmo entrega sinais.<br /><em>Nós transformamos em decisões.</em></h2>
        <p>Performance não é apertar botões. É conectar os dados da mídia ao que acontece no comercial, testar hipóteses e investir melhor a cada ciclo.</p>
      </div>

      <div className="data-machine" aria-label="Representação visual do processo de análise e otimização da Pravo">
        <div className="algorithm-flow" aria-hidden="true">
          {['Sinais', 'Hipóteses', 'Testes', 'Decisões', 'Evolução'].map((item, index) => (
            <div className="algorithm-node" style={{ '--node': index } as CSSProperties} key={item}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>

        <div className="signal-console">
          <div className="console-top">
            <span>PRAVO / MOTOR DE DECISÃO</span>
            <span className="console-live"><i /> ANALISANDO</span>
          </div>
          <div className="signal-list">
            {signals.map((signal, index) => (
              <div className="signal-row" key={signal.label} style={{ '--signal': index } as CSSProperties}>
                <div><strong>{signal.label}</strong><span>{signal.value}</span></div>
                <div className="signal-track"><i style={{ width: signal.width }} /></div>
                <b>↗</b>
              </div>
            ))}
          </div>
          <div className="console-footer">
            <span>Dados de mídia</span><i />
            <span>Contexto do negócio</span><i />
            <span>Decisão humana</span>
          </div>
        </div>
      </div>

      <Timeline />
    </section>
  );
}
