import React from "react";
import { Route, Navigate } from "react-router-dom";
import ProductList from "../pages/productlist";
// import ProductList from "../feature-module/inventory/productlist";
import Dashboard from "../feature-module/dashboard/Dashboard";
// import AddProduct from "../feature-module/inventory/addproduct";
// import { Units } from "../feature-module/inventory/units";
// import CategoryList from "../feature-module/inventory/categorylist";
// import ProductDetail from "../feature-module/inventory/productdetail";
import SubCategories from "../feature-module/inventory/subcategories";
import EditProduct from "../feature-module/inventory/editproduct";

import AddProduct from "../pages/addproduct";
import UnitList from "../pages/unitlist";
import CategoryList from "../pages/categorylist";

import SalesDashbaord from "../feature-module/dashboard/salesdashbaord";
import BrandList from "../feature-module/inventory/brandlist";
import VariantAttributes from "../feature-module/inventory/variantattributes";
import Warranty from "../feature-module/inventory/warranty";
import PrintBarcode from "../feature-module/inventory/printbarcode";
import Grid from "../feature-module/uiinterface/grid";
import Images from "../feature-module/uiinterface/images";
import Lightboxes from "../feature-module/uiinterface/lightbox";
import Media from "../feature-module/uiinterface/media";
import Modals from "../feature-module/uiinterface/modals";
import Offcanvas from "../feature-module/uiinterface/offcanvas";
import Pagination from "../feature-module/uiinterface/pagination";

import Alert from "../feature-module/uiinterface/alert";
import Accordion from "../feature-module/uiinterface/accordion";
import Avatar from "../feature-module/uiinterface/avatar";
import Badges from "../feature-module/uiinterface/badges";
import Borders from "../feature-module/uiinterface/borders";
import Buttons from "../feature-module/uiinterface/buttons";
import ButtonsGroup from "../feature-module/uiinterface/buttonsgroup";
import Popovers from "../feature-module/uiinterface/popover";

import Breadcrumb from "../feature-module/uiinterface/breadcrumb";
import Cards from "../feature-module/uiinterface/cards";
import Dropdowns from "../feature-module/uiinterface/dropdowns";
import Colors from "../feature-module/uiinterface/colors";
import Carousel from "../feature-module/uiinterface/carousel";
import Spinner from "../feature-module/uiinterface/spinner";
import NavTabs from "../feature-module/uiinterface/navtabs";
import Toasts from "../feature-module/uiinterface/toasts";
import Typography from "../feature-module/uiinterface/typography";
import Video from "../feature-module/uiinterface/video";
import Tooltips from "../feature-module/uiinterface/tooltips";
import DragDrop from "../feature-module/uiinterface/advancedui/dragdrop";
import SweetAlert from "../feature-module/uiinterface/sweetalert";
import Progress from "../feature-module/uiinterface/progress";
import Placeholder from "../feature-module/uiinterface/placeholder";
import Rating from "../feature-module/uiinterface/advancedui/rating";
import TextEditor from "../feature-module/uiinterface/advancedui/texteditor";
import Counter from "../feature-module/uiinterface/advancedui/counter";
import Uiscrollbar from "../feature-module/uiinterface/advancedui/uiscrollbar";
import Stickynote from "../feature-module/uiinterface/advancedui/stickynote";
import Timeline from "../feature-module/uiinterface/advancedui/timeline";
import Apexchart from "../feature-module/uiinterface/charts/apexcharts";
import ChartJs from "../feature-module/uiinterface/charts/chartjs";
import RangeSlides from "../feature-module/uiinterface/rangeslider";
import FontawesomeIcons from "../feature-module/uiinterface/icons/fontawesome";
import FeatherIcons from "../feature-module/uiinterface/icons/feathericon";
import IonicIcons from "../feature-module/uiinterface/icons/ionicicons";
import MaterialIcons from "../feature-module/uiinterface/icons/materialicon";
import PE7Icons from "../feature-module/uiinterface/icons/pe7icons";
import SimplelineIcons from "../feature-module/uiinterface/icons/simplelineicon";
import ThemifyIcons from "../feature-module/uiinterface/icons/themify";
import WeatherIcons from "../feature-module/uiinterface/icons/weathericons";
import TypiconIcons from "../feature-module/uiinterface/icons/typicons";
import FlagIcons from "../feature-module/uiinterface/icons/flagicons";

const routes = all_routes;

import DepartmentGrid from "../feature-module/hrm/departmentgrid";
import DepartmentList from "../feature-module/hrm/departmentlist";
import Designation from "../feature-module/hrm/designation";
import Shift from "../feature-module/hrm/shift";
import AttendanceEmployee from "../feature-module/hrm/attendance-employee";
import ClipBoard from "../feature-module/uiinterface/advancedui/clipboard";
import TablesBasic from "../feature-module/uiinterface/table/tables-basic";
import DataTables from "../feature-module/uiinterface/table/data-tables";
import FormBasicInputs from "../feature-module/uiinterface/forms/formelements/basic-inputs";
import CheckboxRadios from "../feature-module/uiinterface/forms/formelements/checkbox-radios";
import InputGroup from "../feature-module/uiinterface/forms/formelements/input-group";
import GridGutters from "../feature-module/uiinterface/forms/formelements/grid-gutters";
import FormSelect from "../feature-module/uiinterface/forms/formelements/form-select";
import FileUpload from "../feature-module/uiinterface/forms/formelements/fileupload";
import FormMask from "../feature-module/uiinterface/forms/formelements/form-mask";
import FormHorizontal from "../feature-module/uiinterface/forms/formelements/layouts/form-horizontal";
import FormVertical from "../feature-module/uiinterface/forms/formelements/layouts/form-vertical";
import FloatingLabel from "../feature-module/uiinterface/forms/formelements/layouts/floating-label";
import FormValidation from "../feature-module/uiinterface/forms/formelements/layouts/form-validation";
import FormSelect2 from "../feature-module/uiinterface/forms/formelements/layouts/form-select2";
import Ribbon from "../feature-module/uiinterface/advancedui/ribbon";
import Chats from "../feature-module/Application/chat";
import ExpensesList from "../feature-module/FinanceAccounts/expenseslist";
import ExpenseCategory from "../feature-module/FinanceAccounts/expensecategory";
import FormWizard from "../feature-module/uiinterface/forms/formelements/form-wizard";
import ExpiredProduct from "../feature-module/inventory/expiredproduct";
import LowStock from "../feature-module/inventory/lowstock";

