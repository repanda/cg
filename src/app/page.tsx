import ControllerTable from './controller'
import ExampleWithProviders from './realization/departmentRealisations'
import ManagerTable from './manager'
import ProvisionProviders from './provision/provisions'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ExampleWithProviders></ExampleWithProviders>
      <ProvisionProviders></ProvisionProviders>
      <ControllerTable></ControllerTable>
    </main>
  )
}
