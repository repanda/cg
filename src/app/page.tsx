import ControllerTable from './controller'
import ManagerTable from './manager'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ManagerTable></ManagerTable>
      <ControllerTable></ControllerTable>
    </main>
  )
}
