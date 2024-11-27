import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid2";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";

import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";

import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import Footer from "components/MDComponents/Footer";
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import MiniStatisticsCard from "components/MDComponents/Cards/StatisticsCards/MiniStatisticsCard";
import DefaultInfoCard from "components/MDComponents/Cards/InfoCards/DefaultInfoCard";
import MasterCard from "components/MDComponents/Cards/MasterCard";
import ControllerCard from "components/MDComponents/Cards/ControllerCard";
import MiniInfoCard from "components/MDComponents/Cards/InfoCards/MiniInfoCard";
import CategoriesList from "components/MDComponents/Lists/CategoriesList";
import ComplexProjectCard from "components/MDComponents/Cards/ProjectCards/ComplexProjectCard";
import ComplexStatisticsCard from "components/MDComponents/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "components/MDComponents/Cards/BookingCard";
import DefaultStatisticsCard from "components/MDComponents/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultProjectCard from "components/MDComponents/Cards/ProjectCards/DefaultProjectCard";
import ProfileInfoCard from "components/MDComponents/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "components/MDComponents/Lists/ProfilesList";

import MediaPlayer from "./components/MediaPlayer/MediaPlayer";
import Steps from "./components/Steps/Steps";
import FullBody from "./components/FullBody/FullBody";
import PaymentMethod from "./components/PaymentMethod/PaymentMethod";
import Invoices from "./components/Invoices/Invoices";
import Transactions from "./components/Transactions/Transactions";
import OrdersOverview from "./components/OrdersOverview/OrdersOverview";
import UpcomingEvents from "./components/UpcomingEvents/UpcomingEvents";
import PlatformSettings from "./components/PlatformSettings/PlatformSettings";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";

import breakpoints from "assets/theme/base/breakpoints";

// Images
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";
import booking1 from "assets/images/products/product-1-min.jpg";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";

import { getProfileConversations, getWidgetsCategories } from "util/APIHelper";

