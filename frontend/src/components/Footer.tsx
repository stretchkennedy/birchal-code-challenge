import { Link } from "wouter";

const Footer = () => {
  return <footer>
    <div>
      <p>Website</p>
      <ul>
        <li><Link href="/browse">Browse Companies</Link></li>
        <li><Link href="/raise">Raise Capital</Link></li>
        <li><Link href="/investors">Investors</Link></li>
        <li><Link href="/partners">Explore Partners</Link></li>
        <li><Link href="/trade">Birchal Trade</Link></li>
        <li><Link href="/newsfeed">Newsfeed</Link></li>
      </ul>
    </div>
    <div>
      <p>Legal Center</p>
      <ul>
        <li><Link href="/fsg">Financial Services Guide</Link></li>
        <li><Link href="/risk">General CSF Risk Warning</Link></li>
        <li><Link href="/tos">Terms of Service</Link></li>
        <li><Link href="/investor-tos">Investor Terms &amp; Conditions</Link></li>
        <li><Link href="/cfp">Communication Facility Protocol</Link></li>
        <li><Link href="/privacy">Privacy Policy</Link></li>
        <li><Link href="/complaints">Complaints Policy</Link></li>
      </ul>
    </div>
    <div>
      <p>Help &amp; Support</p>
      <ul>
        <li><Link href="/">Who Are We?</Link></li>
        <li><Link href="/">Contact</Link></li>
        <li><Link href="/">Help Center</Link></li>
      </ul>
    </div>
  </footer>
}

export default Footer;