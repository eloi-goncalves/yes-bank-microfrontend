import React, { Suspense, lazy } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

export const HelloWorld = lazy(() =>
  import('./helloWorld').then(mod => {
    return { default: mod.HelloWorld };
  }),
);

const links = [
  { href: '/', label: 'Home' },
  { href: '/transaction', label: 'Transaction' },
  { href: 'http://localhost:3001/transaction', label: 'Transaction App' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => (
  <nav>
    <Suspense>
      <HelloWorld />
    </Suspense>
    <ul>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
        padding-right: 10px;
      }
    `}</style>
  </nav>
);

export default Nav;
