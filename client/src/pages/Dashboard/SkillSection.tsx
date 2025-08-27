import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TeachSkills from "./TeachSkills";
import LearnSkills from "./LearnSkills";

export default function SkillSection({
  teachSkills,
  learnSkills,
  setShowTeachModal,
  setShowLearnModal,
}: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Teach Skills */}
      <Card className="card-hover theme-transition">
        <CardHeader>
          <CardTitle>Can Teach</CardTitle>
        </CardHeader>
        <CardContent>
          <TeachSkills
            skills={teachSkills}
            setShowModal={setShowTeachModal}
          />
        </CardContent>
      </Card>

      {/* Learn Skills */}
      <Card className="card-hover theme-transition">
        <CardHeader>
          <CardTitle>Want to Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <LearnSkills
            skills={learnSkills}
            setShowModal={setShowLearnModal}
          />
        </CardContent>
      </Card>
    </div>
  );
}
