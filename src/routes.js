/** 
  All of the routes for the MD React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  11. The `component` key is used to store the component of its route.
  12. noCollapse: true for singular route
*/

import { v4 as uuidv4 } from "uuid";

import CardsExample from "layouts/Template/cards";
import ChartsExample from "layouts/Template/charts"
import ComponentsExample from "layouts/Template/components";
import ReactTableExample from "layouts/Template/datatables/react-table";
import MRTExample from "layouts/Template/datatables/mrt";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Cards",
    key: "cards",
    route: "/cards",
    noCollapse: true,
    icon: <Icon fontSize="medium">dashboard</Icon>,
    component: <CardsExample />
  },

  {
    type: "collapse",
    name: "Components",
    key: "components",
    route: "/components",
    noCollapse: true,
    icon: <Icon fontSize="medium">settings</Icon>,
    component: <ComponentsExample />
  },

  {
    type: "collapse",
    name: "Charts",
    key: "charts",
    route: "/charts",
    noCollapse: true,
    icon: <Icon fontSize="medium">bar_chart</Icon>,
    component: <ChartsExample />
  },

  {
    type: "collapse",
    name: "Datatables",
    key: "datatables",
    icon: <Icon fontSize="medium">table_chart</Icon>,
    collapse: [
      {
        name: "React Table",
        key: "react-table",
        route: "/datatables/react-table",
        component: <ReactTableExample />,
      },
      {
        name: "MRT",
        key: "mrt",
        route: "/datatables/mrt",
        component: <MRTExample />,
      },
    ],
  },

  { type: "divider" },
  { type: "title", title: "Title", key: "title-pages" },
  {
    type: "collapse",
    name: "References",
    key: "references",
    icon: <Icon fontSize="medium">feed</Icon>,
    collapse: [
      {
        name: "MRT V3 Table",
        key: uuidv4(),
        collapse: [
          {
            name: "Advanced Example",
            key: uuidv4(),
            href: "https://www.material-react-table.com/docs/examples/advanced",
          },
        ],
      },
      {
        name: "Components",
        key: uuidv4(),
        collapse: [
          {
            name: "Draggable Dashboard",
            key: uuidv4(),
            href: "https://github.com/react-grid-layout/react-grid-layout",
          },
        ],
      },
      {
        name: "Icons",
        key: uuidv4(),
        collapse: [
          {
            name: "MUI Icon",
            key: uuidv4(),
            href: "https://mui.com/material-ui/material-icons/",
          },
        ],
      },
    ],
  }
];

export default routes;
