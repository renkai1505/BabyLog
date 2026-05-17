"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function BabyFilter({ babies, selectedBabies, onBabiesChange }) {
  return (
    <div className="mb-6 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm">
      <Label className="mb-3 block text-sm font-medium text-muted-foreground">选择要显示的宝宝记录</Label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {babies.map((baby) => (
          <div
            key={baby.id}
            className={cn(
              "flex items-center space-x-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 transition-colors",
              selectedBabies.includes(baby.id) && "border-primary/30 bg-primary/5 shadow-sm"
            )}
          >
            <Checkbox
              id={`filter-baby-${baby.id}`}
              checked={selectedBabies.includes(baby.id)}
              onCheckedChange={(checked) => {
                onBabiesChange(
                  checked
                    ? [...selectedBabies, baby.id]
                    : selectedBabies.filter((id) => id !== baby.id)
                );
              }}
            />
            <Label htmlFor={`filter-baby-${baby.id}`}>{baby.name}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