import Videocall from "../feature-module/Application/videocall";
import Audiocall from "../feature-module/Application/audiocall";
import Email from "../feature-module/Application/email";
import Callhistory from "../feature-module/Application/callhistory";
import QRcode from "../feature-module/inventory/qrcode";
import PurchasesList from "../feature-module/purchases/purchaseslist";
import PurchaseOrderReport from "../feature-module/purchases/purchaseorderreport";
import PurchaseReturns from "../feature-module/purchases/purchasereturns";
import Appearance from "../feature-module/settings/websitesettings/appearance";
import SocialAuthentication from "../feature-module/settings/websitesettings/socialauthentication";
import LanguageSettings from "../feature-module/settings/websitesettings/languagesettings";
import InvoiceSettings from "../feature-module/settings/appsetting/invoicesettings";
import PrinterSettings from "../feature-module/settings/appsetting/printersettings";
import PosSettings from "../feature-module/settings/websitesettings/possettings";
import CustomFields from "../feature-module/settings/websitesettings/customfields";
import EmailSettings from "../feature-module/settings/systemsettings/emailsettings";
import SmsGateway from "../feature-module/settings/systemsettings/smsgateway";
import OtpSettings from "../feature-module/settings/systemsettings/otpsettings";
import GdprSettings from "../feature-module/settings/systemsettings/gdprsettings";
import PaymentGateway from "../feature-module/settings/financialsettings/paymentgateway";
import BankSetting from "../feature-module/settings/financialsettings/banksetting";
import Customers from "../feature-module/people/customers";
import Suppliers from "../feature-module/people/suppliers";
import StoreList from "../core/modals/peoples/storelist";
import Managestock from "../feature-module/stock/managestock";
import StockAdjustment from "../feature-module/stock/stockAdjustment";
import StockTransfer from "../feature-module/stock/stockTransfer";
import SalesReport from "../feature-module/Reports/salesreport";
import PurchaseReport from "../feature-module/Reports/purchasereport";
import InventoryReport from "../feature-module/Reports/inventoryreport";
// import Invoicereport from "../feature-module/Reports/invoicereport";
import SupplierReport from "../feature-module/Reports/supplierreport";
import CustomerReport from "../feature-module/Reports/customerreport";
import ExpenseReport from "../feature-module/Reports/expensereport";
import IncomeReport from "../feature-module/Reports/incomereport";
import TaxReport from "../feature-module/Reports/taxreport";
import ProfitLoss from "../feature-module/Reports/profitloss";
import GeneralSettings from "../feature-module/settings/generalsettings/generalsettings";
import SecuritySettings from "../feature-module/settings/generalsettings/securitysettings";
import Notification from "../feature-module/settings/generalsettings/notification";
import ConnectedApps from "../feature-module/settings/generalsettings/connectedapps";
import SystemSettings from "../feature-module/settings/websitesettings/systemsettings";
import CompanySettings from "../feature-module/settings/websitesettings/companysettings";
import LocalizationSettings from "../feature-module/settings/websitesettings/localizationsettings";
import Prefixes from "../feature-module/settings/websitesettings/prefixes";
import Preference from "../feature-module/settings/websitesettings/preference";
import BanIpaddress from "../feature-module/settings/othersettings/ban-ipaddress";
import StorageSettings from "../feature-module/settings/othersettings/storagesettings";
import AttendanceAdmin from "../feature-module/hrm/attendanceadmin";
import Payslip from "../feature-module/hrm/payslip";
import Holidays from "../feature-module/hrm/holidays";
import SalesList from "../feature-module/sales/saleslist";
import SalesReturn from "../feature-module/sales/salesreturn";
import QuotationList from "../feature-module/sales/quotationlist";
import Notes from "../feature-module/Application/notes";
import FileManager from "../feature-module/Application/filemanager";
import Profile from "../feature-module/pages/profile";
import Signin from "../feature-module/pages/login/signin";
import SigninTwo from "../feature-module/pages/login/signinTwo";
import SigninThree from "../feature-module/pages/login/signinThree";
import RegisterTwo from "../feature-module/pages/register/registerTwo";
import Register from "../feature-module/pages/register/register";
import RegisterThree from "../feature-module/pages/register/registerThree";
import Forgotpassword from "../feature-module/pages/forgotpassword/forgotpassword";
import ForgotpasswordTwo from "../feature-module/pages/forgotpassword/forgotpasswordTwo";
import ForgotpasswordThree from "../feature-module/pages/forgotpassword/forgotpasswordThree";
import Resetpassword from "../feature-module/pages/resetpassword/resetpassword";
import ResetpasswordTwo from "../feature-module/pages/resetpassword/resetpasswordTwo";
import ResetpasswordThree from "../feature-module/pages/resetpassword/resetpasswordThree";
import EmailVerification from "../feature-module/pages/emailverification/emailverification";
import EmailverificationTwo from "../feature-module/pages/emailverification/emailverificationTwo";
import EmailverificationThree from "../feature-module/pages/emailverification/emailverificationThree";
import Twostepverification from "../feature-module/pages/twostepverification/twostepverification";
import TwostepverificationTwo from "../feature-module/pages/twostepverification/twostepverificationTwo";
import TwostepverificationThree from "../feature-module/pages/twostepverification/twostepverificationThree";
import Lockscreen from "../feature-module/pages/lockscreen";
import Error404 from "../feature-module/pages/errorpages/error404";
import Error500 from "../feature-module/pages/errorpages/error500";
import Blankpage from "../feature-module/pages/blankpage";
import Comingsoon from "../feature-module/pages/comingsoon";
import Undermaintainence from "../feature-module/pages/undermaintainence";

import RolesPermissions from "../feature-module/usermanagement/rolespermissions";
import Permissions from "../feature-module/usermanagement/permissions";
import DeleteAccount from "../feature-module/usermanagement/deleteaccount";
import EmployeesGrid from "../feature-module/hrm/employeesgrid";
import EditEmployee from "../feature-module/hrm/editemployee";
import AddEmployee from "../feature-module/hrm/addemployee";
import LeavesAdmin from "../feature-module/hrm/leavesadmin";
import LeavesEmployee from "../feature-module/hrm/leavesemployee";
import LeaveTypes from "../feature-module/hrm/leavetypes";

