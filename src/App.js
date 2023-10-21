import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './page/Home';
import Section from './page/section';
import Desk from './page/Desk';
import Update from './page/subPage/Update';
import Dashboard from './page/subPage/dashboard';
import Traders from './page/subPage/traders';
import NewComer from './page/subPage/Newcomer';
import Runaway from './page/subPage/runaway';
import Stockman from './page/subPage/stockman';
import Details from './page/subPage/details';
import Nav from './page/subPage/nav';
import Return from './page/subPage/return';
import Compare from './page/subPage/Compare';
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

import { QueryClient, QueryClientProvider } from 'react-query';


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
            <Route path='return' element={<Return />}/>
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
          </Route>
          {/*<Route path='/admin' element={<Manegment />}/>*/}
          <Route path='/printas/:symbol/:nc' element={<AssemblySheetPrint />}/>
          <Route path='/printas/sheetvotecontroller/:symbol' element={<SheetVoteController />}/>
          <Route path='/printas/sheetinassembly/:symbol' element={<SheetInAssembly />}/>
          <Route path='/pbl/pc/:sym/:nc' element={<PreemptionCard />}/>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  );
}

export default App;