function CardsExample() {
  const [profilesListData, setProfilesListData] = useState([]);
  const [lights, setLights] = useState(false);
  const [categoriesListData, setCategoriesListData] = useState([]);

  useEffect(() => {
    const runAsync = async () => {
      const profilesListDataResponse = await getProfileConversations();
      setProfilesListData(profilesListDataResponse.data.message);
      const categoriesListDataResponse = await getWidgetsCategories();
      const categoriesListDataContent = categoriesListDataResponse.data.message.map((content) => ({
        color: content.color,
        icon: content.icon,
        name: content.name,
        description: (
          <>
            {content.description.content}
            <MDTypography
              variant={content.description.typography.variant}
              color={content.description.typography.color}
              fontWeight={content.description.typography.fontWeight}
            >
              {content.description.typography.content}
            </MDTypography>
          </>
        ),
        route: content.route,
      }));
      setCategoriesListData(categoriesListDataContent);
    };
    runAsync();
  }, []);
  const handleSetLights = () => setLights(!lights);

  // Project Card Section
  // ComplexProjectCard dropdown menu state
  const [slackBotMenu, setSlackBotMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openSlackBotMenu = (event) => setSlackBotMenu(event.currentTarget);
  const closeSlackBotMenu = () => setSlackBotMenu(null);

  // Dropdown menu template for the ComplexProjectCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
    >
      <MenuItem onClick={close}>Action</MenuItem>
      <MenuItem onClick={close}>Another action</MenuItem>
      <MenuItem onClick={close}>Something else here</MenuItem>
    </Menu>
  );

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  const [salesDropdown, setSalesDropdown] = useState(null);
  const [salesDropdownValue, setSalesDropdownValue] = useState("6 May - 7 May");
  const openSalesDropdown = ({ currentTarget }) => setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /**
     The event listener that's calling the handleTabsOrientation function when resizing the window.
     */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid mb={3} container spacing={3}>
        {/** Two MiniStatisticsCards */}
        <Grid size={{xs:12, md:6, lg:3}}>
          <MDBox mb={3} >
            <MiniStatisticsCard
              title={{ text: "battery health" }}
              count="99 %"
              icon={{ color: "info", component: "battery_charging_full" }}
              direction="left"
            />
          </MDBox>
          <MiniStatisticsCard
            title={{ text: "music volume" }}
            count="15/100"
            icon={{ color: "info", component: "volume_down" }}
            direction="left"
          />
        </Grid>

        {/** Two DefaultInfoCards */}
        <Grid
          item
          size={{xs:12, sm:3, lg:5}}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDBox width="100%" mr={{ xs: 0, sm: 3 }} mb={{ xs: 3, sm: 0 }}>
            <DefaultInfoCard
              icon="account_balance"
              title="salary"
              description="Belong Interactive"
              value="+$2000"
            />
          </MDBox>
          <MDBox width="100%">
            <DefaultInfoCard
              icon="paypal"
              title="paypal"
              description="Freelance Payment"
              value="$455.00"
            />
          </MDBox>
        </Grid>

        {/** MasterCard */}
        <Grid size={{xs:12, lg:4}}>
          <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
        </Grid>

        {/** Full Body */}
        <Grid size={{xs:12, md:6, lg:3}}>
          <FullBody />
        </Grid>

        {/** Lights Card */}
        <Grid size={{xs:12, md:6, lg:2}}>
          <ControllerCard
            state={lights}
            icon={
              <Icon className={lights ? "text-white" : "text-dark"} fontSize="large">
                lightbulb
              </Icon>
            }
            title="Lights"
            onChange={handleSetLights}
          />
        </Grid>

        {/** Direction Card */}
        <Grid size={{xs:12, md:6, lg:2}}>
          <MiniInfoCard
            icon="shortcut"
            title={
              <>
                754&nbsp;
                <MDTypography variant="button" color="secondary" fontWeight="medium">
                  m
                </MDTypography>
              </>
            }
            description="New York City"
          />
        </Grid>

        {/** Steps */}
        <Grid size={{xs:12, md:6, lg:2}}>
          <Steps />
        </Grid>

        {/** Complex Project Card */}
        <Grid size={{xs:12, lg:3}}>
          <MDBox mb={1.5} mt={1.5}>
            <ComplexProjectCard
              image={logoSlack}
              title="slack bot"
              description="Project for a slack bot that sends messages to a channel"
              dateTime="02.03.22"
              members={[team1, team2, team3, team4, team5]}
              dropdown={{
                action: openSlackBotMenu,
                menu: renderMenu(slackBotMenu, closeSlackBotMenu),
              }}
            />
          </MDBox>
        </Grid>

        {/** Categories List */}
        <Grid size={{xs:12, md:6, lg:4}}>
          <CategoriesList title="categories" categories={categoriesListData} />
        </Grid>

        {/** Transactions */}
        <Grid size={{xs:12, md:6, lg:4}}>
          <Transactions />
        </Grid>

        {/** Invoices */}
        <Grid size={{xs: 12, lg: 4}}>
          <Invoices />
        </Grid>

        {/** Payment Method */}
        <Grid size={{xs: 12, md:6}}>
          <PaymentMethod />
        </Grid>

        {/** Media Player */}
        <Grid size={{xs: 12, md:3}}>
          <MediaPlayer />
        </Grid>

        {/** Complex Statistics Card */}
        <Grid size={{xs: 12, md:3}}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="weekend"
              title="Bookings"
              count={281}
              percentage={{
                color: "success",
                amount: "+55%",
                label: "than lask week",
              }}
            />
          </MDBox>
        </Grid>

        {/** Booking Card */}
        <Grid size={{xs:12, md:6, lg:4}}>
          <MDBox mt={3}>
            <BookingCard
              image={booking1}
              title="Office Studio"
              description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
              price="$1.119/night"
              location="London, UK"
              action={actionButtons}
            />
          </MDBox>
        </Grid>

        <Grid size={{xs:12, sm:4}}>
          <UpcomingEvents />
        </Grid>

        <Grid size={{xs:12, lg:4}}>
          <OrdersOverview />
        </Grid>

        <Grid size={{xs:12, sm:6, lg:3}}>
          <DefaultStatisticsCard
            title="sales"
            count="$230,220"
            percentage={{
              color: "success",
              value: "+55%",
              label: "since last month",
            }}
            dropdown={{
              action: openSalesDropdown,
              menu: renderMenu(salesDropdown, closeSalesDropdown),
              value: salesDropdownValue,
            }}
          />
        </Grid>

        <Grid size={{xs:12, sm:8, lg:3}}>
          <AppBar position="static">
            <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
              <Tab label="Messages" />
              <Tab label="Social" />
              <Tab label="Notifications" />
              <Tab label="Backup" />
            </Tabs>
          </AppBar>
        </Grid>

        <Grid size={{xs:12, lg: 6}}>
          <DeleteAccount />
        </Grid>

        <Grid size={12}>
          <Card>
            <MDBox p={2}>
              <Grid container spacing={1}>
                <Grid size={{xs:12, md:6, xl:4}}>
                  <PlatformSettings />
                </Grid>
                <Grid size={{xs:12, md:6, xl:4}} sx={{ display: "flex" }}>
                  <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                  <ProfileInfoCard
                    title="profile information"
                    description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                    info={{
                      fullName: "Alec M. Thompson",
                      mobile: "(44) 123 1234 123",
                      email: "alecthompson@mail.com",
                      location: "USA",
                    }}
                    social={[
                      {
                        link: "https://www.facebook.com/",
                        icon: <FacebookIcon />,
                        color: "facebook",
                      },
                      {
                        link: "https://twitter.com",
                        icon: <TwitterIcon />,
                        color: "twitter",
                      },
                      {
                        link: "https://www.instagram.com",
                        icon: <InstagramIcon />,
                        color: "instagram",
                      },
                    ]}
                    action={{ route: "", tooltip: "Edit Profile" }}
                    shadow={false}
                  />
                  <Divider orientation="vertical" sx={{ mx: 0 }} />
                </Grid>
                <Grid size={{xs:12, xl:4}}>
                  <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <MDBox p={2}>
              <Grid container spacing={6}>
                <Grid size={{xs:12, md:6, xl:3}}>
                  <DefaultProjectCard
                    image={homeDecor1}
                    label="project #2"
                    title="modern"
                    description="As Uber works through a huge amount of internal management turmoil."
                    action={{
                      type: "internal",
                      route: "/",
                      color: "info",
                      label: "view project",
                    }}
                    authors={[
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                    ]}
                  />
                </Grid>
                <Grid size={{xs:12, md:6, xl:3}}>
                  <DefaultProjectCard
                    image={homeDecor2}
                    label="project #1"
                    title="scandinavian"
                    description="Music is something that everyone has their own specific opinion about."
                    action={{
                      type: "internal",
                      route: "/",
                      color: "info",
                      label: "view project",
                    }}
                    authors={[
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                    ]}
                  />
                </Grid>
                <Grid size={{xs:12, md:6, xl:3}}>
                  <DefaultProjectCard
                    image={homeDecor3}
                    label="project #3"
                    title="minimalist"
                    description="Different people have different taste, and various types of music."
                    action={{
                      type: "internal",
                      route: "/",
                      color: "info",
                      label: "view project",
                    }}
                    authors={[
                      { image: team4, name: "Peterson" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team1, name: "Elena Morison" },
                    ]}
                  />
                </Grid>
                <Grid size={{xs:12, md:6, xl:3}}>
                  <DefaultProjectCard
                    image={homeDecor4}
                    label="project #4"
                    title="gothic"
                    description="Why would anyone pick blue over pink? Pink is obviously a better color."
                    action={{
                      type: "internal",
                      route: "/",
                      color: "info",
                      label: "view project",
                    }}
                    authors={[
                      { image: team4, name: "Peterson" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team1, name: "Elena Morison" },
                    ]}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>

      </Grid>
      <Footer />
    </DashboardLayout>
  );
}
export default CardsExample;