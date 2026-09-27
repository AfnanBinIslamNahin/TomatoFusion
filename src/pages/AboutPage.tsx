/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  ArrowRight,
  Leaf,
  User,
  GraduationCap,
  Building2,
  Sparkles,
  Github,
  Linkedin,
} from 'lucide-react';

interface AboutPageProps {
  onNavigateToDiagnose: () => void;
}

interface DeveloperProfile {
  name: string;
  title: string;
  university: string;
  role: string;
  bio: string;
  researchInterests: string[];
  imageSrc: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

/**
 * Developer Profile Configuration
 * Replace the placeholder strings with your actual information and URLs when ready.
 * If profile links are left empty or as placeholders, their buttons will remain hidden.
 */
const DEVELOPER_PROFILE: DeveloperProfile = {
  name: 'AFNAN BIN ISLAM NAHIN',
  title: 'BSc in Computer Science and Engineering Student',
  university: 'AIUB',
  role: 'Creator & Researcher of TomatoFusion',
  bio: 'Afnan Bin Islam NAHIN is a Computer Science and Engineering student with an interest in Artificial Intelligence, Machine Learning, Deep Learning, and Computer Vision. His work focuses on developing practical AI-based systems that can solve real-world problems. TomatoFusion was developed as part of his work on explainable deep learning for tomato leaf disease classification and intelligent diagnosis support.',
  researchInterests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Explainable AI',
  ],
  imageSrc: '/pic_cv.jpeg',
  // Optional links (leave empty or as placeholders until you want them shown):
  linkedinUrl: 'https://www.linkedin.com/in/a-f-n-a-n/',
};

function isValidLink(url: string | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (
    trimmed === '' ||
    trimmed.startsWith('[') ||
    trimmed.includes('example.com') ||
    trimmed.includes('placeholder')
  ) {
    return false;
  }
  return true;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToDiagnose }) => {
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const hasGithub = isValidLink(DEVELOPER_PROFILE.githubUrl);
  const hasLinkedin = isValidLink(DEVELOPER_PROFILE.linkedinUrl);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* ================================================== */}
      {/* 1. ABOUT TOMATOFUSION                              */}
      {/* ================================================== */}
      <section className="space-y-8">
        {/* Main Heading & Intro */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="flex flex-col items-center gap-3">
            {!logoError && (
              <img
                src="/TF.png"
                alt="TomatoFusion"
                onError={() => setLogoError(true)}
                className="h-12 sm:h-14 w-auto object-contain block"
              />
            )}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Agricultural AI Solution</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-sans tracking-tight">
            About TomatoFusion
          </h1>
          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            TomatoFusion is an AI-powered tomato leaf disease diagnosis system designed to help users identify common tomato leaf conditions from images. The system combines deep-learning-based image analysis, explainable AI visualization, and practical plant-care information to provide an easy-to-understand diagnosis experience.
          </p>
        </div>

        {/* Our Goal Card */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 md:p-10 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
              <Target className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-sans">
              Our Goal
            </h2>
          </div>
          <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
            Our goal is to make tomato leaf disease identification faster, easier, and more accessible while providing useful visual explanations and practical decision-support information.
          </p>
        </div>

        {/* What TomatoFusion Can Identify Card */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-800">
              <Leaf className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-sans">
              What TomatoFusion Can Identify
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: 'Early Blight',
                description: 'Characterized by dark concentric rings and yellow halos on leaves.',
              },
              {
                name: 'Late Blight',
                description: 'Identifiable by irregular water-soaked dark patches that spread rapidly.',
              },
              {
                name: 'Septoria Leaf Spot',
                description: 'Recognized by numerous small round lesions with grayish centers and dark borders.',
              },
              {
                name: 'Healthy Tomato Leaves',
                description: 'Vibrant green leaves free from fungal lesions, spotting, or viral discolorations.',
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5"
              >
                <div className="p-1.5 rounded-lg bg-emerald-100/90 text-emerald-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-stone-900 text-base">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. MEET THE DEVELOPER / RESEARCHER                 */}
      {/* ================================================== */}
      <section className="space-y-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-sans tracking-tight">
            Meet the Developer
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            The researcher and engineer behind the TomatoFusion diagnosis platform.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 md:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            {/* Profile Photograph / Neutral Fallback Placeholder */}
            <div className="shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100 flex items-center justify-center">
                {!imageError ? (
                  <img
                    src={DEVELOPER_PROFILE.imageSrc}
                    alt={DEVELOPER_PROFILE.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-400 p-4 text-center select-none">
                    <User className="w-16 h-16 sm:w-20 sm:h-20 text-stone-300 stroke-[1.5]" />
                    <span className="text-[11px] font-semibold text-stone-400 mt-2 uppercase tracking-wider">
                      Profile Photo
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{DEVELOPER_PROFILE.role}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-sans tracking-tight">
                  {DEVELOPER_PROFILE.name}
                </h3>

                <div className="mt-1.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-stone-600 text-sm sm:text-base font-medium justify-center md:justify-start">
                  <span className="flex items-center gap-1.5 justify-center md:justify-start">
                    <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{DEVELOPER_PROFILE.title}</span>
                  </span>
                  <span className="hidden sm:inline text-stone-300">•</span>
                  <span className="flex items-center gap-1.5 justify-center md:justify-start text-stone-500">
                    <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{DEVELOPER_PROFILE.university}</span>
                  </span>
                </div>
              </div>

              {/* Biography */}
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                {DEVELOPER_PROFILE.bio}
              </p>

              {/* Research Interests */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Research Interests
                </h4>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {DEVELOPER_PROFILE.researchInterests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center px-3 py-1 rounded-lg bg-stone-100 border border-stone-200/80 text-stone-700 text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Optional Profile Links (Shown only when configured) */}
              {(hasGithub || hasLinkedin) && (
                <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
                  {hasGithub && (
                    <a
                      href={DEVELOPER_PROFILE.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition shadow-xs"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {hasLinkedin && (
                    <a
                      href={DEVELOPER_PROFILE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs sm:text-sm font-semibold transition shadow-xs"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Button */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onNavigateToDiagnose}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <span>Diagnose a Tomato Leaf</span>
          <ArrowRight className="w-4 h-4 text-emerald-200" />
        </button>
      </div>
    </div>
  );
};
