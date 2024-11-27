import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getAnalyticsWebsiteViews = async () =>
  instance.get("/dashboard/analytics/websiteviews");

export const getAnalyticsDailySales = async () => instance.get("/dashboard/analytics/dailysales");

export const getAnalyticsCompletedTasks = async () =>
  instance.get("/dashboard/analytics/completedtasks");

export const getSalesChannels = async () => instance.get("/dashboard/sales/channels");

export const getSalesRevenue = async () => instance.get("/dashboard/sales/revenue");

export const getSalesSalesAge = async () => instance.get("/dashboard/sales/salesbyage");

export const getSalesSalesCountry = async () => instance.get("/dashboard/sales/salesbycountry");

export const getSalesTopSelling = async () => instance.get("/dashboard/sales/topsellingproducts");

export const getProfileConversations = async () =>
  instance.get("/pages/profile/profileoverview/conversations");

export const getAccountBasicInfo = async () => instance.get("/pages/account/settings/basicinfo");

export const getProjectsTimeline = async () => instance.get("/pages/projects/timeline");

export const getWidgetTasks = async () => instance.get("/pages/widgets/tasks");

export const getWidgetsCalories = async () => instance.get("/pages/widgets/calories");

export const getWidgetCalendar = async () => instance.get("/pages/widgets/calendar");

export const getWidgetsCategories = async () => instance.get("/pages/widgets/categories");

export const getChartsLine = async () => instance.get("/pages/charts/line");

export const getChartsLineGradient = async () => instance.get("/pages/charts/linegradient");

export const getChartsBar = async () => instance.get("/pages/charts/bar");

export const getChartsBarHorizontal = async () => instance.get("/pages/charts/barhorizontal");

export const getChartsMixed = async () => instance.get("/pages/charts/mixed");

export const getChartsBubble = async () => instance.get("/pages/charts/bubble");

export const getChartsDoughnut = async () => instance.get("/pages/charts/doughnut");

export const getChartsPie = async () => instance.get("/pages/charts/pie");

export const getChartsRadar = async () => instance.get("/pages/charts/radar");

export const getChartsPolar = async () => instance.get("/pages/charts/polar");

export const getAppDatatable = async () => instance.get("/applications/datatable");

export const getAppCalendar = async () => instance.get("/applications/calendar");

export const login = async (email, password) => instance.post("users/login", { email, password });
