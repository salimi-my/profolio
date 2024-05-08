import {
  User,
  List,
  Book,
  FileText,
  BadgeInfo,
  FolderGit2,
  LayoutGrid,
  GraduationCap,
  ClipboardCheck,
  TerminalSquare
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  onlyTitle?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getPages(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Informations',
      menus: [
        {
          href: '/about',
          label: 'About',
          active: pathname.includes('/about'),
          icon: BadgeInfo,
          submenus: []
        },
        {
          href: '/miscellaneous',
          label: 'Miscellaneous',
          active: pathname.includes('/miscellaneous'),
          icon: List,
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Skills',
      menus: [
        {
          href: '/experience',
          label: 'Experience',
          active: pathname.includes('/experience'),
          icon: Book,
          submenus: []
        },
        {
          href: '/expertise',
          label: 'Expertise',
          active: pathname.includes('/expertise'),
          icon: ClipboardCheck,
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Career',
      menus: [
        {
          href: '',
          label: 'Portfolio',
          active: pathname.includes('/portfolio'),
          icon: FolderGit2,
          submenus: [
            {
              href: '/portfolio',
              label: 'All Projects',
              active: pathname === '/portfolio'
            },
            {
              href: '/portfolio/create',
              label: 'New Project',
              active: pathname === '/portfolio/create'
            },
            {
              href: '',
              label: 'Edit Project',
              active: new RegExp('^/portfolio/.+/edit$').test(pathname),
              onlyTitle: true
            }
          ]
        },
        {
          href: '/qualification',
          label: 'Qualification',
          active: pathname.includes('/qualification'),
          icon: GraduationCap,
          submenus: []
        }
      ]
    },
    {
      groupLabel: 'Resources',
      menus: [
        {
          href: '/resume',
          label: 'Resume',
          active: pathname.includes('/resume'),
          icon: FileText,
          submenus: []
        },
        {
          href: '/tool',
          label: 'Tool & Apps',
          active: pathname.includes('/tool'),
          icon: TerminalSquare,
          submenus: [
            {
              href: '/tool',
              label: 'All Tools',
              active: pathname === '/tool'
            },
            {
              href: '/tool/create',
              label: 'New Tool',
              active: pathname === '/tool/create'
            },
            {
              href: '',
              label: 'Edit Tool',
              active: new RegExp('^/tool/.+/edit$').test(pathname),
              onlyTitle: true
            }
          ]
        }
      ]
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/account',
          label: 'Account',
          active: pathname.includes('/account'),
          icon: User,
          submenus: []
        }
      ]
    }
  ];
}
