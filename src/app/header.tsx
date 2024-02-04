import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/realizations">
              Department Realizations
            </Link>
          </li>
          <li>
            <Link href="/provisions">
              Provisions
            </Link>
          </li>
          <li>
            <Link href="/reports">
              Reports
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
