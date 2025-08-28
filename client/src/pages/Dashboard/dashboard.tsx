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
  const { user, isLoading, updateUserProfile } = useAuth();
  const { theme, setTheme } = useTheme();

  const [showTeachModal, setShowTeachModal] = useState(false);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [suggestedMatches, setSuggestedMatches] = useState<any[]>([]);

  // ✅ Fetch suggested matches from API (exclude current user)
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch users");

        // ✅ Exclude current user (always compare as string)
        const otherUsers = data.filter(
          (u: any) => String(u._id || u.id) !== String(user._id)
        );
        setSuggestedMatches(otherUsers.slice(0, 3));
      } catch (err) {
        console.error("❌ Error fetching suggested matches:", err);

        // fallback → mockUsers (filter by id or _id)
        const fallback = mockUsers
          .filter(
            (u) =>
              String(u._id || u.id) !== String(user._id)
          )
          .slice(0, 3);
        setSuggestedMatches(fallback);
      }
    };

    fetchUsers();
  }, [user]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading your dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        You must be logged in to view the dashboard.
      </div>
    );
  }

  const stats = {
    connections: user.connections ?? 0,
    questionsAnswered: user.questionsAnswered ?? 0,
    studyGroups: user.studyGroups ?? 0,
    matches: user.matches ?? 0,
    rank: user.rank ?? "#--",
  };

  // ---- Handlers to save skills (persist to backend) ----
  const handleSaveTeachSkill = async () => {
    if (!teachInput.trim()) return;
    setSaving(true);
    try {
      await updateUserProfile({
        canTeach: [...(user.canTeach || []), teachInput.trim()],
      });
      setTeachInput("");
      setShowTeachModal(false);
    } catch (err) {
      console.error("Failed to save teach skill:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLearnSkill = async () => {
    if (!learnInput.trim()) return;
    setSaving(true);
    try {
      await updateUserProfile({
        wantToLearn: [...(user.wantToLearn || []), learnInput.trim()],
      });
      setLearnInput("");
      setShowLearnModal(false);
    } catch (err) {
      console.error("Failed to save learn skill:", err);
    } finally {
      setSaving(false);
    }
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
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="text-primary-100 mb-4">
              Ready to learn something new today?
            </p>
            <div className="flex items-center space-x-6">
              <StatMini label="Connections" value={stats.connections} />
              <StatMini
                label="Questions Answered"
                value={stats.questionsAnswered}
              />
              <StatMini label="Study Groups" value={stats.studyGroups} />
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Coins"
            value={user.coins ?? 0}
            icon={<Coins className="w-8 h-8 text-yellow-500" />}
            color="text-yellow-500"
          />
          <StatCard
            label="Reputation"
            value={user.reputation ?? 0}
            icon={<Star className="w-8 h-8 text-green-500" />}
            color="text-green-500"
          />
          <StatCard
            label="Matches"
            value={stats.matches}
            icon={<Handshake className="w-8 h-8 text-blue-500" />}
            color="text-blue-500"
          />
          <StatCard
            label="Rank"
            value={stats.rank}
            icon={<Trophy className="w-8 h-8 text-purple-500" />}
            color="text-purple-500"
          />
        </div>

        {/* Skills */}
        <SkillSection
          teachSkills={user.canTeach}
          learnSkills={user.wantToLearn}
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
              <Button variant="link" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {suggestedMatches.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No suggested matches available.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedMatches.map((match) => (
                  <div
                    key={match._id || match.id}
                    className="border rounded-lg p-4 card-hover"
                  >
                    <h4 className="font-medium">
                      {match.firstName} {match.lastName}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Offers: {(match.canTeach || []).slice(0, 2).join(", ")}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Wants: {(match.wantToLearn || []).slice(0, 2).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
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
            {mockActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-3 py-2"
              >
                <span className="text-sm flex-1">{activity.description}</span>
                <span className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
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

function StatMini({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-primary-100">{label}</div>
    </div>
  );
}
