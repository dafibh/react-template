import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid2";
import MDBox from "components/MDBase/MDBox";
import ReportsBarChart from "components/MDComponents/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "components/MDComponents/Charts/LineCharts/ReportsLineChart";
import { useEffect, useState } from "react";
import {
  getAnalyticsDailySales,
  getAnalyticsWebsiteViews,
  getChartsBar,
  getChartsBarHorizontal,
  getChartsBubble, getChartsDoughnut,
  getChartsLine,
  getChartsLineGradient,
  getChartsMixed, getChartsPie, getChartsPolar, getChartsRadar,
  getSalesRevenue,
  getSalesSalesAge,
  getWidgetsCalories,
  getWidgetTasks
} from "util/APIHelper";
import ChannelsChart from "./components/ChannelsChart/ChannelsChart";
import DefaultLineChart from "components/MDComponents/Charts/LineCharts/DefaultLineChart";
import MDBadgeDot from "components/MDBase/MDBadgeDot";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "components/MDBase/MDButton";
import Icon from "@mui/material/Icon";
import HorizontalBarChart from "components/MDComponents/Charts/BarCharts/HorizontalBarChart";
import ProgressLineChart from "components/MDComponents/Charts/LineCharts/ProgressLineChart";
import Chart from "layouts/Template/charts/components/ChartCard";
import GradientLineChart from "components/MDComponents/Charts/LineCharts/GradientLineChart";
import VerticalBarChart from "components/MDComponents/Charts/BarCharts/VerticalBarChart";
import MixedChart from "components/MDComponents/Charts/MixedChart";
import BubbleChart from "components/MDComponents/Charts/BubbleChart";
import DefaultDoughnutChart from "components/MDComponents/Charts/DoughnutCharts/DefaultDoughnutChart";
import PieChart from "components/MDComponents/Charts/PieChart";
import RadarChart from "components/MDComponents/Charts/RadarChart";
import PolarChart from "components/MDComponents/Charts/PolarChart";

