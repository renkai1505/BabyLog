"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../theme-toggle";
import { Button } from "@/components/ui/button";
import { BookOpenText, HeartPulse, Home, LogOut, Menu, PlusCircle, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function MainLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "首页", icon: Home, exact: true },
    { href: "/blogs", label: "日志", icon: BookOpenText },
    { href: "/blogs/create", label: "添加日志", icon: PlusCircle, exact: true },
    { href: "/health", label: "健康", icon: HeartPulse },
    { href: "/users", label: "管理", icon: Settings },
  ];

  const isActiveLink = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }

    if (item.href === "/") {
      return pathname === item.href;
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('access_token');
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-30 border-b border-border/40 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-3 sm:px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-xl shadow-sm ring-1 ring-primary/15">
                <span aria-hidden="true">👶</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-semibold tracking-tight sm:text-lg">BabyLog</p>
                <p className="hidden text-xs text-muted-foreground sm:block">记录宝宝成长的每个闪亮瞬间</p>
              </div>
            </Link>
            <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/70 hover:text-foreground",
                      isActive && "bg-primary/10 text-primary shadow-sm"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ModeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="rounded-full border-border/60 bg-background/70 shadow-sm"
            >
              <LogOut className="h-[1.1rem] w-[1.1rem]" />
              <span className="sr-only">退出登录</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border/60 bg-background/70 shadow-sm md:hidden"
                >
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-xs border-l border-border/60 bg-background/95 px-5 py-6 backdrop-blur-xl md:hidden">
                <SheetTitle className="text-lg font-semibold">导航菜单</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">选择要访问的页面</SheetDescription>
                <nav className="mt-6 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveLink(item);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition-colors hover:border-border/60 hover:bg-accent/60",
                          isActive && "border-primary/20 bg-primary/10 text-primary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <main className="mx-auto w-full max-w-6xl px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        <div className="rounded-[28px] border border-border/50 bg-background/70 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-sm">
          <div className="px-4 py-5 sm:px-6 sm:py-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
