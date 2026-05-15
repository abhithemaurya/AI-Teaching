import { path } from "framer-motion/client";
import {
  LayoutDashboard,
  HelpCircle,
  FileText,
  BookOpen,
  CalendarDays,
  Users,
  Settings,
  ShieldCheck,
  Mail,
  icons,
  AirVent,
  Theater,
  WandSparkles,
  Settings2,
} from "lucide-react";
import { Children } from "react";


export const sidebarLinks = [
  {
    name: "Dashboard",
    path: "/teacher/dashboard",
    icon: LayoutDashboard,
     roles: ["TEACHER"],
  },
  {
    name: "Question Gen",
    path: "/teacher/questions",
    icon: HelpCircle,
     roles: ["TEACHER"],
  },
  {
    name: "Worksheets",
    path: "/teacher/worksheets",
    icon: FileText,
     roles: ["TEACHER"],
  },
  {
    name: "Lessons",
    path: "/teacher/lessons",
    icon: BookOpen,
     roles: ["TEACHER"],
  },
  {
    name: "Weekly Planner",
    path: "/teacher/weekly-planner",
    icon: CalendarDays,
     roles: ["TEACHER"],
  },
  {
    name:"Admin Dashboard",
    path:"/superadmin/dashboard",
    icon: ShieldCheck,
    roles: ["SUPERADMIN"],
  },
   {
    name: "Admin List",
    path: "/superadmin/admins",
    icon: Users,
    roles: ["SUPERADMIN"],
  },
  {
    name: "Teacher List",
    path: "/superadmin/teachers",
    icon: Users,
    roles: ["SUPERADMIN"],
  },
  {
    name: "Configuration",
    path: "/superadmin/config",
    icon: Settings,
    roles: ["SUPERADMIN"],
    children:[
      {
        name : "Email Manager",
        path: "/superadmin/email-manager",
        icon: Mail,
        roles: ["SUPERADMIN"]
      },
      {
        name: "AI Config",
        path: "/superadmin/config",
        icon:  Settings2,
        roles: ["SUPERADMIN"]
      },
      {
       name: "AI Prompt",
       "path": "/superadmin/ai-prompt",
       icon: WandSparkles,
       roles: ["SUPERADMIN"]

      }
    ]

  },
   
  
];





