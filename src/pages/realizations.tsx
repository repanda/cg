import ExampleWithProviders from '../app/realization/departmentRealisations';
import Dashboard from './DashboardContent';

export default function DepartmentRealizations({ setIsAuthenticated }) {

  return (
    <Dashboard setIsAuthenticated={setIsAuthenticated} content={() => <ExampleWithProviders/>} />
  );
};