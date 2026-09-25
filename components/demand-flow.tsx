export default function DemandFlow() {
  return (
    <div
      className="demand-flow"
      role="img"
      aria-label="Cinco pessoas alcançadas por um anúncio que gera oportunidades para uma empresa"
    >
      <div className="flow-people">
        <div className="flow-people-stack" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <span className="flow-person-node" key={index}>
              <i className="person-symbol" />
            </span>
          ))}
        </div>
        <small>Pessoas</small>
      </div>

      <div className="flow-fan" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <i className="flow-line" key={index} />
        ))}
      </div>

      <div className="flow-center">
        <span className="flow-ad-node" aria-hidden="true">
          <i className="ad-creative"><b /><em /><strong /></i>
        </span>
        <small>Anúncio</small>
      </div>

      <i className="flow-link" aria-hidden="true" />

      <div className="flow-company">
        <span className="flow-company-node" aria-hidden="true">
          <i className="company-symbol">
            {Array.from({ length: 6 }, (_, index) => <b key={index} />)}
          </i>
        </span>
        <small>Empresa</small>
      </div>
    </div>
  );
}
