"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DataTable({
  columns,
  data,
  actions,
  loading,
  error,
  emptyMessage = "暂无数据",
  loadingMessage = "加载中...",
}) {
  if (loading) {
    return <div className="text-center py-4">{loadingMessage}</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-4">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm">
      <div className="divide-y divide-border/60 md:hidden">
        {data.map((item) => (
          <div key={item.id} className="space-y-4 p-4">
            <div className="space-y-3">
              {columns.map((column) => (
                <div
                  key={`${item.id}-${column.key}`}
                  className="flex items-start justify-between gap-4"
                >
                  <span className="shrink-0 text-sm text-muted-foreground">{column.title}</span>
                  <div className={cn("text-right text-sm font-medium", column.className)}>
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </div>
                </div>
              ))}
            </div>

            {actions ? (
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant || "ghost"}
                    size="sm"
                    className={cn("w-full sm:w-auto", action.className)}
                    onClick={() => action.onClick(item)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="hidden md:block">
        <Table className="w-full min-w-[640px]">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={column.className || "text-left"}
                >
                  {column.title}
                </TableHead>
              ))}
              {actions && <TableHead className="text-right">操作</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell
                    key={`${item.id}-${column.key}`}
                    className={column.className || "whitespace-nowrap"}
                  >
                    {column.render
                      ? column.render(item[column.key], item)
                      : item[column.key]}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      {actions.map((action) => (
                        <Button
                          key={action.label}
                          variant={action.variant || "ghost"}
                          size="sm"
                          className={action.className || ""}
                          onClick={() => action.onClick(item)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
