import { useState } from 'react';
import { ArrowRight, KeyRound, Loader2 } from 'lucide-react';
import { getProfileBySkillTwinId } from '@/services/profileApi';
import { useApp } from '@/hooks/useAppContext';

interface ExistingProfileAccessProps {
  onSuccess?: () => void;
}

export function ExistingProfileAccess({
  onSuccess,
}: ExistingProfileAccessProps) {
  const { loadFromResume } = useApp();

  const [skillTwinId, setSkillTwinId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleOpenProfile() {
    const cleanId = skillTwinId.trim().toUpperCase();

    if (!cleanId) {
      setError('Please enter your SkillTwin ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await getProfileBySkillTwinId(cleanId);

      loadFromResume(result.user);

      onSuccess?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to find this SkillTwin ID.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      void handleOpenProfile();
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card/60 p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <KeyRound size={19} />
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Already have a SkillTwin ID?
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter your ID to reopen your saved profile without uploading your
            resume again.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={skillTwinId}
          onChange={(event) => {
            setSkillTwinId(event.target.value.toUpperCase());
            setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder="ST0001PDHAI"
          aria-label="SkillTwin ID"
          autoComplete="off"
          spellCheck={false}
          className="h-11 min-w-0 flex-1 rounded-xl border border-white/20 bg-white px-4 text-sm font-semibold tracking-wide text-black placeholder:text-gray-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        />

        <button
          type="button"
          onClick={() => void handleOpenProfile()}
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Opening...
            </>
          ) : (
            <>
              Open Profile
              <ArrowRight size={17} />
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
