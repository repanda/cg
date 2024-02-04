import Link from 'next/link';
import Layout from '@/app/layout';

const Home = () => {
  return (
    <Layout>
      <section>
        <Link href="/realizations">
          Department Realizations
        </Link>
      </section>
      <section>
        <Link href="/provisions">
          Provisions
        </Link>
      </section>
      <section>
        <Link href="/reports">
          Reports
        </Link>
      </section>
    </Layout>
  );
};

export default Home;
