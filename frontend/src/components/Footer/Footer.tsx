// src/components/Footer.tsx
import { Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} SaaS Notes. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a
            href="https://github.com/Roshan21p"
            target="_blank"
            className="hover:text-white transition"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/roshan21p/"
            target="_blank"
            className="hover:text-white transition"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
