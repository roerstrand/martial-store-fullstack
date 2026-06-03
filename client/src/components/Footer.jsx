function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__col--brand">
          <div className="footer__brand">Apex Core</div>
          <p className="footer__tagline">Train hard. Fight smart.</p>
        </div>
        <div className="footer__col">
          <p className="footer__col-title">Shop</p>
          <a href="/products" className="footer__link">All products</a>
          <a href="/products?sale=true" className="footer__link">Sale</a>
          <a href="/favorites" className="footer__link">Favorites</a>
          <a href="/articles" className="footer__link">Stories</a>
        </div>
        <div className="footer__col">
          <p className="footer__col-title">Information</p>
          <a href="/info/about" className="footer__link">About us</a>
          <a href="/info/shipping" className="footer__link">Shipping</a>
          <a href="/info/returns" className="footer__link">Returns</a>
          <a href="/info/faq" className="footer__link">FAQ</a>
        </div>
        <div className="footer__col">
          <p className="footer__col-title">Contact</p>
          <a href="/contact" className="footer__link">Contact us</a>
          <a href="mailto:support@apexcore.com" className="footer__link">support@apexcore.com</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">&copy; 2026 Robin Erik Strandberg. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