import TaxRates from "../feature-module/settings/financialsettings/taxrates";
import CurrencySettings from "../feature-module/settings/financialsettings/currencysettings";
import WareHouses from "../core/modals/peoples/warehouses";
import Coupons from "../feature-module/coupons/coupons";
import { all_routes } from "./all_routes";
import BankSettingGrid from "../feature-module/settings/financialsettings/banksettinggrid";
import PayrollList from "../feature-module/hrm/payroll-list";
import KanbanView from "../feature-module/Application/kanbanView";
import SocialFeed from "../feature-module/Application/socialfeed";
import Sortable from "../feature-module/uiinterface/ui-sortable";
import Swiperjs from "../feature-module/uiinterface/swiperjs";
import FormPikers from "../feature-module/uiinterface/forms/formelements/formpickers";
import Leaflet from "../feature-module/uiinterface/map/leaflet";
import BootstrapIcons from "../feature-module/uiinterface/icons/bootstrapicons";
import RemixIcons from "../feature-module/uiinterface/icons/remixIcons";
import TablerIcon from "../feature-module/uiinterface/icons/tablericon";
import NewDashboard from "../feature-module/dashboard/newDashboard";
import Pos2 from "../feature-module/pos/pos2";
import Pos from "../feature-module/pos/pos";
import Pos3 from "../feature-module/pos/pos3";
import OnlineOrder from "../feature-module/sales/online-order/onlineOrder";
import Pos4 from "../feature-module/pos/pos4";
import Pos5 from "../feature-module/pos/pos5";
import PosOrder from "../feature-module/sales/pos-order/posOrder";
import Invoice from "../feature-module/sales/invoicereport";
import Invoicedetails from "../feature-module/sales/invoicedetails";
import Discount from "../feature-module/coupons/discount";
import DiscountPlan from "../feature-module/coupons/discountPlan";
import GiftCards from "../feature-module/coupons/giftCards";
import Accountlist from "../feature-module/FinanceAccounts/account-list/accountlist";
import Moneytransfer from "../feature-module/FinanceAccounts/money-transfer/moneytransfer";
import Balancesheet from "../feature-module/FinanceAccounts/balance-sheet/balancesheet";
import Trailbalance from "../feature-module/FinanceAccounts/trail-balance/trailbalance";
import Cashflow from "../feature-module/FinanceAccounts/cash-flow/cashflow";
import Accountstatement from "../feature-module/FinanceAccounts/account-statement/accountstatement";
import Biller from "../feature-module/people/billers";
import Employeedetails from "../feature-module/hrm/employeedetails";
import Stockhistory from "../feature-module/Reports/stockhistory";
import SoldStock from "../feature-module/Reports/soldstock";
import BestSeller from "../feature-module/Reports/bestseller";
import Invoicereportnew from "../feature-module/Reports/invoicereportnew";
import Languagesetteingsweb from "../feature-module/settings/websitesettings/languagesetteingsweb";
import Success from "../feature-module/pages/success/success";
import SuccessTwo from "../feature-module/pages/success/successTwo";
import SuccessThree from "../feature-module/pages/success/successThree";
import EmployeesList from "../feature-module/hrm/employeesList";
import IncomeList from "../feature-module/FinanceAccounts/income/incomeList";
import IncomeCategory from "../feature-module/FinanceAccounts/income/incomeCategory";
import Products from "../feature-module/ecommerce/products";
import Productsdetails from "../feature-module/ecommerce/productsdetails";
import Orders from "../feature-module/ecommerce/orders";
import Cart from "../feature-module/ecommerce/cart";
import Checkout from "../feature-module/ecommerce/checkout";
import Wishlist from "../feature-module/ecommerce/wishlist";
import Reviews from "../feature-module/ecommerce/reviews";
import Calendars from "../feature-module/Application/calendar";
import SuperAdminDashboard from "../feature-module/super-admin/dashboard";
import Companies from "../feature-module/super-admin/companies";
import Subscription from "../feature-module/super-admin/subscription";
import Packages from "../feature-module/super-admin/packages/packagelist";
import Domain from "../feature-module/super-admin/domin";
import PurchaseTransaction from "../feature-module/super-admin/purchase-transaction";
import EmailReply from "../feature-module/Application/emailReply";
import Todo from "../feature-module/Application/todo/todo";
import TodoList from "../feature-module/Application/todo/todolist";
import PagesList from "../feature-module/content/pages";
import AllBlogs from "../feature-module/content/blog/allBlogs";
import Projects from "../feature-module/Application/projects";
import Searchlist from "../feature-module/Application/searchlist";
import SupplierDueReport from "../feature-module/Reports/supplierduereport";
import CustomerDueReport from "../feature-module/Reports/customerduereport";
import Productreport from "../feature-module/Reports/products-report/productreport";
import ProductExpiredreport from "../feature-module/Reports/products-report/productexpiredreport";
import ProductQualityreport from "../feature-module/Reports/products-report/productqualityreport";
import SaleReport from "../feature-module/Reports/salereport";
import Annualreport from "../feature-module/Reports/annualreport";
import InvoiceTemplate from "../feature-module/settings/appsetting/invoicetemplate";
import Signature from "../feature-module/settings/appsetting/signature";
import Emailtemplatesettings from "../feature-module/settings/systemsettings/emailtemplatesettings";
import Smstemplate from "../feature-module/settings/systemsettings/smstemplate";
import LayoutDemo from "../feature-module/layout-pages/layoutdemo";
import BlogDetails from "../feature-module/content/blog/blogDetails";
import BlogTags from "../feature-module/content/blog/blogTags";
import BlogCategories from "../feature-module/content/blog/blogCategories";
import BlogComments from "../feature-module/content/blog/blogComments";
import Cities from "../feature-module/content/location/cities";
import Countries from "../feature-module/content/location/countries";
import States from "../feature-module/content/location/states";
import Testimonial from "../feature-module/content/testimonial";
import Faq from "../feature-module/content/faq";
import Activities from "../feature-module/pages/activities";
import Pricing from "../feature-module/pages/pricing";
import Contacts from "../feature-module/Application/contacts";
import ProductDetail from "../pages/productdetail";
import Users from "../pages/users";