function ChartsExample() {
  const [websiteData, setWebsiteData] = useState({});
  const [salesData, setSalesData] = useState({});
  const [revenueData, setRevenueData] = useState({});
  const [salesByAgeData, setSalesByAgeData] = useState({});
  const [progressLineChartData, setProgressLineChartData] = useState({});
  const [caloriesChartData, setCaloriesChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [lineData, setLineData] = useState({});
  const [lineGradientData, setLineGradientData] = useState({});
  const [barData, setBarData] = useState({});
  const [barHorizontalData, setBarHorizontalData] = useState({});
  const [mixedData, setMixedData] = useState({});
  const [bubbleData, setBubbleData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
  const [pieData, setPieData] = useState({});
  const [radarData, setRadarData] = useState({});
  const [polarData, setPolarData] = useState({});

  useEffect(() => {
    const runAsync = async () => {
      const websiteResponse = await getAnalyticsWebsiteViews();
      setWebsiteData(websiteResponse.data.message);

      const salesResponse = await getAnalyticsDailySales();
      setSalesData(salesResponse.data.message);

      const revenueResponse = await getSalesRevenue();
      setRevenueData(revenueResponse.data.message);

      const salesByAgeResponse = await getSalesSalesAge();
      setSalesByAgeData(salesByAgeResponse.data.message);

      const progressLineChartDataResponse = await getWidgetTasks();
      setProgressLineChartData(progressLineChartDataResponse.data.message);

      const caloriesChartDataResponse = await getWidgetsCalories();
      setCaloriesChartData(caloriesChartDataResponse.data.message);

      const lineResponse = await getChartsLine();
      setLineData(lineResponse.data.message);

      const lineGradientReponse = await getChartsLineGradient();
      setLineGradientData(lineGradientReponse.data.message);

      const barResponse = await getChartsBar();
      setBarData(barResponse.data.message);

      const barHorizontalResponse = await getChartsBarHorizontal();
      setBarHorizontalData(barHorizontalResponse.data.message);

      const mixedResponse = await getChartsMixed();
      setMixedData(mixedResponse.data.message);

      const bubbleResponse = await getChartsBubble();
      setBubbleData(bubbleResponse.data.message);

      const doughnutResponse = await getChartsDoughnut();
      setDoughnutData(doughnutResponse.data.message);

      const pieResponse = await getChartsPie();
      setPieData(pieResponse.data.message);

      const radarResponse = await getChartsRadar();
      setRadarData(radarResponse.data.message);

      const polarResponse = await getChartsPolar();
      setPolarData(polarResponse.data.message);
    };
    runAsync();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:6, lg:4}}>
          <MDBox mt={3}>
            <ReportsBarChart
              color="info"
              title="website views"
              description="Last Campaign Performance"
              date="campaign sent 2 days ago"
              chart={websiteData}
            />
          </MDBox>
        </Grid>
        <Grid size={{xs:12, md:6, lg:4}}>
          <MDBox mt={3}>
            <ReportsLineChart
              color="success"
              title="daily sales"
              description={
                <>
                  (<strong>+15%</strong>) increase in today sales.
                </>
              }
              date="updated 4 min ago"
              chart={salesData}
            />
          </MDBox>
        </Grid>
        <Grid size={{xs:12, sm:6, lg:4}}>
          <ChannelsChart />
        </Grid>

        <Grid size={{xs:12, sm:6}}>
          <DefaultLineChart
            title="Revenue"
            description={
              <MDBox display="flex" justifyContent="space-between">
                <MDBox display="flex" ml={-1}>
                  <MDBadgeDot color="info" size="sm" badgeContent="Facebook Ads" />
                  <MDBadgeDot color="dark" size="sm" badgeContent="Google Ads" />
                </MDBox>
                <MDBox mt={-4} mr={-1} position="absolute" right="1.5rem">
                  <Tooltip title="See which ads perform better" placement="left" arrow>
                    <MDButton
                      variant="outlined"
                      color="secondary"
                      size="small"
                      circular
                      iconOnly
                    >
                      <Icon>priority_high</Icon>
                    </MDButton>
                  </Tooltip>
                </MDBox>
              </MDBox>
            }
            chart={revenueData}
          />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <HorizontalBarChart title="Sales by age" chart={salesByAgeData} />
        </Grid>

        <Grid size={{xs:12, lg:8}}>
          <ProgressLineChart
            icon="date_range"
            title="Tasks"
            count={480}
            progress={60}
            height="13.375rem"
            chart={progressLineChartData}
          />
        </Grid>
        <Grid size={{xs:12, lg:4}}>
          <Chart
            title="calories"
            count={97}
            percentage={{ color: "success", label: "+5%" }}
            chart={caloriesChartData}
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <DefaultLineChart
            icon={{ component: "insights" }}
            title="Line chart"
            height="20rem"
            description="Product insights"
            chart={lineData}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <GradientLineChart
            icon={{ component: "show_chart" }}
            title="Line chart with gradient"
            height="20rem"
            description="Visits from devices"
            chart={lineGradientData}
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <VerticalBarChart
            icon={{ color: "dark", component: "leaderboard" }}
            title="Bar chart"
            height="20rem"
            description="Sales related to age average"
            chart={barData}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <HorizontalBarChart
            icon={{ color: "dark", component: "splitscreen" }}
            title="Bar chart horizontal"
            height="20rem"
            description="Sales related to age average"
            chart={barHorizontalData}
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <MixedChart
            icon={{ color: "primary", component: "auto_graph" }}
            title="Mixed chart"
            height="20rem"
            description="Analytics Insights"
            chart={mixedData}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <BubbleChart
            icon={{ color: "primary", component: "multiline_chart" }}
            title="Bubble chart"
            height="20rem"
            description="Users divided by regions"
            chart={bubbleData}
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <DefaultDoughnutChart
            icon={{ color: "success", component: "donut_small" }}
            title="Doughnut chart"
            height="20rem"
            description="Affiliates program"
            chart={doughnutData}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <PieChart
            icon={{ color: "success", component: "donut_small" }}
            title="Pie chart"
            height="20rem"
            description="Analytics Insights"
            chart={pieData}
          />
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <RadarChart
            icon={{ color: "warning", component: "data_saver_on" }}
            title="Radar chart"
            height="32rem"
            description="Sciences score"
            chart={radarData}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <PolarChart
            icon={{ color: "warning", component: "scatter_plot" }}
            title="Polar chart"
            height="32rem"
            description="Analytics Insights"
            chart={polarData}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default ChartsExample;