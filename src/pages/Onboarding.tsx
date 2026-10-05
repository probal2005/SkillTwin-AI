import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Zap,
  AlertCircle,
} from "lucide-react";

import { useApp } from "@/hooks/useAppContext";

import { UploadZone } from "@/components/onboarding/UploadZone";
import { ProcessingAnimation } from "@/components/onboarding/ProcessingAnimation";
import { RoleSelector } from "@/components/onboarding/RoleSelector";
import { ExistingProfileAccess } from "@/components/onboarding/ExistingProfileAccess";
import { SkillBadge } from "@/components/common/SkillBadge";

import { roles } from "@/data/roles";

import { buildSkillTwin } from "@/services/skillEngine";

import { uploadResumeForProfile } from "@/services/profileApi";

import type { Role, UserProfile } from "@/types";

type Step = "upload" | "processing" | "role" | "review";

export function Onboarding() {
  const navigate = useNavigate();

  const { loadFromResume, setTargetRole, loadDemo } = useApp();

  const [step, setStep] = useState<Step>("upload");

  const [file, setFile] = useState<File | null>(null);

  const [selectedRole, setSelectedRole] = useState<Role | null>(roles[0]);

  const [extractedUser, setExtractedUser] = useState<UserProfile | null>(null);

  const [skillTwinId, setSkillTwinId] = useState<string | null>(null);

  const [existingProfile, setExistingProfile] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);

    setError(null);
  };

  const handleProcess = () => {
    if (!file) {
      setError("Please select a PDF or DOCX resume first.");

      return;
    }

    setError(null);

    setStep("processing");
  };

  /**
   * Real resume processing.
   *
   * Resume:
   *      ↓
   * FastAPI
   *      ↓
   * Parse
   *      ↓
   * Extract
   *      ↓
   * Find existing profile
   *      ↓
   * Create or load profile
   */

  const handleProcessingComplete = async () => {
    if (!file) {
      setError("No resume file selected.");

      setStep("upload");

      return;
    }

    try {
      setError(null);

      const result = await uploadResumeForProfile(file);

      setExtractedUser(result.user);

      setSkillTwinId(result.skillTwinId);

      setExistingProfile(result.existing);

      /*
       * If the backend detects a target role,
       * match it against the existing role list.
       */

      if (result.user.targetRole) {
        const detectedRole = roles.find(
          (role) =>
            role.name.toLowerCase() === result.user.targetRole.toLowerCase(),
        );

        if (detectedRole) {
          setSelectedRole(detectedRole);
        }
      }

      setStep("role");
    } catch (err) {
      console.error("Resume processing failed:", err);

      const message =
        err instanceof Error ? err.message : "Unable to analyze the resume.";

      setError(message);

      setStep("upload");
    }
  };

  const handleUseDemo = () => {
    loadDemo();

    navigate("/dashboard");
  };

  const handleRoleNext = () => {
    if (!selectedRole) {
      return;
    }

    setTargetRole(selectedRole.name);

    setStep("review");
  };

  const handleFinish = () => {
    if (extractedUser && selectedRole) {
      loadFromResume({
        ...extractedUser,

        targetRole: selectedRole.name,
      });

      navigate("/dashboard");
    }
  };

  const handleBackToUpload = () => {
    setError(null);

    setStep("upload");
  };

  const stepNumber =
    step === "upload" || step === "processing" ? 1 : step === "role" ? 2 : 3;

  const twin = extractedUser ? buildSkillTwin(extractedUser) : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}

      <header className="px-4 sm:px-8 py-4 border-b border-white/5 bg-navy-950/60 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>

            <span className="font-bold text-white text-lg">SkillTwin AI</span>
          </button>

          <button
            onClick={handleUseDemo}
            className="text-sm text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5"
          >
            <User size={14} />
            Use Demo Profile
          </button>
        </div>
      </header>

      {/* PROGRESS */}

      <div className="px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    s <= stepNumber ? "bg-indigo-500" : "bg-white/10"
                  }`}
                />

                <span
                  className={`text-xs mt-1.5 block ${
                    s <= stepNumber ? "text-indigo-400" : "text-white/30"
                  }`}
                >
                  Step {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="flex-1 px-4 sm:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* =========================================
              STEP 1 — UPLOAD
          ========================================= */}

          {step === "upload" && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-bold text-white mb-2">
                Upload Your Resume
              </h1>

              <p className="text-white/40 mb-8">
                Upload your resume to create or access your SkillTwin profile.
                No signup required.
              </p>

              <UploadZone
                onFileSelect={handleFileSelect}
                selectedFile={file}
                onClear={() => {
                  setFile(null);
                  setError(null);
                }}
              />

              {error && (
                <div className="mt-5 max-w-xl mx-auto flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />

                  <span>{error}</span>
                </div>
              )}

              {file && (
                <button
                  onClick={handleProcess}
                  className="btn-primary mt-6 flex items-center gap-2 mx-auto"
                >
                  Analyze Resume
                  <ArrowRight size={16} />
                </button>
              )}

              <ExistingProfileAccess onSuccess={() => navigate("/dashboard")} />

              <div className="mt-8 text-center">
                <button
                  onClick={handleUseDemo}
                  className="text-sm text-white/40 hover:text-white/60 transition-colors"
                >
                  Or skip and use the demo profile →
                </button>
              </div>
            </div>
          )}

          {/* =========================================
              STEP 2 — PROCESSING
          ========================================= */}

          {step === "processing" && (
            <div className="glass-card p-8 max-w-2xl mx-auto animate-fade-in">
              <h1 className="text-2xl font-bold text-white mb-2">
                Analyzing Your Resume
              </h1>

              <p className="text-white/40 mb-6 text-sm">
                SkillTwin AI is reading your resume, identifying your profile,
                and checking whether you already have a SkillTwin ID...
              </p>

              <ProcessingAnimation onComplete={handleProcessingComplete} />
            </div>
          )}

          {/* =========================================
              STEP 3 — ROLE
          ========================================= */}

          {step === "role" && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-bold text-white mb-2">
                {existingProfile ? "Welcome Back" : "Choose Your Target Role"}
              </h1>

              <p className="text-white/40 mb-8">
                {existingProfile
                  ? "We found your existing SkillTwin profile from your resume."
                  : "We'll compare your Skill Twin against the industry demand for this role."}
              </p>

              {extractedUser && (
                <div className="glass-card p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wider">
                        {existingProfile
                          ? "Existing SkillTwin Profile"
                          : "New SkillTwin Profile"}
                      </p>

                      <p className="text-white font-medium mt-1">
                        {extractedUser.name}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-white/40">SkillTwin ID</p>

                      <p className="text-cyan-400 font-bold text-lg tracking-wide">
                        {skillTwinId ?? "Generating..."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/40">Skills found</span>

                      <span className="text-cyan-400 font-bold">
                        {extractedUser.skills.length}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <RoleSelector
                onSelect={setSelectedRole}
                selected={selectedRole}
              />

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={handleBackToUpload}
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button
                  onClick={handleRoleNext}
                  className="btn-primary flex items-center gap-2"
                  disabled={!selectedRole}
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* =========================================
              STEP 4 — REVIEW
          ========================================= */}

          {step === "review" && twin && extractedUser && (
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-bold text-white mb-2">
                Review Your Skill Twin
              </h1>

              <p className="text-white/40 mb-8">
                Here's what we extracted. You can edit this later in your
                profile.
              </p>

              {/* SKILLTWIN ID */}

              <div className="glass-card p-5 mb-6 border border-cyan-400/10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider">
                      Your permanent SkillTwin ID
                    </p>

                    <p className="text-sm text-white/40 mt-1">
                      Use your resume to access this profile again.
                    </p>
                  </div>

                  <div className="text-xl font-bold text-cyan-400 tracking-wider">
                    {skillTwinId}
                  </div>
                </div>
              </div>

              {/* PROFILE CARD */}

              <div className="glass-card p-6 mb-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-lg font-bold text-white">
                    {extractedUser.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {extractedUser.name}
                    </h3>

                    <p className="text-sm text-white/40">
                      {extractedUser.education}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* LANGUAGES */}

                  <div>
                    <span className="text-xs font-semibold text-white/40 tracking-wider">
                      LANGUAGES
                    </span>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {twin.languages.map((s) => (
                        <SkillBadge
                          key={s.id}
                          name={s.name}
                          proficiency={s.proficiency}
                        />
                      ))}
                    </div>
                  </div>

                  {/* TOOLS */}

                  <div>
                    <span className="text-xs font-semibold text-white/40 tracking-wider">
                      TOOLS
                    </span>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {twin.tools.map((s) => (
                        <SkillBadge
                          key={s.id}
                          name={s.name}
                          proficiency={s.proficiency}
                        />
                      ))}
                    </div>
                  </div>

                  {/* DOMAIN */}

                  <div>
                    <span className="text-xs font-semibold text-white/40 tracking-wider">
                      DOMAIN
                    </span>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {twin.domain.map((s) => (
                        <SkillBadge
                          key={s.id}
                          name={s.name}
                          proficiency={s.proficiency}
                        />
                      ))}
                    </div>
                  </div>

                  {/* EXPERIENCE */}

                  <div>
                    <span className="text-xs font-semibold text-white/40 tracking-wider">
                      EXPERIENCE
                    </span>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {twin.experience.length > 0 ? (
                        twin.experience.map((exp, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70"
                          >
                            {exp}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-white/30">
                          No experience detected yet
                        </span>
                      )}
                    </div>
                  </div>

                  {/* EDUCATION */}

                  <div>
                    <span className="text-xs font-semibold text-white/40 tracking-wider">
                      EDUCATION
                    </span>

                    <p className="text-sm text-white/70 mt-2">
                      {twin.education}
                    </p>
                  </div>

                  {/* PROJECTS */}

                  {extractedUser.projects.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-white/40 tracking-wider">
                        PROJECTS
                      </span>

                      <div className="space-y-2 mt-2">
                        {extractedUser.projects.map((project, i) => (
                          <p key={i} className="text-sm text-white/70">
                            • {project}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CERTIFICATIONS */}

                  {extractedUser.certifications.length > 0 && (
                    <div>
                      <span className="text-xs font-semibold text-white/40 tracking-wider">
                        CERTIFICATIONS
                      </span>

                      <div className="space-y-2 mt-2">
                        {extractedUser.certifications.map((certificate, i) => (
                          <p key={i} className="text-sm text-white/70">
                            • {certificate}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ACTIONS */}

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setStep("role")}
                  className="btn-secondary flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button
                  onClick={handleFinish}
                  className="btn-primary flex items-center gap-2"
                >
                  Analyze My Career Fit
                  <Check size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
