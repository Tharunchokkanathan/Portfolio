import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon, XIcon } from './Icons';
import FolderFloat from './FolderFloat';
import BlurText from './BlurText';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal, socials } = portfolioData;

  const folderLinks = [
    {
      label: 'LinkedIn',
      value: 'linkedin',
      href: socials.linkedin,
      icon: <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
    },
    {
      label: 'GitHub',
      value: 'github',
      href: socials.github,
      icon: <GithubIcon className="w-3.5 h-3.5 text-[#09090b]" />
    },
    {
      label: 'Email Me',
      value: 'email',
      href: `https://mail.google.com/mail/?extsrc=mailto&url=mailto%3A${socials.email}`,
      icon: <Mail className="w-3.5 h-3.5 text-[#EA4335]" />
    },
    {
      label: 'X (Twitter)',
      value: 'twitter',
      href: socials.twitter,
      icon: <XIcon className="w-3.5 h-3.5 text-[#09090b]" />
    }
  ];

  return (
    <footer id="contact" className="relative pt-24 pb-28 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 scroll-mt-6">
      {/* Ambient background glow in premium dark green */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#10b981]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-2xl mx-auto mb-16">
        <div className="flex justify-center mb-6">
          <BlurText
            as="h2"
            text="Let’s build something extraordinary."
            blur={14}
            distance={65}
            delay={60}
            highlightWords={['extraordinary.']}
            highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-emerald-400"
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight justify-center text-center"
          />
        </div>

        <BlurText
          as="p"
          text="Looking for a frontend engineer or UI/UX developer to take your project from concept to launch? My inbox and DMs are always open."
          blur={8}
          distance={25}
          delay={180}
          className="text-sm sm:text-base text-zinc-400 mb-6 leading-relaxed text-center justify-center max-w-xl mx-auto"
        />

        {/* 3D Physics Floating Folder in Black, Grey, and Premium Dark Green */}
        <div className="relative pt-24 pb-8 flex flex-col items-center justify-center z-20">
          <FolderFloat
            items={folderLinks}
            label="Connect & Channels"
            sublabel="Hover or tap to open"
            trigger="hover"
            closeOnSelect={false}
            physics={true}
            drift={0.35}
            folderColor="#101512"
            frontColor="#17241c"
            paperColor="#ffffff"
            itemColor="#ffffff"
            itemTextColor="#09090b"
            labelColor="#f4f4f5"
            width={210}
            height={148}
            radius={14}
            spread={170}
            lift={32}
            tilt={6}
            flapAngle={32}
            restAngle={14}
            openDuration={480}
            stagger={38}
            bounce={0.12}
          />

          <p className="text-[11px] font-mono text-zinc-500 mt-5 tracking-wider uppercase flex items-center gap-2">
            <span>✦ Hover or tap to unleash channels</span>
            <span>•</span>
            <span>Drag or click pills to connect</span>
          </p>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
        <div>
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
