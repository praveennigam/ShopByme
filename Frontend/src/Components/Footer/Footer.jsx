import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} className="logom" alt="Logo" />
          <p>Shoppers Stop - Your one-stop destination for fashion and lifestyle.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>1800-245-565</li>
            <li>1800-245-566</li>
            <li>Customertruust@gmail.com</li>

          </ul>
        </div>
      </div>
      <div className="footer-content-center">
          <h2>COMPANY</h2>
            <p>Shoppers Stop – Best Fashion Shopping Site in India

Benefits of Shopping with Shoppers Stop

Shoppers Stop is home to a multitude of amazing products across fashion and lifestyle to cater to the needs of the entire family. While Shoppers Stop retail is a complete house of leading national and international brands for an exciting and memorable shopping experience. You can shop at ShoppersStop.com to take advantage of all the benefits here:
<br /><br />
  1.Simple shopping experience
Whether you shop online or in store, Shoppers Stop offers a seamless omnichannel experience in terms of products, prices and customer service.
<br /><br /> 2.Secure shopping
100% safe shopping with secure transmission of your card details directly to the bank for payment processing.
<br /><br /> 3.Wide range of products
At ShoppersStop.com you will find the best brands, trends, patterns, colours and more from a wide selection for men, women, kids and home.
<br /><br /> 4.Free returns
Free and easy returns on most merchandise bought online. Shoppersstop.com allows you to exchange the items at your nearest store or opt for return pickup.
<br /><br /> 5.100% original
All products are sourced from the brand and carry brand warranty and certificate of authenticity.
<br /><br /> 6.Free alterations
Buy online and if you don’t like the fit, you can easily come over to your nearest Shoppers Stop store for a fully free alteration.
<br /><br /> 7.Express store pick up
Head over to a store to pick up your order as per your convenience.
<br /><br /> 8.Personalized shopping at store and home
Avail the assistance of a Personal Shopper with prior appointment so you can shop at home online or in person.
 <br /><br />9.Buying guide
Head over to the buying guide at Shoppersstop.com to browse through personalized suggestions to make better purchases for yourself and your loved ones. </p>
<br /><br />
          <h2>Most Searched Brands on Shoppersstop.com</h2>
          <ul>
            <li>Watches: TITAN | CASIO | FASTRACK | FOSSIL | TOMMY | MICHAEL KORS | ARMANI EXCHANGE | EMPORIO ARMANI | DIESEL | GUESS | POLICE | KENNETH COLE | JUST CAVALLI | ZOOP | TIMEX | COACH | TISSOT | GIORDANO</li>
            <li>Shoes: SKECHERS | PUMA | ADIDAS | LEE COOPER | CATWALK | JACK & JONES | LEMON & PEPPER | INC 5 | HAUTE CURRY | W | CROCS | TRESMODE | USPA | ID</li>
            <li>Handbag: TOMMY HILFIGER | GUESS | VAN HEUSEN | ELLIZA DONATEIN | ALLEN SOLLY | LAVIE | HIDESIGN | LINO PERROS | BAGGIT</li>
            <li>Beauty: MAC | LAKME | CLINIQUE | ESTEE LAUDER | BOBBI BROWN | DAVIDOFF | L'OREAL | CALVIN KLEIN | MAYBELLINE | CLARINS | BURBERRY | ARMANI | SKINN | YSL</li>
            <li>Home: HOME STOP | BOROSIL | WONDERCHEF | SPACES | CORELLE | OBSESSIONS | VINOD STEEL | MASPAR | RUSSELL HOBBS | FNS | LAYERS | PORTICO | WEBER | SPREAD | ELLEMENTRY ONLINE</li>
            <li>Sunglasses: RAYBAN | TOMMY HILFIGER | OPIUM | IDEE | POLAROID | SCOTT | POLICE | GIO COLLECTION | FOSSIL | FCUK | GIORDANO | OAKLEY | PROVOGUE | ESPRIT</li>
            <li>Jewellery: SWAROVSKI | GIVA | FOSSIL | EMPORIO ARMANI | MICHAEL KORS | SKAGEN | JEWELZ | AYESHA | TISTABENE | TRIBAL ZONE | TRIBE AMRAPALI | HAUTE CURRY</li>
            <li>Apparels: AND | ALLEN SOLLY | ENAMOR | JOCKEY | VAN HEUSEN | KRAUS | ZINK LONDON | KASHISH | STOP | JUNIPER | W | HAUTE CURRY | BIBA | LEVIS | JACK & JONES | VETTORIO FRATINI | PEPE | BLACKBERRYS | FOREVERNEW</li>
            <li>Travel & Luggage: SAMSONITE | TOMMY HILFIGER | CARLTON | DELSEY PARIS | AMERICAN TOURISTER | VIP | SKYBAGS | HIDESIGN | TRAVEL BLUES</li>
          </ul>
          <p>Shoppers Stop – Best Fashion Shopping Site in India...</p>
          {/* Add more description as needed */}
        </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ By ShoppersStop.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
