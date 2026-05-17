/* eslint-disable @next/next/no-img-element */
"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { UPLOAD_CONFIG } from "@/lib/config";

export default function PhotoGallery({
  photos = [],
  gridClassName,
  imageClassName,
  removable = false,
  onDelete,
}) {
  if (!photos.length) {
    return null;
  }

  return (
    <div className={cn("grid grid-cols-2 gap-2 md:grid-cols-3", gridClassName)}>
      {photos.map((photo, index) => {
        const key = photo.id ?? photo.file_path ?? photo.file_name ?? index;
        const imageUrl = UPLOAD_CONFIG.getFileUrl(photo.file_path);

        return (
          <div key={key} className={cn("relative", removable && "group")}>
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" className="block w-full overflow-hidden rounded-lg">
                  <img
                    src={imageUrl}
                    alt={photo.file_name || "日志图片"}
                    className={cn(
                      "h-32 w-full rounded-lg object-cover transition-opacity hover:opacity-90",
                      imageClassName
                    )}
                  />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
                <DialogTitle className="sr-only">图片预览</DialogTitle>
                <DialogDescription className="sr-only">
                  查看上传的图片大图，按ESC键关闭预览
                </DialogDescription>
                <img
                  src={imageUrl}
                  alt={photo.file_name || "日志图片"}
                  className="h-auto max-h-[90vh] w-full object-contain"
                />
              </DialogContent>
            </Dialog>

            {removable && onDelete ? (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 opacity-100 shadow-sm transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
                onClick={() => onDelete(photo)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">删除图片</span>
              </Button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
