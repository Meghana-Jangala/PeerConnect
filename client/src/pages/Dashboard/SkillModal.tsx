import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SkillModal({
  type,
  open,
  setOpen,
  inputValue,
  setInputValue,
  saving,
  onSave,
}: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add {type === "teach" ? "a Teaching Skill" : "a Learning Interest"}
          </DialogTitle>
        </DialogHeader>
        <Input
          placeholder={`Enter a skill to ${type}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button
          className="mt-3"
          onClick={onSave}
          disabled={saving || !inputValue.trim()}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
