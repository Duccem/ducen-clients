import { TableSubmenuItems } from "../../../main/table/_module/components/TableSubmnuItems";
import { ChatIcon } from "../icons/chat.icon";
import { ConfIcon } from "../icons/conf.icon";
import { DashboardIcon } from "../icons/dashboard.icon";
import { LogOutIcon } from "../icons/logout.icon";
import { MissionsIcon } from "../icons/missions.icon";
import { PathIcon } from "../icons/path.icon";
import { ScheduleIcon } from "../icons/schedule.icon";
import { TeamIcon } from "../icons/team.icon";

export const items = [
  {
    name: 'Table',
    url: '/main/table',
    icon: <DashboardIcon size={15}/>
  },
  {
    name: 'Parties',
    url: '/main/parties',
    icon: <TeamIcon size={15}/>
  },
  {
    name: 'Quests',
    url: '/main/quests',
    icon: <TeamIcon size={15}/>
  },
  {
    name: 'Schedule',
    url: '/main/schedule',
    icon: <ScheduleIcon size={15}/>
  },
  {
    name: 'Missions',
    url: '/main/missions',
    icon: <MissionsIcon size={15}/>
  },
  {
    name: 'Path',
    url: '/main/path',
    icon: <PathIcon size={15}/>
  },
  {
    name: 'Conversations',
    url: '/main/conversations',
    icon: <ChatIcon size={15}/>
  }
]

export const lastItems = [
  {
    name: 'Configuration',
    url: '/configuration',
    icon: <ConfIcon size={15}/>
  },
  {
    name: 'Log Out',
    url: '/logout',
    icon: <LogOutIcon size={15}/>
  }
]

export const subItems = [
  {
    name: 'Table',
    url: '/main/table',
    list: <TableSubmenuItems/>
  }
]
