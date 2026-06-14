import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
  "2xl": "h-20 w-20 text-2xl",
};

const dotSizeClasses: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5 ring-1",
  sm: "h-2 w-2 ring-1",
  md: "h-2.5 w-2.5 ring-1",
  lg: "h-3 w-3 ring-2",
  xl: "h-3.5 w-3.5 ring-2",
  "2xl": "h-4 w-4 ring-2",
};

// Generate a consistent color from name string
function getAvatarColor(name: string): string {
  const colors = [
    "bg-primary-500",
    "bg-secondary-500",
    "bg-accent-500",
    "bg-warning-500",
    "bg-pink-500",
    "bg-cyan-500",
    "bg-rose-500",
    "bg-teal-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  online?: boolean;
  offline?: boolean;
  square?: boolean;
}

function Avatar({
  src,
  name = "User",
  size = "md",
  online,
  offline,
  square,
  className,
  ...props
}: AvatarProps) {
  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);
  const showDot = online !== undefined || offline !== undefined;

  return (
    <div className={cn("relative inline-flex shrink-0", className)} {...props}>
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden font-semibold text-white",
          sizeClasses[size],
          square ? "rounded-lg" : "rounded-full",
          !src && bgColor
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <span className="leading-none">{initials}</span>
        )}
      </div>

      {showDot && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-white dark:ring-slate-800",
            dotSizeClasses[size],
            online ? "bg-secondary-500" : "bg-slate-400"
          )}
        />
      )}
    </div>
  );
}

// Avatar Group
interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: Array<{ src?: string | null; name: string }>;
  max?: number;
  size?: AvatarSize;
}

function AvatarGroup({ avatars, max = 4, size = "sm", className, ...props }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visible.map((avatar, i) => (
        <Avatar
          key={i}
          src={avatar.src}
          name={avatar.name}
          size={size}
          className="ring-2 ring-white dark:ring-slate-800"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 font-medium ring-2 ring-white dark:ring-slate-800 text-xs",
            sizeClasses[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup };
