"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

export default function DataForm({
  title,
  description,
  fields,
  values,
  onSubmit,
  onCancel,
  submitLabel = "保存",
  isOpen,
  onOpenChange,
  loading = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4">
            {fields.map((field) => (
              <div key={field.name} className="grid gap-2">
                {field.render(values, field)}
              </div>
            ))}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="w-full sm:w-auto"
              >
                取消
              </Button>
            )}
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? "处理中..." : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
