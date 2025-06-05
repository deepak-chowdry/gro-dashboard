"use client"
import { LayoutDashboard, Megaphone } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Grievances",
        url: "/greivances",
        icon: Megaphone,
    },
]

import { usePathname } from "next/navigation"

export function AppSidebar() {
    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="h-14">
                <SidebarMenu className="h-full">
                    <SidebarMenuItem className="flex items-center justify-between group-data-[collapsible=icon]:px-0.5 pl-2 h-full">
                        <h3 className="text-sm font-bold uppercase state-[collapsed]:hidden group-data-[collapsible=icon]:hidden">GRO</h3>
                        <SidebarTrigger />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem
                                        key={item.title}
                                        className={isActive ? "bg-muted text-black" : "text-muted-foreground"}
                                    >
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}