import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-3xl font-semibold mb-4">
            How QRGuard Works
          </h1>
          <p className="text-sm text-zinc-400">
            QRGuard analyzes QR codes and links through multiple
            security layers to detect phishing, malicious redirects,
            and suspicious behavior before the user interacts.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Step 1 */}
          <Card>
            <span className="text-xs text-emerald-400 font-medium">
              STEP 1
            </span>
            <h2 className="text-xl font-semibold mt-2 mb-2">
              Scan QR or Import Link
            </h2>
            <p className="text-sm text-zinc-400">
              The user uploads a QR code image or pastes a URL.
              QRGuard safely extracts and normalizes the embedded
              link without executing it.
            </p>
          </Card>

          {/* Step 2 */}
          <Card>
            <span className="text-xs text-emerald-400 font-medium">
              STEP 2
            </span>
            <h2 className="text-xl font-semibold mt-2 mb-2">
              Static Analysis
            </h2>
            <p className="text-sm text-zinc-400">
              The extracted URL is inspected for suspicious patterns
              such as unusual domains, misleading keywords,
              IP-based URLs, and known threat indicators.
            </p>
          </Card>

          {/* Step 3 */}
          <Card>
            <span className="text-xs text-emerald-400 font-medium">
              STEP 3
            </span>
            <h2 className="text-xl font-semibold mt-2 mb-2">
              Dynamic Analysis
            </h2>
            <p className="text-sm text-zinc-400">
              The link is executed in a controlled sandbox
              environment to observe redirects, scripts,
              and runtime behavior without risking the user.
            </p>
          </Card>

          {/* Step 4 */}
          <Card>
            <span className="text-xs text-emerald-400 font-medium">
              STEP 4
            </span>
            <h2 className="text-xl font-semibold mt-2 mb-2">
              Risk Assessment & Report
            </h2>
            <p className="text-sm text-zinc-400">
              QRGuard generates a transparent risk score and
              classification, explaining why the link is safe,
              suspicious, or dangerous.
            </p>
          </Card>
        </div>

        {/* CTA */}
       {/* CTA */}
<div className="mt-20 flex justify-center">
  <Link href="/scan">
    <Button>
      Start Scanning
    </Button>
  </Link>
</div>

      </div>
    </section>
  );
}
