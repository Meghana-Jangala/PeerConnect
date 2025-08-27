// dashboard.tsx
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockUsers, mockActivity } from "@/data/mockData";
import { Coins, Star, Handshake, Trophy, Clock } from "lucide-react";
import { useState, useEffect } from "react";

import ProfileSection from "./ProfileSection";
import SkillSection from "./SkillSection";
import SkillModal from "./SkillModal";

export default function Dashboard() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [teachSkills, setTeachSkills] = useState(user?.canTeach || []);
  const [learnSkills, setLearnSkills] = useState(user?.wantToLearn || []);
  const [showTeachModal, setShowTeachModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [saving, setSaving] = useState(false);

  // Debugging logs for mount
  useEffect(() => {
    console.log("📊 [Dashboard] Mounted");
    console.log("👤 [Dashboard] user from AuthContext:", user);
    console.log("📚 [Dashboard] Initial teachSkills:", teachSkills);
    console.log("📚 [Dashboard] Initial learnSkills:", learnSkills);
  }, []);

  // Sync skills if user changes
  useEffect(() => {
    console.log("🔄 [Dashboard] user updated:", user);
    if (user) {
      setTeachSkills(user.canTeach || []);
      setLearnSkills(user.wantToLearn || []);
      console.log("✅ [Dashboard] Synced teachSkills and learnSkills with updated user");
    }
  }, [user]);

  if (!user) {
    console.warn("⚠️ [Dashboard] No user found — returning null");
    return null;
  }

  const suggestedMatches = mockUsers.filter(u => u.id !== (user as any).id).slice(0, 3);
  const stats = {
    connections: (user as any).connections ?? 0,
    questionsAnswered: (user as any).questionsAnswered ?? 0,
    studyGroups: (user as any).studyGroups ?? 0,
    matches: (user as any).matches ?? 0,
    rank: (user as any).rank ?? "#--",
  };

  // ---- Handlers to save skills ----
  const handleSaveTeachSkill = () => {
    if (!teachInput.trim()) {
      console.warn("⚠️ [Dashboard] Tried saving empty teach skill");
      return;
    }
    setSaving(true);
    console.log("✏️ [Dashboard] Saving teach skill:", teachInput);

    setTimeout(() => {
      const updated = [...teachSkills, teachInput.trim()];
      console.log("✅ [Dashboard] Updated teachSkills:", updated);
      setTeachSkills(updated);
      setTeachInput("");
      setShowTeachModal(false);
      setSaving(false);
    }, 500);
  };

  const handleSaveLearnSkill = () => {
    if (!learnInput.trim()) {
      console.warn("⚠️ [Dashboard] Tried saving empty learn skill");
      return;
    }
    setSaving(true);
    console.log("✏️ [Dashboard] Saving learn skill:", learnInput);

    setTimeout(() => {
      const updated = [...learnSkills, learnInput.trim()];
      console.log("✅ [Dashboard] Updated learnSkills:", updated);
      setLearnSkills(updated);
      setLearnInput("");
      setShowLearnModal(false);
      setSaving(false);
    }, 500);
  };

  return (
    <div className="pb-20 md:pb-4 md:pt-20 theme-transition">
      {/* Header */}
      <ProfileSection user={user} theme={theme} setTheme={setTheme} />

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Welcome */}
        <Card className="gradient-primary text-white overflow-hidden">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {(user as any).firstName}! 👋
            </h1>
            <p className="text-primary-100 mb-4">
              Ready to learn something new today?
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.connections}</div>
                <div className="text-sm text-primary-100">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.questionsAnswered}</div>
                <div className="text-sm text-primary-100">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.studyGroups}</div>
                <div className="text-sm text-primary-100">Study Groups</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Coins" value={(user as any).coins ?? 0} icon={<Coins className="w-8 h-8 text-yellow-500" />} color="text-yellow-500" />
          <StatCard label="Reputation" value={(user as any).reputation ?? 0} icon={<Star className="w-8 h-8 text-green-500" />} color="text-green-500" />
          <StatCard label="Matches" value={stats.matches} icon={<Handshake className="w-8 h-8 text-blue-500" />} color="text-blue-500" />
          <StatCard label="Rank" value={stats.rank} icon={<Trophy className="w-8 h-8 text-purple-500" />} color="text-purple-500" />
        </div>

        {/* Skills */}
        <SkillSection
          teachSkills={teachSkills}
          learnSkills={learnSkills}
          setShowTeachModal={setShowTeachModal}
          setShowLearnModal={setShowLearnModal}
        />

        {/* Modals */}
        <SkillModal
          type="teach"
          open={showTeachModal}
          setOpen={setShowTeachModal}
          inputValue={teachInput}
          setInputValue={setTeachInput}
          saving={saving}
          onSave={handleSaveTeachSkill}
        />
        <SkillModal
          type="learn"
          open={showLearnModal}
          setOpen={setShowLearnModal}
          inputValue={learnInput}
          setInputValue={setLearnInput}
          saving={saving}
          onSave={handleSaveLearnSkill}
        />

        {/* Suggested Matches */}
        <Card className="card-hover theme-transition">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Handshake className="w-5 h-5 mr-2 text-primary-500" />
                Suggested Matches
              </CardTitle>
              <Button variant="link" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedMatches.map((match) => (
                <div key={match.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 card-hover">
                  <div className="flex items-center space-x-3 mb-3">
                    {match.profileImage ? (
                      <img
                        src={match.profileImage}
                        alt={match.firstName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 font-semibold">
                        {match.firstName?.[0]}
                        {match.lastName?.[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {match.firstName} {match.lastName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {match.university}
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 text-sm">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      Offers: {(match.canTeach || []).slice(0, 2).join(", ")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Wants: {(match.wantToLearn || []).slice(0, 2).join(", ")}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">Connect</Button>
                    <Button variant="outline" size="sm">Skip</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-hover theme-transition">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3 py-2">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'coins_earned' ? 'bg-green-500' :
                    activity.type === 'new_match' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`} />
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    {activity.description}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <Card className="card-hover theme-transition">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
