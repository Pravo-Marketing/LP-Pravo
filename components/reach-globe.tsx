import { Globe } from "@/components/ui/globe";

export default function ReachGlobe() {
  return (
    <div className="reach-globe" aria-label="Atuação global da Pravo">
      <span>GLOBAL</span>
      <Globe className="reach-globe-canvas" />
      <div className="reach-globe-shade" aria-hidden="true" />
    </div>
  );
}
