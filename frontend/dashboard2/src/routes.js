// import Buttons from "views/Components/Buttons.js";
// import Calendar from "views/Calendar/Calendar.js";
// import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import UploadFile from "views/Upload/Upload.js";
// import ErrorPage from "views/Pages/ErrorPage.js";
// import ExtendedForms from "views/Forms/ExtendedForms.js";
// import ExtendedTables from "views/Tables/ExtendedTables.js";
// import FullScreenMap from "views/Maps/FullScreenMap.js";
// import GoogleMaps from "views/Maps/GoogleMaps.js";
// import GridSystem from "views/Components/GridSystem.js";
// import Icons from "views/Components/Icons.js";
// import LockScreenPage from "views/Pages/LockScreenPage.js";
// import LoginPage from "views/Pages/LoginPage.js";
// import Notifications from "views/Components/Notifications.js";
// import Panels from "views/Components/Panels.js";
import NSTGenerated from "views/Pages/NSTGenerated.js";
import UploadedImage from "views/Pages/UploadedImage.js";

// @material-ui/icons
// import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
// import DateRange from "@material-ui/icons/DateRange";
// import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
// import Place from "@material-ui/icons/Place";
// import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";
import TwitterImages from "views/Pages/TwitterImages.js";
import AICaptured from "views/Pages/AICaptured.js";
import RejectedImages from "views/Pages/RejectedImages.js";
import ApprovedImages from "views/Pages/ApprovedImages.js";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/upload",
    name: "Upload Image",
    rtlName: "لوحة القيادة",
    icon: Image,
    component: UploadFile,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "View Images",
    rtlName: "صفحات",
    icon: WidgetsIcon,
    state: "pageCollapse",
    views: [

      {
        path: "/twitter-images",
        name: "Twitter Images",
        rtlName: "تيالجدول الزمني",
        mini: "TI",
        rtlMini: "تي",
        component: TwitterImages,
        layout: "/admin",
      },
      {
        path: "/ai-camera-image",
        name: "Camera Captured",
        rtlName: "هعذاتسجيل الدخول",
        mini: "AI",
        rtlMini: "هعذا",
        component: AICaptured,
        layout: "/admin",
      },
      {
        path: "/uploads",
        name: "Uploaded Image",
        rtlName: "صودعم رتل",
        mini: "UI",
        rtlMini: "صو",
        component: UploadedImage,
        layout: "/admin",
      },
      {
        path: "/approved-images",
        name: "Approved Images",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "AP",
        rtlMini: "شع",
        component: ApprovedImages,
        layout: "/admin",
      },
      {
        path: "/NST-Generated",
        name: "NST Generated Images",
        rtlName: "عالتسعير",
        mini: "NST",
        rtlMini: "ع",
        component: NSTGenerated,
        layout: "/admin",
      },
      {
        path: "/rejected-image",
        name: "Rejected Images",
        rtlName: "تسجيل",
        mini: "RI",
        rtlMini: "صع",
        component: RejectedImages,
        layout: "/admin",
      },      
      // {
      //   path: "/user-page",
      //   name: "User Profile",
      //   rtlName: "ملف تعريفي للمستخدم",
      //   mini: "UP",
      //   rtlMini: "شع",
      //   component: UserProfile,
      //   layout: "/admin",
      // },
      // {
      //   path: "/error-page",
      //   name: "Error Page",
      //   rtlName: "صفحة الخطأ",
      //   mini: "E",
      //   rtlMini: "البريد",
      //   component: ErrorPage,
      //   layout: "/auth",
      // },
    ],
  },
  // {
  //   collapse: true,
  //   name: "Components",
  //   rtlName: "المكونات",
  //   icon: Apps,
  //   state: "componentsCollapse",
  //   views: [
  //     {
  //       collapse: true,
  //       name: "Multi Level Collapse",
  //       rtlName: "انهيار متعدد المستويات",
  //       mini: "MC",
  //       rtlMini: "ر",
  //       state: "multiCollapse",
  //       views: [
  //         {
  //           path: "#sample-path",
  //           name: "Example",
  //           rtlName: "مثال",
  //           mini: "E",
  //           rtlMini: "ه",
  //           component: () => {},
  //           layout: "#sample-layout",
  //         },
  //       ],
  //     },
  //     {
  //       path: "/buttons",
  //       name: "Buttons",
  //       rtlName: "وصفت",
  //       mini: "B",
  //       rtlMini: "ب",
  //       component: Buttons,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/grid-system",
  //       name: "Grid System",
  //       rtlName: "نظام الشبكة",
  //       mini: "GS",
  //       rtlMini: "زو",
  //       component: GridSystem,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/panels",
  //       name: "Panels",
  //       rtlName: "لوحات",
  //       mini: "P",
  //       rtlMini: "ع",
  //       component: Panels,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/sweet-alert",
  //       name: "Sweet Alert",
  //       rtlName: "الحلو تنبيه",
  //       mini: "SA",
  //       rtlMini: "ومن",
  //       component: SweetAlert,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/notifications",
  //       name: "Notifications",
  //       rtlName: "إخطارات",
  //       mini: "N",
  //       rtlMini: "ن",
  //       component: Notifications,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/icons",
  //       name: "Icons",
  //       rtlName: "الرموز",
  //       mini: "I",
  //       rtlMini: "و",
  //       component: Icons,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/typography",
  //       name: "Typography",
  //       rtlName: "طباعة",
  //       mini: "T",
  //       rtlMini: "ر",
  //       component: Typography,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Forms",
  //   rtlName: "إستمارات",
  //   icon: "content_paste",
  //   state: "formsCollapse",
  //   views: [
  //     {
  //       path: "/regular-forms",
  //       name: "Regular Forms",
  //       rtlName: "أشكال عادية",
  //       mini: "RF",
  //       rtlMini: "صو",
  //       component: RegularForms,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/extended-forms",
  //       name: "Extended Forms",
  //       rtlName: "نماذج موسعة",
  //       mini: "EF",
  //       rtlMini: "هوو",
  //       component: ExtendedForms,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/validation-forms",
  //       name: "Validation Forms",
  //       rtlName: "نماذج التحقق من الصحة",
  //       mini: "VF",
  //       rtlMini: "تو",
  //       component: ValidationForms,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/wizard",
  //       name: "Wizard",
  //       rtlName: "ساحر",
  //       mini: "W",
  //       rtlMini: "ث",
  //       component: Wizard,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Images",
  //   rtlName: "الجداول",
  //   icon: Image,
  //   state: "tablesCollapse",
  //   views: [
  //     {
  //       path: "/uploaded-images",
  //       name: "Uploaded Images",
  //       rtlName: "طاولات عادية",
  //       mini: "RT",
  //       rtlMini: "صر",
  //       component: RegularTables,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/extended-tables",
  //       name: "Extended Tables",
  //       rtlName: "جداول ممتدة",
  //       mini: "ET",
  //       rtlMini: "هور",
  //       component: ExtendedTables,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/react-tables",
  //       name: "React Tables",
  //       rtlName: "رد فعل الطاولة",
  //       mini: "RT",
  //       rtlMini: "در",
  //       component: ReactTables,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   collapse: true,
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: Place,
  //   state: "mapsCollapse",
  //   views: [
  //     {
  //       path: "/google-maps",
  //       name: "Google Maps",
  //       rtlName: "خرائط جوجل",
  //       mini: "GM",
  //       rtlMini: "زم",
  //       component: GoogleMaps,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/full-screen-maps",
  //       name: "Full Screen Map",
  //       rtlName: "خريطة كاملة الشاشة",
  //       mini: "FSM",
  //       rtlMini: "ووم",
  //       component: FullScreenMap,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/vector-maps",
  //       name: "Vector Map",
  //       rtlName: "خريطة المتجه",
  //       mini: "VM",
  //       rtlMini: "تم",
  //       component: VectorMap,
  //       layout: "/admin",
  //     },
  //   ],
  // },
  // {
  //   path: "/widgets",
  //   name: "Widgets",
  //   rtlName: "الحاجيات",
  //   icon: WidgetsIcon,
  //   component: Widgets,
  //   layout: "/admin",
  // },
  // {
  //   path: "/charts",
  //   name: "Charts",
  //   rtlName: "الرسوم البيانية",
  //   icon: Timeline,
  //   component: Charts,
  //   layout: "/admin",
  // },
  // {
  //   path: "/calendar",
  //   name: "Calendar",
  //   rtlName: "التقويم",
  //   icon: DateRange,
  //   component: Calendar,
  //   layout: "/admin",
  // },
];
export default dashRoutes;
