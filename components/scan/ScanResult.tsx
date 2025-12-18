import RiskBar from "./RiskBar";

type Props = {
  result: {
    url: string;
    score: number;
    verdict: "safe" | "suspicious" | "malicious";
    color: "green" | "yellow" | "red";
    flags: string[];
    sslValid: boolean;
    redirects: number;
    vtStats: {
      harmless: number;
      malicious: number;
      suspicious: number;
      undetected: number;
    };
  };
};

const verdictColor = {
  safe: "text-emerald-400",
  suspicious: "text-yellow-400",
  malicious: "text-red-500",
};

export default function ScanResult({ result }: Props) {
  return (
    <div
      className="mt-6 p-6 rounded-2xl
                 border border-white/10
                 bg-black/40"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          Scan Result
        </h3>

        <span
          className={`text-sm font-semibold uppercase
                     ${verdictColor[result.verdict]}`}
        >
          {result.verdict}
        </span>
      </div>

      {/* Risk Bar */}
      <RiskBar
        score={result.score}
        color={result.color}
      />

      {/* Meta info */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-zinc-300">
        <p>
          <span className="text-zinc-400">SSL Valid:</span>{" "}
          {result.sslValid ? "Yes" : "No"}
        </p>
        <p>
          <span className="text-zinc-400">Redirects:</span>{" "}
          {result.redirects}
        </p>
      </div>

      {/* Flags */}
      {result.flags.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-zinc-400 mb-2">
            Detected Issues
          </p>
          <ul className="space-y-2">
            {result.flags.map((flag, i) => (
              <li
                key={i}
                className="text-sm text-zinc-300
                           flex items-start gap-2"
              >
                <span className="text-yellow-400">⚠</span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* VirusTotal */}
      <div className="mt-5 border-t border-white/10 pt-4 text-sm">
        <p className="text-zinc-400 mb-1">
          VirusTotal Summary
        </p>
        <div className="grid grid-cols-2 gap-2 text-zinc-300">
          <p>Harmless: {result.vtStats.harmless}</p>
          <p>Malicious: {result.vtStats.malicious}</p>
          <p>Suspicious: {result.vtStats.suspicious}</p>
          <p>Undetected: {result.vtStats.undetected}</p>
        </div>
      </div>
    </div>
  );
}
