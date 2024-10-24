import {
  MonitorDot,
  PictureInPicture2,
  MessagesSquare,
  Mail,
  CalendarDays,
  ShoppingBag,
  CircuitBoard,
  ScrollText,
  RadioTower,
  FileText,
  User2,
  Award,
  Codesandbox,
  LifeBuoy,
  PackagePlus,
  LocateFixed,
  Table,
  PieChart,
  Trophy,
  Map,
  Server,
  ServerCog
} from "lucide-vue-next";
import { MenuItemType } from "@/app/layout/types";

export const menuItems: MenuItemType[] = [
  {
    icon: MonitorDot,
    title: "dashboards",
    path: '/'
  },

  { isHeader: true, title: "admin" },
  {
    title: "server_managements",
    icon: ServerCog,
    subMenu: [
      { path: "/server-management/location", title: "location" },
      { path: "/server-management/server-types", title: "server-types" },
    ]
  },

  { isHeader: true, title: "products" },
  {
    icon: Server,
    title: "servers",
    path: '/servers'
  },

 
  // {
  //   title: "pages",
  //   icon: Codesandbox,
  //   subMenu: [
  //     { path: "/pages/coming-soon", title: "coming-soon" },
  //     { path: "/pages/maintenance", title: "maintenance" }
  //   ]
  // },
  // { isHeader: true, title: "components" },
  // {
  //   title: "multi-level",
  //   icon: Share2,
  //   subMenu: [
  //     { path: "#", title: "level-1.1" },
  //     {
  //       title: "level-1.2",
  //       subMenu: [
  //         { title: "level-2.1", path: "#" },
  //         { title: "level-2.2", path: "#" }
  //       ]
  //     }
  //   ]
  // }
];
