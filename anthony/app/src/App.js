import { Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Public from './components/Public';
// import Login from './simple/Login.simple';
// // import Dashboard from './components/Dashboard';
// import Welcome from './features/auth/Welcome';
// import RequireAuth from './simple/RequireAuth';
// import RememberLogin from './simple/RememberLogin';
// import Register from './simple/Register';
// import Unauthorized from './simple/Unauthorized';
// import Status from './simple/Status';
// import SessionExpired from './simple/SessionExpired';
// import PendingRequests from './simple/Requests/PendingRequests';
// import ClosedRequests from './simple/Requests/ClosedRequests';
// import CreateRequestWithCalendar from './simple/Requests/CreateRequestWithCalendar';
// import RequestManager from './simple/Requests/RequestManager';
// import RequestContainer from './simple/Requests/RequestContainer';
// import NewManager from './simple/Requests/NewManager';

/*
    Heres the main RestaurantOrderOnline components
*/
import PageLayout from './container/PageLayout';
import ItemList from './pages/item/ItemList';
import Dashboard from './pages/dashboard/Dashboard';
import Edit from './pages/item/Edit';
import Modifiers from './pages/item/Modifiers';
import TimeClock from './pages/staff/TimeClock';
import NewEmployee from './pages/staff/NewEmployee';
import EmployeeList from './pages/staff/EmployeeList';
import EditEmployee from './pages/staff/EditEmployee';
import Login from './pages/user_pages/Login';
import Order from './pages/order/Order';
import OrderItem from './pages/order/OrderItem';
import Orders from './pages/order/Backoffice/Orders';
import MenuPage from './raquel/pages/MenuPage';

function App() {
    return (
        <Routes>
            <Route path="salerno/login" element={<Login />} />
            <Route path="salerno" element={<Dashboard />}>
                <Route element={<PageLayout />}>
                    <Route path='order' element={<Order />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='order/item' element={<OrderItem />} />
                    <Route path='menu' element={<MenuPage />} />
                    <Route path='items' element={<ItemList />} />
                    <Route path='items/:itemId/edit' element={<Edit />} />
                    {/* <Route path='edit/new' element={<Edit />} /> */}
                    <Route path='items/:itemId/modifiers' element={<Modifiers />} />

                    <Route path='employees' element={<EmployeeList />} />
                    <Route path='employees/timeclock' element={<TimeClock />} />
                    <Route path='employees/new' element={<NewEmployee />} />
                    <Route path='employees/:id/edit' element={<EditEmployee />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App;

            
            /* <Route path='/' element={<Layout />}>
                <Route index element={<Public />} />
                <Route path='login' element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="sessionexpired" element={<SessionExpired />}/>
                <Route element={<RememberLogin />}>
                    <Route element={<Status />}>
                        <Route element={<RequireAuth allowedEmployeeType={["Employee", "Manager"]}/>}>
                            <Route path="dashboard" element={<Dashboard />}>
                                <Route index element={<Welcome />} />
                                <Route path="newmanager" element={<NewManager />}/>
                                <Route element={<RequestContainer />}>
                                    <Route path="pending" element={<PendingRequests />}/>
                                    <Route path="closed" element={<ClosedRequests />}/>
                                    <Route path="create" element={<CreateRequestWithCalendar />}/>
                                    <Route path="manager" element={<RequestManager />}/>
                                </Route>
                            </Route>
                        </Route>
                        
                    </Route>
                </Route>
            </Route> */