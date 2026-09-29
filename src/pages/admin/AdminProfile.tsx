import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { getProfile, updateProfile } from '../../services/profile';
import { Profile, ProfileInput } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { Toast } from '../../components/ui/Toast';
import { LoadingState } from '../../components/ui/States';

export const AdminProfile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('');
  const [locationLabel, setLocationLabel] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [bio, setBio] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [email, setEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    getProfile()
      .then((data) => {
        setProfile(data);
        if (data) {
          setName(data.name || '');
          setRole(data.role || '');
          setAvailabilityStatus(data.availability_status || '');
          setLocationLabel(data.location_label || '');
          setHeroTitle(data.hero_title || '');
          setHeroDescription(data.hero_description || '');
          setBio(data.bio || '');
          setShortBio(data.short_bio || '');
          setEmail(data.email || '');
          setGithubUrl(data.github_url || '');
          setLinkedinUrl(data.linkedin_url || '');
          setInstagramUrl(data.instagram_url || '');
          setAvatarUrl(data.avatar_url || '');
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const input: ProfileInput = {
      name,
      role,
      availability_status: availabilityStatus,
      location_label: locationLabel,
      hero_title: heroTitle,
      hero_description: heroDescription,
      bio,
      short_bio: shortBio,
      email,
      github_url: githubUrl,
      linkedin_url: linkedinUrl,
      instagram_url: instagramUrl,
      avatar_url: avatarUrl,
    };

    try {
      const updated = await updateProfile(input);
      setProfile(updated);
      setToast({ type: 'success', message: 'Operator profile manifest successfully deployed.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile';
      setToast({ type: 'error', message: msg });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="ACCESSING OPERATOR CONFIGURATION..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="border-b-2 border-border pb-6">
        <span className="font-mono text-xs font-bold text-accent uppercase">
          [OPERATOR_IDENTITY]
        </span>
        <h1 className="text-3xl font-black font-sans uppercase tracking-tight text-foreground">
          PROFILE MANAGEMENT
        </h1>
        <p className="font-mono text-xs text-muted-foreground mt-1">
          Configure personal branding, role, hero copy, and communication endpoints.
          {profile?.updated_at && ` (Last updated: ${new Date(profile.updated_at).toLocaleDateString()})`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-surface p-6 sm:p-8 border-3 border-border shadow-brutal">
        {/* Basic Identity */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent border-b border-border/30 pb-2">
            01. PUBLIC IDENTITY &amp; HERO HOOK
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="OPERATOR FULL NAME *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="CORE ROLE / SPECIALIZATION"
              placeholder="Fullstack Developer &amp; Systems Architect"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="AVAILABILITY STATUS BADGE"
              placeholder="AVAILABLE FOR NEW MISSIONS &amp; HIRES"
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
            />
            <Input
              label="LOCATION LABEL"
              placeholder="Jakarta, Indonesia (GMT+7)"
              value={locationLabel}
              onChange={(e) => setLocationLabel(e.target.value)}
            />
          </div>

          <Input
            label="HERO HEADLINE STATEMENT"
            placeholder="BUILDING DIGITAL PRODUCTS WITH CODE &amp; CURIOSITY."
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
          />

          <Textarea
            label="HERO DESCRIPTION PARAGRAPH"
            rows={2}
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
          />
        </div>

        {/* Avatar and Bios */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent border-b border-border/30 pb-2">
            02. BIOGRAPHY &amp; OPERATOR AVATAR
          </h3>

          <ImageUploader
            label="AVATAR / PORTRAIT IMAGE"
            folder="profile"
            value={avatarUrl}
            onChange={(url) => setAvatarUrl(url)}
          />

          <Textarea
            label="SHORT BIO (FOOTER / SUMMARY)"
            rows={2}
            value={shortBio}
            onChange={(e) => setShortBio(e.target.value)}
          />

          <Textarea
            label="DETAILED BIOGRAPHY (ABOUT SECTION)"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        {/* Communication Endpoints */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-accent border-b border-border/30 pb-2">
            03. COMMUNICATION CHANNELS &amp; NETWORKS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="PRIMARY INQUIRY EMAIL"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="GITHUB URL"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="LINKEDIN URL"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
            />
            <Input
              label="INSTAGRAM URL"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t-2 border-border flex justify-end">
          <Button type="submit" variant="primary" size="lg" loading={saving}>
            COMMIT PROFILE CHANGES <Save className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};
