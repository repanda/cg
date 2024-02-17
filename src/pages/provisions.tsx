import ProvisionProviders from '@/app/provision/provisions';
import Dashboard from './DashboardContent';

export default function ProvisionPage({ setIsAuthenticated }) {
  return (
    <Dashboard  title='Prevision' setIsAuthenticated={setIsAuthenticated} content={() => <ProvisionProviders/>} />
  );
};