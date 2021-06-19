import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Pagina principal',
    icon: 'home-outline',
    link: '/pages/home/productos',
    home: true,
  }, {
    title: 'Categorías',
    icon: 'menu-2-outline',
    group: true,
  }, {
    title: 'Despensa',
    icon: 'menu-2-outline',
    expanded: false,
    children: [
      {
        title: 'Aceites y Mantecas',
        icon: 'menu-2-outline',
      }, {
        title: 'Alimentos enlatados',
        icon: 'menu-2-outline',
      }, {
        title: 'Cereales, barras y avenas',
        icon: 'menu-2-outline',
      }, {
        title: 'Cremas, sopas y pures',
        icon: 'menu-2-outline',
      }, {
        title: 'Galletas',
        icon: 'menu-2-outline',
      }, {
        title: 'Granos y semillas',
        icon: 'menu-2-outline',
      }, {
        title: 'Panes y pastelillos',
        icon: 'menu-2-outline',
      },
    ],
  }, {
    title: 'Frutas y verduras',
    icon: 'menu-2-outline',
    expanded: false,
    children: [
      {
        title: 'Frutas',
        icon: 'menu-2-outline',
      }, {
        title: 'Verduras',
        icon: 'menu-2-outline',
      },
    ],
  }, {
    title: 'Lácteos y huevo',
    icon: 'menu-2-outline',
    expanded: false,
    children: [
      {
        title: 'Leche',
        icon: 'menu-2-outline',
      }, {
        title: 'Huevo',
        icon: 'menu-2-outline',
      }, {
        title: 'Yoghurts',
        icon: 'menu-2-outline',
      },
    ],
  }, {
    title: 'Queso, Salchichas y gourmet',
    icon: 'menu-2-outline',
    expanded: false,
    children: [
      {
        title: 'Quesos',
        icon: 'menu-2-outline',
      }, {
        title: 'Jamone',
        icon: 'menu-2-outline',
      }, {
        title: 'Salchichas',
        icon: 'menu-2-outline',
      }, {
        title: 'Tocino',
        icon: 'menu-2-outline',
      },
    ],
  }, {
    title: 'Carnes, pescados y mariscos',
    icon: 'menu-2-outline',
    expanded: false,
    children: [
      {
        title: 'Res y ternera',
        icon: 'menu-2-outline',
      },
      {
        title: 'Cerdo',
        icon: 'menu-2-outline',
      },
      {
        title: 'Aves',
        icon: 'menu-2-outline',
      },
      {
        title: 'Pescado y mariscos',
        icon: 'menu-2-outline',
      },
    ],
  }, {
    title: 'Congelados y refigerados',
    icon: 'menu-2-outline',
    expanded: false,
    children: [
      {
        title: 'Comidas congeladas',
        icon: 'menu-2-outline',
      },
      {
        title: 'Frutas y verduras congeladas',
        icon: 'menu-2-outline',
      },
      {
        title: 'Helados y postres',
        icon: 'menu-2-outline',
      },
    ],
  }, {
    title: 'Bebidas',
    icon: 'menu-2-outline',
    expanded: false,
    children: [
      {
        title: 'Agua natural',
        icon: 'menu-2-outline',
      }, {
        title: 'Refrescos',
        icon: 'menu-2-outline',
      },
    ],
  }, {
    title: 'Vinos, licores y cervezas',
    icon: 'menu-2-outline',
  }, {
    title: 'Pan, tortillas y alimentos',
    icon: 'menu-2-outline',
  }, {
    title: 'Bebés',
    icon: 'menu-2-outline',
  }, {
    title: 'Farmacia',
    icon: 'menu-2-outline',
  }, {
    title: 'Cuidado personal y belleza',
    icon: 'menu-2-outline',
  }, {
    title: 'Hogar y desechables',
    icon: 'menu-2-outline',
  }, {
    title: 'Limpieza y cuidado del hogar',
    icon: 'menu-2-outline',
  }, {
    title: 'Mascotas',
    icon: 'menu-2-outline',
  },
];
