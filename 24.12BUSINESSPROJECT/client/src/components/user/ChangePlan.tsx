import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useChangePlan } from "@/hooks/tan-stack/useUsers";
import { useUser } from "@/context/UserContext";

const ChangePlan: React.FC = () => {
  const { user, setUser } = useUser();
  const [selectedPlan, setSelectedPlan] = useState<
    "Standard" | "Gold" | "Platinum"
  >(user?.plan || "Standard");
  const { mutate: changeUserPlan, isLoading } = useChangePlan();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value as "Standard" | "Gold" | "Platinum");
  };

  const handleSubmit = () => {
    setUser((prevUser) =>
      prevUser ? { ...prevUser, plan: selectedPlan } : null
    );

    changeUserPlan(selectedPlan);
    setDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Plan</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedPlan} onValueChange={handlePlanChange}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Standard" id="standard" />
                <Label htmlFor="standard">Standard Plan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Gold" id="gold" />
                <Label htmlFor="gold">Gold Plan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Platinum" id="platinum" />
                <Label htmlFor="platinum">Platinum Plan</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Change Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePlan;
