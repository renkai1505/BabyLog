"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
      <Table className="min-w-[640px] w-full">
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
  );
}
