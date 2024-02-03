import ExampleWithProviders from './realization/departmentRealisations'
import ProvisionProviders from './provision/provisions'
import RapportProviders from './repport/reports'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ExampleWithProviders></ExampleWithProviders>
      <ProvisionProviders></ProvisionProviders>
      <RapportProviders></RapportProviders>
    </main>
  )
}
