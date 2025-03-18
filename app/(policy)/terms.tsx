import Footer from "@/components/footer";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-green-500 to-green-700 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
        </div>
      </header>

      <main className="flex-1 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Just-Varbs. By accessing or using our website, you agree
            to be bound by these terms of service and our privacy policy.
          </p>

          <h2 className="text-3xl font-bold mb-8">2. Use of the Site</h2>
          <p className="mb-4">
            You agree to use the site only for lawful purposes and in a way that
            does not infringe the rights of, restrict, or inhibit anyone
            else&apos;s use and enjoyment of the site.
          </p>

          <h2 className="text-3xl font-bold mb-8">3. Intellectual Property</h2>
          <p className="mb-4">
            All content on this site, including text, graphics, logos, and
            images, is the property of Just-Varbs or its content suppliers and
            is protected by international copyright laws.
          </p>

          <h2 className="text-3xl font-bold mb-8">
            4. Limitation of Liability
          </h2>
          <p className="mb-4">
            Just-Varbs will not be liable for any damages arising from the use
            of this site.
          </p>

          <h2 className="text-3xl font-bold mb-8">5. Changes to These Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. Your
            continued use of the site after any changes indicates your
            acceptance of the new terms.
          </p>

          <h2 className="text-3xl font-bold mb-8">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about these terms, please contact us at{" "}
            <Link href="/contact" className="text-green-500 hover:underline">
              Contact
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
