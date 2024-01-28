import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './page/Home';
import Section from './page/section';
import Desk from './page/Desk';
import Update from './page/subPage/Update';
import Dashboard from './page/subPage/bours/dashboard';
import Traders from './page/subPage/bours/traders';
import NewComer from './page/subPage/bours/Newcomer';
import Runaway from './page/subPage/bours/runaway';
import Stockman from './page/subPage/bours/stockman';
import Details from './page/subPage/details';
import Nav from './page/subPage/fixincom/nav';
import Return from './page/subPage/fixincom/efficiency/return';
import Compare from './page/subPage/fixincom/analysis/Compare';
import BasicInformation from './page/subPage/BasicInformation';
import Shareholders from './page/subPage/noBours/shareholders';
import Grouping from './page/subPage/bours/grouping';
import Category from './page/subPage/bours/category';
import BalanceTrader from './page/subPage/bours/BalanceTrader';
import Broker from './page/subPage/bours/broker';
import Transactions from './page/subPage/noBours/Transactions';
import TraderActivityReport from './page/subPage/bours/TraderActivityReport';
import BrokerActivityReport from './page/subPage/bours/BrokerActivityReport';
import StationActivityReport from './page/subPage/bours/StationActivityReport';
import ExcerptTrader from './page/subPage/bours/ExcerptTrader';
import Manegment from './page/manegment/manegment';
import StockSheet from './page/subPage/noBours/stocksheet';
import FormerStockman from './page/subPage/bours/FormerStockman';
import Metric from './page/subPage/bours/metric';
import CreateAssembly from './page/subPage/noBours/createAssembly';
import AttendeesAssembly from './page/subPage/noBours/attendeesassembly';
import AssemblySheetPrint from './page/subPage/assemblySheetPrint';
import SheetVoteController from './page/subPage/SheetVoteController';
import SheetInAssembly from './page/subPage/SheetInAssembly';
import CapitalIncrease from './page/subPage/noBours/CapitalIncrease';
import Priority from './page/subPage/noBours/Priority';
import PriorityTransaction from './page/subPage/noBours/PriorityTransaction';
import PriorityPay from './page/subPage/noBours/prioritypay';
import VolumeTrade from './page/subPage/desk/broker/volumeTrade';
import PreemptionCard from './page/public/PreemptionCard';
import WellcomBrokerDesk from './page/subPage/desk/wellcom';
import TraderBroker from './page/subPage/bours/traderBroker';
import 'react-toastify/dist/ReactToastify.css';
import './style/style.css'
import 'react-tooltip/dist/react-tooltip.css'
import Turnover from './page/subPage/desk/sabad/turnover';
import TraderCodes from './page/subPage/desk/sabad/tradercodes';
import Todo from './page/subPage/desk/todo';
import TodoControl from './page/subPage/desk/todocontrol';
import CompareReturnSample from './page/subPage/fixincom/analysis/CompareReturnSample';
import { QueryClient, QueryClientProvider } from 'react-query';
import LimitFundFix from './page/subPage/fixincom/LimitFundFix';
import CompareReturnPeriod from './page/subPage/fixincom/analysis/CompareReturnPeriod';
import OraghYTM from './page/subPage/fixincom/oraghytm';
import ForwardYtm from './page/subPage/fixincom/efficiency/ForwardYtm';
import InvoiceCreate from './page/subPage/desk/moadian/invoicecreate';
import CompanyMoadian from './page/subPage/desk/moadian/companymoadian';
import InvoceList from './page/subPage/desk/moadian/invoicelist';
import DashboardFixInCome from './page/subPage/bours/dashbordFixIncome';
import Potential from './page/subPage/fixincom/potential';
import IncreaseAsset from './page/subPage/fixincom/IncreaseAsset';
import ReturnAsset from './page/subPage/fixincom/ReturnAsset';
import SetRetAsst from './page/subPage/fixincom/SetRetAsst';
import Managementcommittee from './page/subPage/fixincom/managementcommittee';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Residual from './page/subPage/bours/Residual';
import NotFound from './page/notFound';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/section' element={<Section />}/>
          <Route path='/desk' element={<Desk />}>
            <Route path='update' element={<Update />}/>
            <Route path='dashboard' element={<Dashboard />}/>
            <Route path='tradersall' element={<Traders />}/>
            <Route path='newComer' element={<NewComer />}/>
            <Route path='runaway' element={<Runaway />}/>
            <Route path='stockman' element={<Stockman />}/>
            <Route path='formerstockman' element={<FormerStockman />}/>
            <Route path='metric' element={<Metric />}/>
            <Route path='details/:code' element={<Details />}/>
            <Route path='balancetrader/:code' element={<BalanceTrader />}/>
            <Route path='traderactivityreport/:code' element={<TraderActivityReport />}/>
            <Route path='brokeractivityreport/:code' element={<BrokerActivityReport />}/>
            <Route path='stationactivityreport/:code' element={<StationActivityReport />}/>
            <Route path='excerpttrader/:code' element={<ExcerptTrader />}/>
            <Route path='nav' element={<Nav />}/>
            <Route path='backwardreturn' element={<Return />}/>
            <Route path='compare' element={<Compare />}/>
            <Route path='biasicinformation' element={<BasicInformation />}/>
            <Route path='shareholders' element={<Shareholders />}/>
            <Route path='grouping' element={<Grouping />}/>
            <Route path='category' element={<Category />}/>
            <Route path='broker' element={<Broker />}/>
            <Route path='stocksheet' element={<StockSheet />}/>
            <Route path='transactions' element={<Transactions />}/>
            <Route path='createassembly' element={<CreateAssembly />}/>
            <Route path='attendeesassembly' element={<AttendeesAssembly />}/>
            <Route path='sheetvotecontroller' element={<SheetVoteController />}/>
            <Route path='capitalincrease' element={<CapitalIncrease />}/>
            <Route path='priority' element={<Priority />}/>
            <Route path='prioritytransaction' element={<PriorityTransaction />}/>
            <Route path='prioritypay' element={<PriorityPay />}/>
            <Route path='wellcom' element={<WellcomBrokerDesk />}/>
            <Route path='volumetrade' element={<VolumeTrade />}/>
            <Route path='tradersbroker' element={<TraderBroker />}/>
            <Route path='turnover' element={<Turnover />}/>
            <Route path='tradercodes' element={<TraderCodes />}/>
            <Route path='todo' element={<Todo />}/>
            <Route path='todocontrol' element={<TodoControl />}/>
            <Route path='comparereturnsample' element={<CompareReturnSample />}/>
            <Route path='limitfundfix' element={<LimitFundFix />}/>
            <Route path='comparereturnperiod' element={<CompareReturnPeriod />}/>
            <Route path='oraghytm' element={<OraghYTM />}/>
            <Route path='forwardytm' element={<ForwardYtm />}/>
            <Route path='invoicecreate' element={<InvoiceCreate />}/>
            <Route path='companymoadian' element={<CompanyMoadian />}/>
            <Route path='invoicelist' element={<InvoceList />}/>
            <Route path='dashboardfixincom' element={<DashboardFixInCome />}/>
            <Route path='potential' element={<Potential />}/>
            <Route path='increaseasset' element={<IncreaseAsset />}/>
            <Route path='returnasset' element={<ReturnAsset />}/>
            <Route path='setreturnasset' element={<SetRetAsst />}/>
            <Route path='managementcommittee' element={<Managementcommittee />}/>
            <Route path='residual' element={<Residual />}/>
          </Route>
          <Route path='/printas/:symbol/:nc' element={<AssemblySheetPrint />}/>
          <Route path='/printas/sheetvotecontroller/:symbol' element={<SheetVoteController />}/>
          <Route path='/printas/sheetinassembly/:symbol' element={<SheetInAssembly />}/>
          <Route path='/pbl/pc/:sym/:nc' element={<PreemptionCard />}/>
          <Route path='/*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;
