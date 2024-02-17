import ExampleWithProviders from '../app/realization/departmentRealisations';
import Dashboard from './DashboardContent';

export default function DepartmentRealizations({ setIsAuthenticated }) {

  return (
    <Dashboard  title='Realisation' setIsAuthenticated={setIsAuthenticated} content={() => <ExampleWithProviders/>} />
  );
};