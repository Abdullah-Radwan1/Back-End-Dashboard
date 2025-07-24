import Link from "next/link";
import { navItems } from "../../../utils/nav-items";

export default function SidebarNav() {
  return navItems.map((item, index) =>
    item.type === "section" ? (
      <p
        key={index}
        className="text-muted-foreground font-semibold uppercase text-xs px-4 pt-6"
      >
        {item.text}
      </p>
    ) : (
      <Link
        key={index}
        href={item.path || "#"}
        className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        {item.icon}
        <span className="text-sm">{item.text}</span>
      </Link>
    )
  );
}
