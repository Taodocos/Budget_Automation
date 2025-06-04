;
import withAuth from './api/auth';
import Dashboard from './dashboard/page';


const ProtectedDashboard = withAuth(Dashboard);

export default ProtectedDashboard;