export const publicRoutes = [
  {
    id: 1,
    path: routes.dashboard,
    name: "home",
    element: <Dashboard />,
    route: Route,
  },
  {
    id: 1,
    path: routes.newdashboard,
    name: "home new",
    element: <NewDashboard />,
    route: Route,
  },
  {
    id: 2,
    path: routes.productlist,
    name: "products",
    element: <ProductList />,
    route: Route,
  },
  {
    id: 3,
    path: routes.addproduct,
    name: "products",
    element: <AddProduct />,
    route: Route,
  },
  {
    id: 4,
    path: routes.salesdashboard,
    name: "salesdashboard",
    element: <SalesDashbaord />,
    route: Route,
  },
  {
    id: 5,
    path: routes.brandlist,
    name: "brant",
    element: <BrandList />,
    route: Route,
  },
  {
    id: 6,
    path: routes.units,
    name: "unit",
    element: <UnitList />,
    route: Route,
  },
  {
    id: 7,
    path: routes.variantyattributes,
    name: "variantyattributes",
    element: <VariantAttributes />,
    route: Route,
  },
  {
    id: 8,
    path: routes.warranty,
    name: "warranty",
    element: <Warranty />,
    route: Route,
  },
  {
    id: 9,
    path: routes.barcode,
    name: "barcode",
    element: <PrintBarcode />,
    route: Route,
  },
  {
    id: 10,
    path: routes.alerts,
    name: "alert",
    element: <Alert />,
    route: Route,
  },
  {
    id: 11,
    path: routes.grid,
    name: "grid",
    element: <Grid />,
    route: Route,
  },

  {
    id: 12,
    path: routes.accordion,
    name: "accordion",
    element: <Accordion />,
    route: Route,
  },
  {
    id: 13,
    path: routes.avatar,
    name: "avatar",
    element: <Avatar />,
    route: Route,
  },
  {
    id: 14,
    path: routes.images,
    name: "images",
    element: <Images />,
    route: Route,
  },

  {
    id: 15,
    path: routes.badges,
    name: "badges",
    element: <Badges />,
    route: Route,
  },
  {
    id: 16,
    path: routes.lightbox,
    name: "lightbox",
    element: <Lightboxes />,
    route: Route,
  },

  {
    id: 17,
    path: routes.borders,
    name: "borders",
    element: <Borders />,
    route: Route,
  },
  {
    id: 18,
    path: routes.media,
    name: "lightbox",
    element: <Media />,
    route: Route,
  },
  {
    id: 19,
    path: routes.buttons,
    name: "borders",
    element: <Buttons />,
    route: Route,
  },
  {
    id: 20,
    path: routes.modals,
    name: "modals",
    element: <Modals />,
    route: Route,
  },
  {
    id: 21,
    path: routes.offcanvas,
    name: "offcanvas",
    element: <Offcanvas />,
    route: Route,
  },
  {
    id: 22,
    path: routes.pagination,
    name: "offcanvas",
    element: <Pagination />,
    route: Route,
  },
  {
    id: 23,
    path: routes.buttonsgroup,
    name: "buttonsgroup",
    element: <ButtonsGroup />,
    route: Route,
  },
  {
    id: 24,
    path: routes.popover,
    name: "buttonsgroup",
    element: <Popovers />,
    route: Route,
  },
  {
    id: 25,
    path: routes.breadcrumb,
    name: "breadcrumb",
    element: <Breadcrumb />,
    route: Route,
  },
  {
    id: 26,
    path: routes.cards,
    name: "cards",
    element: <Cards />,
    route: Route,
  },
  {
    id: 27,
    path: routes.dropdowns,
    name: "dropdowns",
    element: <Dropdowns />,
    route: Route,
  },
  {
    id: 27,
    path: routes.colors,
    name: "colors",
    element: <Colors />,
    route: Route,
  },
  {
    id: 28,
    path: routes.carousel,
    name: "carousel",
    element: <Carousel />,
    route: Route,
  },
  {
    id: 29,
    path: routes.spinner,
    name: "spinner",
    element: <Spinner />,
    route: Route,
  },
  {
    id: 30,
    path: routes.carousel,
    name: "carousel",
    element: <Carousel />,
    route: Route,
  },
  {
    id: 31,
    path: routes.navtabs,
    name: "navtabs",
    element: <NavTabs />,
    route: Route,
  },
  {
    id: 32,
    path: routes.toasts,
    name: "toasts",
    element: <Toasts />,
    route: Route,
  },
  {
    id: 33,
    path: routes.typography,
    name: "typography",
    element: <Typography />,
    route: Route,
  },
  {
    id: 34,
    path: routes.video,
    name: "video",
    element: <Video />,
    route: Route,
  },
  {
    id: 35,
    path: routes.tooltip,
    name: "tooltip",
    element: <Tooltips />,
    route: Route,
  },
  {
    id: 36,
    path: routes.draganddrop,
    name: "draganddrop",
    element: <DragDrop />,
    route: Route,
  },
  {
    id: 37,
    path: routes.sweetalerts,
    name: "sweetalerts",
    element: <SweetAlert />,
    route: Route,
  },
  {
    id: 38,
    path: routes.progress,
    name: "progress",
    element: <Progress />,
    route: Route,
  },
  {
    id: 38,
    path: routes.departmentgrid,
    name: "departmentgrid",
    element: <DepartmentGrid />,
    route: Route,
  },
  {
    id: 39,
    path: routes.placeholder,
    name: "placeholder",
    element: <Placeholder />,
    route: Route,
  },

  {
    id: 39,
    path: routes.departmentlist,
    name: "departmentlist",
    element: <DepartmentList />,
    route: Route,
  },
  {
    id: 40,
    path: routes.rating,
    name: "rating",
    element: <Rating />,
  },

  {
    id: 40,
    path: routes.designation,
    name: "designation",
    element: <Designation />,
    route: Route,
  },
  {
    id: 41,
    path: routes.texteditor,
    name: "text-editor",
    element: <TextEditor />,
    route: Route,
  },

  {
    id: 41,

    path: routes.shift,
    name: "shift",
    element: <Shift />,
    route: Route,
  },
  {
    id: 42,
    path: routes.counter,
    name: "counter",
    element: <Counter />,
    route: Route,
  },
  {
    id: 42,
    path: routes.attendanceemployee,
    name: "attendanceemployee",
    element: <AttendanceEmployee />,
    route: Route,
  },
  {
    id: 43,
    path: routes.scrollbar,
    name: "scrollbar",
    element: <Uiscrollbar />,
    route: Route,
  },
  {
    id: 43,
    path: routes.clipboard,
    name: "clipboard",
    element: <ClipBoard />,
    route: Route,
  },
  {
    id: 44,
    path: routes.stickynote,
    name: "stickynote",
    element: <Stickynote />,
    route: Route,
  },
  {
    id: 44,
    path: routes.tablebasic,
    name: "tablebasic",
    element: <TablesBasic />,
    route: Route,
  },
  {
    id: 45,
    path: routes.timeline,
    name: "timeline",
    element: <Timeline />,
    route: Route,
  },
  {
    id: 45,
    path: routes.datatable,
    name: "datatable",
    element: <DataTables />,
    route: Route,
  },
  {
    id: 46,
    path: routes.apexchart,
    name: "apex-chart",
    element: <Apexchart />,
    route: Route,
  },

  {
    id: 46,
    path: routes.basicinput,
    name: "formbasicinput",
    element: <FormBasicInputs />,
    route: Route,
  },
  {
    id: 47,
    path: routes.chartjs,
    name: "chart-js",
    element: <ChartJs />,
    route: Route,
  },
  {
    id: 47,
    path: routes.checkboxradio,
    name: "checkboxradio",
    element: <CheckboxRadios />,
    route: Route,
  },
  {
    id: 48,
    path: routes.rangeslider,
    name: "range-slider",
    element: <RangeSlides />,
    route: Route,
  },
  {
    id: 49,
    path: routes.fontawesome,
    name: "fontawesome",
    element: <FontawesomeIcons />,
    route: Route,
  },
  {
    id: 50,
    path: routes.feathericon,
    name: "feathericon",
    element: <FeatherIcons />,
    route: Route,
  },
  {
    id: 51,
    path: routes.ionicicons,
    name: "ionicicons",
    element: <IonicIcons />,
    route: Route,
  },
  {
    id: 52,
    path: routes.materialicons,
    name: "materialicons",
    element: <MaterialIcons />,
    route: Route,
  },
  {
    id: 53,
    path: routes.pe7icons,
    name: "pe7icons",
    element: <PE7Icons />,
    route: Route,
  },
  {
    id: 54,
    path: routes.simpleline,
    name: "simpleline",
    element: <SimplelineIcons />,
    route: Route,
  },
  {
    id: 55,
    path: routes.themifyicons,
    name: "themifyicon",
    element: <ThemifyIcons />,
    route: Route,
  },
  {
    id: 56,
    path: routes.iconweather,
    name: "iconweather",
    element: <WeatherIcons />,
    route: Route,
  },
  {
    id: 57,
    path: routes.typicons,
    name: "typicons",
    element: <TypiconIcons />,
    route: Route,
  },
  {
    id: 58,
    path: routes.flagicons,
    name: "flagicons",
    element: <FlagIcons />,
    route: Route,
  },
  {
    id: 58,
    path: routes.inputgroup,
    name: "inputgroup",
    element: <InputGroup />,
    route: Route,
  },
  {
    id: 59,
    path: routes.ribbon,
    name: "ribbon",
    element: <Ribbon />,
    route: Route,
  },
  {
    id: 60,
    path: routes.chat,
    name: "chat",
    element: <Chats />,
    route: Route,
  },
  {
    id: 100,
    path: routes.SocialFeed,
    name: "SocialFeed",
    element: <SocialFeed />,
    route: Route,
  },
  {
    id: 101,
    path: routes.Kanban,
    name: "Kanban",
    element: <KanbanView />,
    route: Route,
  },
  {
    id: 102,
    path: routes.Sortable,
    name: "Sortable",
    element: <Sortable />,
    route: Route,
  },
  {
    id: 103,
    path: routes.SwiperJs,
    name: "SwiperJs",
    element: <Swiperjs />,
    route: Route,
  },
  {
    id: 104,
    path: routes.FormPicker,
    name: "FormPicker",
    element: <FormPikers />,
    route: Route,
  },
  {
    id: 105,
    path: routes.Leaflets,
    name: "Leaflet",
    element: <Leaflet />,
    route: Route,
  },
  {
    id: 106,
    path: routes.remixIcon,
    name: "remixIcon",
    element: <RemixIcons />,
    route: Route,
  },
  {
    id: 107,
    path: routes.BootstrapIcon,
    name: "BootstrapIcon",
    element: <BootstrapIcons />,
    route: Route,
  },
  {
    id: 108,
    path: routes.TablerIcon,
    name: "TablerIcon",
    element: <TablerIcon />,
    route: Route,
  },
  {
    id: 49,
    path: routes.gridgutters,
    name: "gridgutters",
    element: <GridGutters />,
    route: Route,
  },
  {
    id: 50,
    path: routes.gridgutters,
    name: "gridgutters",
    element: <GridGutters />,
    route: Route,
  },
  {
    id: 51,
    path: routes.formselect,
    name: "formselect",
    element: <FormSelect />,
    route: Route,
  },
  {
    id: 52,
    path: routes.fileupload,
    name: "fileupload",
    element: <FileUpload />,
    route: Route,
  },
  {
    id: 53,
    path: routes.formmask,
    name: "formmask",
    element: <FormMask />,
    route: Route,
  },
  {
    id: 54,
    path: routes.formhorizontal,
    name: "formhorizontal",
    element: <FormHorizontal />,
    route: Route,
  },
  {
    id: 54,
    path: routes.formvertical,
    name: "formvertical",
    element: <FormVertical />,
    route: Route,
  },
  {
    id: 55,
    path: routes.floatinglabel,
    name: "floatinglabel",
    element: <FloatingLabel />,
    route: Route,
  },
  {
    id: 56,
    path: routes.formvalidation,
    name: "formvalidation",
    element: <FormValidation />,
    route: Route,
  },
  {
    id: 57,
    path: routes.select2,
    name: "select2",
    element: <FormSelect2 />,
    route: Route,
  },
  {
    id: 58,
    path: routes.wizard,
    name: "wizard",
    element: <FormWizard />,
    route: Route,
  },
  {
    id: 58,
    path: routes.expiredproduct,
    name: "expiredproduct",
    element: <ExpiredProduct />,
    route: Route,
  },
  {
    id: 59,
    path: routes.lowstock,
    name: "lowstock",
    element: <LowStock />,
    route: Route,
  },
  {
    id: 60,
    path: routes.categorylist,
    name: "categorylist",
    element: <CategoryList />,
    route: Route,
  },
  {
    id: 61,
    path: routes.expenselist,
    name: "expenselist",
    element: <ExpensesList />,
    route: Route,
  },
  {
    id: 62,
    path: routes.expensecategory,
    name: "expensecategory",
    element: <ExpenseCategory />,
    route: Route,
  },
  {
    id: 63,
    path: routes.calendars,
    name: "calendar",
    element: <Calendars />,
    route: Route,
  },
  {
    id: 64,
    path: routes.subcategories,
    name: "subcategories",
    element: <SubCategories />,
    route: Route,
  },
  {
    id: 65,
    path: routes.editproduct,
    name: "editproduct",
    element: <EditProduct />,
    route: Route,
  },
  {
    id: 63,
    path: routes.videocall,
    name: "videocall",
    element: <Videocall />,
    route: Route,
  },
  {
    id: 64,
    path: routes.audiocall,
    name: "audiocall",
    element: <Audiocall />,
    route: Route,
  },
  {
    id: 65,
    path: routes.email,
    name: "email",
    element: <Email />,
    route: Route,
  },
  {
    id: 66,
    path: routes.callhistory,
    name: "callhistory",
    element: <Callhistory />,
    route: Route,
  },
  {
    id: 67,
    path: routes.todo,
    name: "todo",
    element: <Todo />,
    route: Route,
  },
  {
    id: 66,
    path: routes.variantattributes,
    name: "variantattributes",
    element: <VariantAttributes />,
    route: Route,
  },
  {
    id: 67,
    path: routes.qrcode,
    name: "qrcode",
    element: <QRcode />,
    route: Route,
  },
  {
    id: 68,
    path: routes.purchaselist,
    name: "purchaselist",
    element: <PurchasesList />,
    route: Route,
  },
  {
    id: 69,
    path: routes.purchaseorderreport,
    name: "purchaseorderreport",
    element: <PurchaseOrderReport />,
    route: Route,
  },
  {
    id: 70,
    path: routes.purchasereturn,
    name: "purchasereturn",
    element: <PurchaseReturns />,
    route: Route,
  },
  {
    id: 71,
    path: routes.appearance,
    name: "appearance",
    element: <Appearance />,
    route: Route,
  },
  {
    id: 72,
    path: routes.socialauthendication,
    name: "socialauthendication",
    element: <SocialAuthentication />,
    route: Route,
  },
  {
    id: 73,
    path: routes.languagesettings,
    name: "languagesettings",
    element: <LanguageSettings />,
    route: Route,
  },
  {
    id: 74,
    path: routes.invoicesettings,
    name: "invoicesettings",
    element: <InvoiceSettings />,
    route: Route,
  },
  {
    id: 75,
    path: routes.printersettings,
    name: "printersettings",
    element: <PrinterSettings />,
    route: Route,
  },
  {
    id: 76,
    path: routes.possettings,
    name: "possettings",
    element: <PosSettings />,
    route: Route,
  },
  {
    id: 77,
    path: routes.customfields,
    name: "customfields",
    element: <CustomFields />,
    route: Route,
  },
  {
    id: 78,
    path: routes.emailsettings,
    name: "emailsettings",
    element: <EmailSettings />,
    route: Route,
  },
  {
    id: 79,
    path: routes.smssettings,
    name: "smssettings",
    element: <SmsGateway />,
    route: Route,
  },
  {
    id: 80,
    path: routes.otpsettings,
    name: "otpsettings",
    element: <OtpSettings />,
    route: Route,
  },
  {
    id: 81,
    path: routes.gdbrsettings,
    name: "gdbrsettings",
    element: <GdprSettings />,
    route: Route,
  },
  {
    id: 82,
    path: routes.paymentgateway,
    name: "paymentgateway",
    element: <PaymentGateway />,
    route: Route,
  },
  {
    id: 83,
    path: routes.banksettingslist,
    name: "banksettingslist",
    element: <BankSetting />,
    route: Route,
  },
  {
    id: 84,
    path: routes.customers,
    name: "customers",
    element: <Customers />,
    route: Route,
  },
  {
    id: 85,
    path: routes.suppliers,
    name: "suppliers",
    element: <Suppliers />,
    route: Route,
  },
  {
    id: 86,
    path: routes.storelist,
    name: "storelist",
    element: <StoreList />,
    route: Route,
  },
  {
    id: 87,
    path: routes.managestock,
    name: "managestock",
    element: <Managestock />,
    route: Route,
  },
  {
    id: 88,
    path: routes.stockadjustment,
    name: "stockadjustment",
    element: <StockAdjustment />,
    route: Route,
  },
  {
    id: 89,
    path: routes.stocktransfer,
    name: "stocktransfer",
    element: <StockTransfer />,
    route: Route,
  },
  {
    id: 90,
    path: routes.salesreport,
    name: "salesreport",
    element: <SalesReport />,
    route: Route,
  },
  {
    id: 91,
    path: routes.purchasereport,
    name: "purchasereport",
    element: <PurchaseReport />,
    route: Route,
  },
  {
    id: 92,
    path: routes.inventoryreport,
    name: "inventoryreport",
    element: <InventoryReport />,
    route: Route,
  },
  // {
  //   id: 93,
  //   path: routes.invoicereport,
  //   name: "invoicereport",
  //   element: <Invoicereport />,
  //   route: Route,
  // },
  {
    id: 94,
    path: routes.supplierreport,
    name: "supplierreport",
    element: <SupplierReport />,
    route: Route,
  },
  {
    id: 95,
    path: routes.customerreport,
    name: "customerreport",
    element: <CustomerReport />,
    route: Route,
  },
  {
    id: 96,
    path: routes.expensereport,
    name: "expensereport",
    element: <ExpenseReport />,
    route: Route,
  },
  {
    id: 97,
    path: routes.incomereport,
    name: "incomereport",
    element: <IncomeReport />,
    route: Route,
  },
  {
    id: 98,
    path: routes.taxreport,
    name: "taxreport",
    element: <TaxReport />,
    route: Route,
  },
  {
    id: 99,
    path: routes.profitloss,
    name: "profitloss",
    element: <ProfitLoss />,
    route: Route,
  },
  {
    id: 89,
    path: routes.generalsettings,
    name: "generalsettings",
    element: <GeneralSettings />,
    route: Route,
  },
  {
    id: 90,
    path: routes.securitysettings,
    name: "securitysettings",
    element: <SecuritySettings />,
    route: Route,
  },
  {
    id: 91,
    path: routes.notification,
    name: "notification",
    element: <Notification />,
    route: Route,
  },
  {
    id: 92,
    path: routes.connectedapps,
    name: "connectedapps",
    element: <ConnectedApps />,
    route: Route,
  },
  {
    id: 93,
    path: routes.systemsettings,
    name: "systemsettings",
    element: <SystemSettings />,
    route: Route,
  },
  {
    id: 94,
    path: routes.companysettings,
    name: "companysettings",
    element: <CompanySettings />,
    route: Route,
  },
  {
    id: 94,
    path: routes.localizationsettings,
    name: "localizationsettings",
    element: <LocalizationSettings />,
    route: Route,
  },
  {
    id: 95,
    path: routes.prefixes,
    name: "prefixes",
    element: <Prefixes />,
    route: Route,
  },
  {
    id: 99,
    path: routes.preference,
    name: "preference",
    element: <Preference />,
    route: Route,
  },
  {
    id: 99,
    path: routes.banipaddress,
    name: "banipaddress",
    element: <BanIpaddress />,
    route: Route,
  },
  {
    id: 99,
    path: routes.storagesettings,
    name: "storagesettings",
    element: <StorageSettings />,
    route: Route,
  },
  {
    id: 99,
    path: routes.taxrates,
    name: "taxrates",
    element: <TaxRates />,
    route: Route,
  },
  {
    id: 99,
    path: routes.currencysettings,
    name: "currencysettings",
    element: <CurrencySettings />,
    route: Route,
  },

  {
    id: 100,
    path: routes.attendanceadmin,
    name: "attendanceadmin",
    element: <AttendanceAdmin />,
    route: Route,
  },
  {
    id: 101,
    path: routes.payslip,
    name: "payslip",
    element: <Payslip />,
    route: Route,
  },
  {
    id: 102,
    path: routes.saleslist,
    name: "saleslist",
    element: <SalesList />,
    route: Route,
  },
  {
    id: 102,
    path: routes.invoicereport,
    name: "invoicereport",
    element: <Invoicereportnew />,
    route: Route,
  },
  {
    id: 102,
    path: routes.holidays,
    name: "holidays",
    element: <Holidays />,
    route: Route,
  },
  {
    id: 102,
    path: routes.salesreturn,
    name: "salesreturn",
    element: <SalesReturn />,
    route: Route,
  },
  {
    id: 103,
    path: routes.quotationlist,
    name: "quotationlist",
    element: <QuotationList />,
    route: Route,
  },
  {
    id: 104,
    path: routes.notes,
    name: "notes",
    element: <Notes />,
    route: Route,
  },
  {
    id: 105,
    path: routes.filemanager,
    name: "filemanager",
    element: <FileManager />,
    route: Route,
  },
  {
    id: 106,
    path: routes.profile,
    name: "profile",
    element: <Profile />,
    route: Route,
  },
  {
    id: 20,
    path: routes.blankpage,
    name: "blankpage",
    element: <Blankpage />,
    route: Route,
  },
  {
    id: 104,
    path: routes.users,
    name: "users",
    element: <Users />,
    route: Route,
  },
  {
    id: 105,
    path: routes.rolespermission,
    name: "rolespermission",
    element: <RolesPermissions />,
    route: Route,
  },
  {
    id: 106,
    path: routes.permissions,
    name: "permissions",
    element: <Permissions />,
    route: Route,
  },
  {
    id: 107,
    path: routes.deleteaccount,
    name: "deleteaccount",
    element: <DeleteAccount />,
    route: Route,
  },
  {
    id: 108,
    path: routes.employeegrid,
    name: "employeegrid",
    element: <EmployeesGrid />,
    route: Route,
  },
  {
    id: 109,
    path: routes.addemployee,
    name: "addemployee",
    element: <AddEmployee />,
    route: Route,
  },
  {
    id: 110,
    path: routes.editemployee,
    name: "editemployee",
    element: <EditEmployee />,
    route: Route,
  },
  {
    id: 111,
    path: routes.leavesadmin,
    name: "leavesadmin",
    element: <LeavesAdmin />,
    route: Route,
  },
  {
    id: 112,
    path: routes.leavesemployee,
    name: "leavesemployee",
    element: <LeavesEmployee />,
    route: Route,
  },
  {
    id: 113,
    path: routes.leavestype,
    name: "leavestype",
    element: <LeaveTypes />,
    route: Route,
  },
  {
    id: 113,
    path: routes.productdetails,
    name: "productdetails",
    element: <ProductDetail />,
    route: Route,
  },
  {
    id: 114,
    path: routes.warehouses,
    name: "warehouses",
    element: <WareHouses />,
    route: Route,
  },
  {
    id: 115,
    path: routes.coupons,
    name: "coupons",
    element: <Coupons />,
    route: Route,
  },
  {
    id: 116,
    path: "*",
    name: "NotFound",
    element: <Navigate to="/" />,
    route: Route,
  },
  {
    id: 117,
    path: "/",
    name: "Root",
    element: <Navigate to="/signin" />,
    route: Route,
  },
  {
    id: 118,
    path: routes.banksettingsgrid,
    name: "banksettingsgrid",
    element: <BankSettingGrid />,
    route: Route,
  },
  {
    id: 119,
    path: routes.payrollList,
    name: "payroll-list",
    element: <PayrollList />,
    route: Route,
  },
  {
    id: 120,
    path: routes.onlineorder,
    name: "online-order",
    element: <OnlineOrder />,
    route: Route,
  },
  {
    id: 121,
    path: routes.posorder,
    name: "pos-orders",
    element: <PosOrder />,
    route: Route,
  },
  {
    id: 122,
    path: routes.invoice,
    name: "invoice",
    element: <Invoice />,
    route: Route,
  },
  {
    id: 123,
    path: routes.invoicedetails,
    name: "invoice-details",
    element: <Invoicedetails />,
    route: Route,
  },
  {
    id: 124,
    path: routes.discount,
    name: "discount",
    element: <Discount />,
    route: Route,
  },
  {
    id: 124,
    path: routes.discountPlan,
    name: "discount-plan",
    element: <DiscountPlan />,
    route: Route,
  },
  {
    id: 124,
    path: routes.GiftCard,
    name: "gift-card",
    element: <GiftCards />,
    route: Route,
  },
  {
    id: 129,
    path: routes.accountlist,
    name: "account-list",
    element: <Accountlist />,
    route: Route,
  },
  {
    id: 125,
    path: routes.moneytransfer,
    name: "money-transfer",
    element: <Moneytransfer />,
    route: Route,
  },
  {
    id: 126,
    path: routes.balancesheet,
    name: "balance-sheet",
    element: <Balancesheet />,
    route: Route,
  },
  {
    id: 127,
    path: routes.trailbalance,
    name: "trial-balance",
    element: <Trailbalance />,
    route: Route,
  },
  {
    id: 128,
    path: routes.cashflow,
    name: "cash-flow",
    element: <Cashflow />,
    route: Route,
  },
  {
    id: 129,
    path: routes.accountstatement,
    name: "account-statement",
    element: <Accountstatement />,
    route: Route,
  },
  {
    id: 130,
    path: routes.biller,
    name: "billers",
    element: <Biller />,
    route: Route,
  },
  {
    id: 131,
    path: routes.employeedetails,
    name: "billers",
    element: <Employeedetails />,
    route: Route,
  },
  {
    id: 132,
    path: routes.stockhistory,
    name: "stock-history",
    element: <Stockhistory />,
    route: Route,
  },
  {
    id: 133,
    path: routes.soldstock,
    name: "sold-stock",
    element: <SoldStock />,
    route: Route,
  },
  {
    id: 134,
    path: routes.bestseller,
    name: "best-sellers",
    element: <BestSeller />,
    route: Route,
  },
  {
    id: 135,
    path: routes.invoicereportnew,
    name: "invoice-report",
    element: <Invoicereportnew />,
    route: Route,
  },
  {
    id: 135,
    path: routes.languagesettingsweb,
    name: "language-settings-web",
    element: <Languagesetteingsweb />,
    route: Route,
  },
  {
    id: 150,
    path: routes.employeelist,
    name: "employees-list",
    element: <EmployeesList />,
    route: Route,
  },
  {
    id: 151,
    path: routes.incomelist,
    name: "income-list",
    element: <IncomeList />,
    route: Route,
  },
  {
    id: 152,
    path: routes.incomecategory,
    name: "income-category",
    element: <IncomeCategory />,
    route: Route,
  },
  {
    id: 136,
    path: routes.product,
    name: "products",
    element: <Products />,
    route: Route,
  },
  {
    id: 137,
    path: routes.productdetails,
    name: "products-details",
    element: <Productsdetails />,
    route: Route,
  },
  {
    id: 138,
    path: routes.orders,
    name: "orders",
    element: <Orders />,
    route: Route,
  },
  {
    id: 139,
    path: routes.cart,
    name: "cart",
    element: <Cart />,
    route: Route,
  },
  {
    id: 140,
    path: routes.checkout,
    name: "checkout",
    element: <Checkout />,
    route: Route,
  },
  {
    id: 141,
    path: routes.wishlist,
    name: "wishlist",
    element: <Wishlist />,
    route: Route,
  },
  {
    id: 142,
    path: routes.reviews,
    name: "reviews",
    element: <Reviews />,
    route: Route,
  },
  {
    id: 143,
    path: routes.superadmindashboard,
    name: "super-admin-dashboard",
    element: <SuperAdminDashboard />,
    route: Route,
  },
  {
    id: 144,
    path: routes.companies,
    name: "companies",
    element: <Companies />,
    route: Route,
  },
  {
    id: 145,
    path: routes.subscription,
    name: "subscription",
    element: <Subscription />,
    route: Route,
  },
  {
    id: 146,
    path: routes.packagelist,
    name: "packages",
    element: <Packages />,
    route: Route,
  },
  {
    id: 147,
    path: routes.domain,
    name: "domain",
    element: <Domain />,
    route: Route,
  },
  {
    id: 148,
    path: routes.purchasetransaction,
    name: "purchase-transaction",
    element: <PurchaseTransaction />,
    route: Route,
  },
  {
    id: 149,
    path: routes.emailreply,
    name: "email-reply",
    element: <EmailReply />,
    route: Route,
  },
  {
    id: 150,
    path: routes.todolist,
    name: "todo-list",
    element: <TodoList />,
    route: Route,
  },
  {
    id: 151,
    path: routes.pagesList,
    name: "pages-list",
    element: <PagesList />,
    route: Route,
  },
  {
    path: routes.projects,
    name: "projects",
    element: <Projects />,
    route: Route,
  },
  {
    id: 152,
    path: routes.allBlogs,
    name: "pages-list",
    element: <AllBlogs />,
    route: Route,
  },
  {
    path: routes.searchlist,
    name: "Search-list",
    element: <Searchlist />,
    route: Route,
  },
  {
    id: 153,
    path: routes.blogDetails,
    name: "pages-list",
    element: <BlogDetails />,
    route: Route,
  },
  {
    path: routes.supplierduereport,
    name: "supplier-due-report",
    element: <SupplierDueReport />,
    route: Route,
  },
  {
    id: 154,
    path: routes.blogCategories,
    name: "pages-list",
    element: <BlogCategories />,
    route: Route,
  },
  {
    path: routes.customerduereport,
    name: "customer-due-report",
    element: <CustomerDueReport />,
    route: Route,
  },
  {
    id: 155,
    path: routes.blogComments,
    name: "pages-list",
    element: <BlogComments />,
    route: Route,
  },
  {
    path: routes.productreport,
    name: "product-report",
    element: <Productreport />,
    route: Route,
  },
  {
    id: 155,
    path: routes.productexpiredreport,
    name: "product-expired-report",
    element: <ProductExpiredreport />,
    route: Route,
  },
  {
    id: 155,
    path: routes.productquantityreport,
    name: "product-quality-report",
    element: <ProductQualityreport />,
    route: Route,
  },
  {
    id: 156,
    path: routes.blogTag,
    name: "pages-list",
    element: <BlogTags />,
    route: Route,
  },
  {
    path: routes.salereport,
    name: "sales-tax",
    element: <SaleReport />,
    route: Route,
  },
  {
    id: 157,
    path: routes.annualreport,
    name: "annual-report",
    element: <Annualreport />,
    route: Route,
  },
  {
    id: 158,
    path: routes.invoicetemplate,
    name: "invoice-template",
    element: <InvoiceTemplate />,
    route: Route,
  },
  {
    id: 159,
    path: routes.signatures,
    name: "signatures",
    element: <Signature />,
    route: Route,
  },
  {
    id: 160,
    path: routes.emailtemplate,
    name: "email-template",
    element: <Emailtemplatesettings />,
    route: Route,
  },
  {
    id: 161,
    path: routes.smstemplate,
    name: "sms-template",
    element: <Smstemplate />,
    route: Route,
  },
  {
    id: 162,
    path: routes.Horizontal,
    name: "layout-horizontal",
    element: <LayoutDemo />,
    route: Route,
  },
  {
    id: 163,
    path: routes.Detached,
    name: "layout-detached",
    element: <LayoutDemo />,
    route: Route,
  },
  {
    id: 164,
    path: routes.Modern,
    name: "layout-modern",
    element: <LayoutDemo />,
    route: Route,
  },
  {
    id: 165,
    path: routes.TwoColumn,
    name: "layout-two-column",
    element: <LayoutDemo />,
    route: Route,
  },
  {
    id: 166,
    path: routes.Hovered,
    name: "layout-hovered",
    element: <LayoutDemo />,
    route: Route,
  },
  {
    id: 167,
    path: routes.Boxed,
    name: "layout-boxed",
    element: <LayoutDemo />,
    route: Route,
  },
  {
    id: 168,
    path: routes.RTL,
    name: "layout-rtl",
    element: <LayoutDemo />,
    route: Route,
  },
  {
    id: 169,
    path: routes.Dark,
    name: "layout-dark",
    element: <LayoutDemo />,
    route: Route,
  },
  {
    id: 170,
    path: routes.cities,
    name: "cities",
    element: <Cities />,
    route: Route,
  },
  {
    id: 171,
    path: routes.countries,
    name: "countries",
    element: <Countries />,
    route: Route,
  },
  {
    id: 172,
    path: routes.states,
    name: "states",
    element: <States />,
    route: Route,
  },
  {
    id: 173,
    path: routes.testimonial,
    name: "testimonial",
    element: <Testimonial />,
    route: Route,
  },
  {
    id: 170,
    path: routes.faq,
    name: "faq",
    element: <Faq />,
    route: Route,
  },
  {
    id: 171,
    path: routes.activities,
    name: "activities",
    element: <Activities />,
    route: Route,
  },
  {
    id: 172,
    path: routes.pricing,
    name: "pricing",
    element: <Pricing />,
    route: Route,
  },
  {
    id: 173,
    path: routes.contact,
    name: "contact",
    element: <Contacts />,
    route: Route,
  },
];
export const posRoutes = [
  {
    id: 1,
    path: routes.pos,
    name: "pos",
    element: <Pos />,
    route: Route,
  },
  {
    id: 2,
    path: routes.pos2,
    name: "pos-2",
    element: <Pos2 />,
    route: Route,
  },
  {
    id: 3,
    path: routes.pos3,
    name: "pos-3",
    element: <Pos3 />,
    route: Route,
  },
  {
    id: 4,
    path: routes.pos4,
    name: "pos-4",
    element: <Pos4 />,
    route: Route,
  },
  {
    id: 3,
    path: routes.pos5,
    name: "pos-5",
    element: <Pos5 />,
    route: Route,
  },
];

