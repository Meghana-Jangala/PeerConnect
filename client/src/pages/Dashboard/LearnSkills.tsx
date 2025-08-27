import { Button } from "@/components/ui/button";

export default function LearnSkills({ skills, setShowModal }: any) {
  return (
    <div>
      {skills.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {skills.map((skill: string, idx: number) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">You haven’t added any interests yet.</p>
      )}
      <Button size="sm" className="mt-3" onClick={() => setShowModal(true)}>
        + Add Interest
      </Button>
    </div>
  );
}
