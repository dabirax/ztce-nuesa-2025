import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import nuesaLogo from "@/assets/nuesa-logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={nuesaLogo} alt="NUESA Logo" className="h-16 w-16 rounded-full" />
              <div>
                <h3 className="text-xl font-bold">NUESA Southwest Zone</h3>
                <p className="text-sm text-primary-foreground/80">#ZTCE2025</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Nigerian Universities Engineering Students' Association Southwest Zone 
              Zonal Technical Conference & Exhibition 2025
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>FUTA, Akure, Ondo State</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone size={16} className="flex-shrink-0" />
                <span>08105102245</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@nuesasouthwest.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm text-primary-foreground/70">
            © {currentYear} NUESA Southwest Zone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
