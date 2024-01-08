import { SidebarItem } from "../../../../_shared/components/Sidebar/SidebarItem"

const items = [
  {
    name: 'Frontend development',
    id: 'frontend-development',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  },
  {
    name: 'RST restaurant management',
    id: 'rest-management',
    image: 'https://picsum.photos/15/15',
  }
]
export function TableSubmenuItems() {
  return (
    <>
      {
      items.map((item) => (
        <SidebarItem
          key={item.id}
          icon={<img className="h-[15px] w-[15px] rounded-full" src={item.image} alt={item.name}></img>}
          name={item.name}
          url={`/main/table/${item.id}`}
        />))
      }
    </>
  )
}
