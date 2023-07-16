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
import FormerStockman from './page/subPage/bours/FormerStockman';
import Metric from './page/subPage/bours/metric';
import CreateAssembly from './page/subPage/noBours/createAssembly';
import AttendeesAssembly from './page/subPage/noBours/attendeesassembly';
import AssemblySheetPrint from './page/subPage/assemblySheetPrint';
import SheetVoteController from './page/subPage/SheetVoteController';

import 'react-toastify/dist/ReactToastify.css';
import './style/style.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/section' element={<Section />}/>
        <Route path='/desk' element={<Desk />}>
          <Route path='update' element={<Update />}/>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='traders' element={<Traders />}/>
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
          <Route path='transactions' element={<Transactions />}/>
          <Route path='createassembly' element={<CreateAssembly />}/>
          <Route path='attendeesassembly' element={<AttendeesAssembly />}/>
          <Route path='sheetvotecontroller' element={<SheetVoteController />}/>
        </Route>
        <Route path='/admin' element={<Manegment />}/>
        <Route path='/printas/:symbol/:nc' element={<AssemblySheetPrint />}/>
        <Route path='/printas/sheetvotecontroller/:symbol' element={<SheetVoteController />}/>

      </Routes>
    </BrowserRouter>

  );
}

export default App;
