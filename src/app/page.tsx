import ControllerTable from './controller'
import ExampleWithProviders from './realization/departmentRealisations'
import ManagerTable from './manager'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ExampleWithProviders></ExampleWithProviders>
      <ManagerTable></ManagerTable>
      <ControllerTable></ControllerTable>
    </main>
  )
}
