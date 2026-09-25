"use client";

/**
 * Glyph Portal © 2026 Christian Katzmann. MIT.
 * Origin: UsefulPortal.astro on https://ktzm.dk → UsefulPortal.tsx → ClarityPortal.tsx.
 * Adapted for the Pravo site. Keep this notice with copies.
 */
import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type GlyphPortalStyle = CSSProperties & {
  "--gp-paper"?: string;
  "--gp-ink"?: string;
  "--gp-field"?: string;
  "--gp-foreground"?: string;
  "--gp-length"?: number;
};

type GlyphPortalProps = {
  word?: string;
  focusChar?: string;
  interactive?: boolean;
  front?: ReactNode;
  children?: ReactNode;
  scrollLength?: number;
  fontFamily?: string;
  fontWeight?: number;
  enterLabel?: string;
  className?: string;
  style?: GlyphPortalStyle;
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smooth = (start: number, end: number, value: number) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

export default function GlyphPortal({
  word = "PRAVO",
  focusChar,
  interactive = true,
  front,
  children,
  scrollLength = 2.25,
  fontFamily = 'Arial, Helvetica, sans-serif',
  fontWeight = 800,
  enterLabel = "Entrar na estratégia",
  className,
  style,
}: GlyphPortalProps) {
  const id = `glyph-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<SVGTextElement>(null);
  const clipTextRef = useRef<SVGTextElement>(null);
  const clippedFieldRef = useRef<SVGRectElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const text = word.trim().normalize("NFC") || "PRAVO";
  const characters = Array.from(text);
  const requestedIndex = focusChar ? characters.indexOf(focusChar) : -1;
  const [focusIndex, setFocusIndex] = useState(
    requestedIndex >= 0 ? requestedIndex : Math.floor(characters.length / 2),
  );
  const length = clamp(scrollLength, 1.25, 5);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const paint = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - pin.offsetHeight);
      const progress = reduced.matches ? 0 : clamp(-rect.top / travel);
      const zoomProgress = smooth(0.04, 0.76, progress);
      const scale = Math.exp(Math.log(46) * zoomProgress);
      const characterWidth = 142;
      const targetX = 500 + (focusIndex - (characters.length - 1) / 2) * characterWidth;
      const targetY = 310;
      const transform = `translate(500 310) scale(${scale}) translate(${-targetX} ${-targetY})`;

      baseRef.current?.setAttribute("transform", transform);
      clipTextRef.current?.setAttribute("transform", transform);
      if (clippedFieldRef.current) {
        clippedFieldRef.current.style.opacity = String(smooth(0.08, 0.22, progress));
      }
      if (fieldRef.current) {
        fieldRef.current.style.opacity = String(smooth(0.68, 0.82, progress));
      }
      if (frontRef.current) {
        frontRef.current.style.opacity = String(1 - smooth(0.03, 0.18, progress));
        frontRef.current.style.pointerEvents = progress < 0.08 ? "auto" : "none";
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - smooth(0.01, 0.12, progress));
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = reduced.matches
          ? "0"
          : String(smooth(0.8, 0.94, progress));
        contentRef.current.style.transform = `translateY(${(1 - smooth(0.8, 0.94, progress)) * 28}px)`;
        contentRef.current.style.pointerEvents = progress > 0.9 ? "auto" : "none";
      }
      section.dataset.portalProgress = progress.toFixed(3);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, [characters.length, focusIndex]);

  return (
    <section
      ref={sectionRef}
      className={className}
      aria-label={`${text}. Experiência de abertura da Pravo.`}
      style={{ "--gp-length": length, ...style } as GlyphPortalStyle}
      data-glyph-portal
    >
      <style>{`
        [data-glyph-portal]{
          position:relative;
          height:calc(var(--gp-length) * 100svh);
          color:var(--gp-ink,#8e8e93);
          background:var(--gp-paper,#050505);
          isolation:isolate;
        }
        [data-glyph-portal] [data-gp-pin]{
          position:sticky;
          top:0;
          height:100svh;
          min-height:620px;
          overflow:hidden;
          background:var(--gp-paper,#050505);
          isolation:isolate;
        }
        [data-glyph-portal] [data-gp-field]{
          position:absolute;
          inset:0;
          background:var(--gp-field,#f5f5f7);
          opacity:0;
          z-index:2;
          pointer-events:none;
        }
        [data-glyph-portal] [data-gp-art]{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          z-index:1;
          overflow:visible;
        }
        [data-glyph-portal] [data-gp-front]{
          position:absolute;
          inset:0;
          z-index:3;
          transition:opacity .08s linear;
        }
        [data-glyph-portal] [data-gp-content]{
          position:absolute;
          inset:0;
          z-index:4;
          display:grid;
          place-items:center;
          padding:clamp(28px,6vw,90px);
          color:var(--gp-foreground,#050505);
          opacity:0;
          pointer-events:none;
          text-align:center;
        }
        [data-glyph-portal] [data-gp-choices]{
          position:absolute;
          left:50%;
          top:50%;
          z-index:5;
          width:min(84vw,1050px);
          height:clamp(130px,22vw,260px);
          transform:translate(-50%,-46%);
          display:grid;
          grid-template-columns:repeat(var(--gp-count),1fr);
          opacity:0;
        }
        [data-glyph-portal][data-portal-progress^="0.0"] [data-gp-choices]{opacity:1;}
        [data-glyph-portal] [data-gp-letter]{
          border:0;
          padding:0;
          background:transparent;
          cursor:crosshair;
        }
        [data-glyph-portal] [data-gp-letter]:focus-visible{
          outline:2px solid var(--gp-field,#f5f5f7);
          outline-offset:-6px;
        }
        [data-glyph-portal] [data-gp-hint]{
          position:absolute;
          z-index:5;
          left:50%;
          bottom:4.5%;
          transform:translateX(-50%);
          display:flex;
          align-items:center;
          gap:14px;
          font-size:11px;
          letter-spacing:.08em;
          text-transform:uppercase;
          white-space:nowrap;
        }
        [data-glyph-portal] [data-gp-hint] i{
          width:30px;
          height:1px;
          background:currentColor;
          opacity:.45;
        }
        @media(max-width:640px){
          [data-glyph-portal] [data-gp-pin]{min-height:560px;}
          [data-glyph-portal] [data-gp-choices]{width:92vw;height:30vw;}
        }
        @media(prefers-reduced-motion:reduce){
          [data-glyph-portal]{height:auto;}
          [data-glyph-portal] [data-gp-pin]{position:relative;height:78svh;min-height:560px;}
          [data-glyph-portal] [data-gp-hint],[data-glyph-portal] [data-gp-choices]{display:none;}
        }
      `}</style>

      <div ref={pinRef} data-gp-pin>
        <svg data-gp-art viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <clipPath id={id} clipPathUnits="userSpaceOnUse">
              <text
                ref={clipTextRef}
                x="500"
                y="368"
                textAnchor="middle"
                style={{ fontFamily, fontWeight, fontSize: 210, letterSpacing: -15 }}
              >
                {text}
              </text>
            </clipPath>
          </defs>
          <text
            ref={baseRef}
            x="500"
            y="368"
            textAnchor="middle"
            fill="var(--gp-ink,#8e8e93)"
            style={{ fontFamily, fontWeight, fontSize: 210, letterSpacing: -15 }}
          >
            {text}
          </text>
          <rect
            ref={clippedFieldRef}
            width="1000"
            height="620"
            fill="var(--gp-field,#f5f5f7)"
            clipPath={`url(#${id})`}
            style={{ opacity: 0 }}
          />
        </svg>

        <div ref={fieldRef} data-gp-field />
        {front && <div ref={frontRef} data-gp-front>{front}</div>}

        {interactive && (
          <div data-gp-choices style={{ "--gp-count": characters.length } as CSSProperties} aria-label="Escolha uma letra da palavra Pravo">
            {characters.map((character, index) => (
              <button
                key={`${character}-${index}`}
                type="button"
                data-gp-letter
                aria-label={`Entrar pela letra ${character}`}
                onPointerEnter={() => setFocusIndex(index)}
                onFocus={() => setFocusIndex(index)}
                onClick={() => setFocusIndex(index)}
              />
            ))}
          </div>
        )}

        {enterLabel && (
          <div ref={hintRef} data-gp-hint aria-hidden="true">
            <i /> {enterLabel} <span>↓</span>
          </div>
        )}

        <div ref={contentRef} data-gp-content>
          {children}
        </div>
      </div>
    </section>
  );
}