export const pagesRoute = [
  {
    id: 1,
    path: routes.signin,
    name: "signin",
    element: <Signin />,
    route: Route,
  },
  {
    id: 2,
    path: routes.signintwo,
    name: "signintwo",
    element: <SigninTwo />,
    route: Route,
  },
  {
    id: 3,
    path: routes.signinthree,
    name: "signinthree",
    element: <SigninThree />,
    route: Route,
  },
  {
    id: 4,
    path: routes.register,
    name: "register",
    element: <Register />,
    route: Route,
  },
  {
    id: 5,
    path: routes.registerTwo,
    name: "registerTwo",
    element: <RegisterTwo />,
    route: Route,
  },
  {
    id: 6,
    path: routes.registerThree,
    name: "registerThree",
    element: <RegisterThree />,
    route: Route,
  },
  {
    id: 7,
    path: routes.forgotPassword,
    name: "forgotPassword",
    element: <Forgotpassword />,
    route: Route,
  },
  {
    id: 7,
    path: routes.forgotPasswordTwo,
    name: "forgotPasswordTwo",
    element: <ForgotpasswordTwo />,
    route: Route,
  },
  {
    id: 8,
    path: routes.forgotPasswordThree,
    name: "forgotPasswordThree",
    element: <ForgotpasswordThree />,
    route: Route,
  },
  {
    id: 9,
    path: routes.resetpassword,
    name: "resetpassword",
    element: <Resetpassword />,
    route: Route,
  },
  {
    id: 10,
    path: routes.resetpasswordTwo,
    name: "resetpasswordTwo",
    element: <ResetpasswordTwo />,
    route: Route,
  },
  {
    id: 11,
    path: routes.resetpasswordThree,
    name: "resetpasswordThree",
    element: <ResetpasswordThree />,
    route: Route,
  },
  {
    id: 12,
    path: routes.emailverification,
    name: "emailverification",
    element: <EmailVerification />,
    route: Route,
  },
  {
    id: 12,
    path: routes.emailverificationTwo,
    name: "emailverificationTwo",
    element: <EmailverificationTwo />,
    route: Route,
  },
  {
    id: 13,
    path: routes.emailverificationThree,
    name: "emailverificationThree",
    element: <EmailverificationThree />,
    route: Route,
  },
  {
    id: 14,
    path: routes.twostepverification,
    name: "twostepverification",
    element: <Twostepverification />,
    route: Route,
  },
  {
    id: 15,
    path: routes.twostepverificationTwo,
    name: "twostepverificationTwo",
    element: <TwostepverificationTwo />,
    route: Route,
  },
  {
    id: 16,
    path: routes.twostepverificationThree,
    name: "twostepverificationThree",
    element: <TwostepverificationThree />,
    route: Route,
  },
  {
    id: 17,
    path: routes.lockscreen,
    name: "lockscreen",
    element: <Lockscreen />,
    route: Route,
  },
  {
    id: 18,
    path: routes.error404,
    name: "error404",
    element: <Error404 />,
    route: Route,
  },
  {
    id: 19,
    path: routes.error500,
    name: "error500",
    element: <Error500 />,
    route: Route,
  },
  {
    id: 20,
    path: routes.comingsoon,
    name: "comingsoon",
    element: <Comingsoon />,
    route: Route,
  },
  {
    id: 21,
    path: routes.undermaintenance,
    name: "undermaintenance",
    element: <Undermaintainence />,
    route: Route,
  },
  {
    id: 22,
    path: routes.success,
    name: "success",
    element: <Success />,
    route: Route,
  },
  {
    id: 23,
    path: routes.successTwo,
    name: "success-2",
    element: <SuccessTwo />,
    route: Route,
  },
  {
    id: 24,
    path: routes.successThree,
    name: "success-3",
    element: <SuccessThree />,
    route: Route,
  },
];
