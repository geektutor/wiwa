import Footer from "../components/footer/Footer";
import Navbar from "../components/nav/Navbar";
import "../assets/css/profile.css";
import classes from "../assets/css/tnc.module.css";
import {Link} from "react-router-dom";
import {useEffect} from "react";

const TnC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <main className={`${classes.tnc} main-wrap details-wrap`}>
        <div>
          <div className={classes.privacyLinks}>
            <Link className={classes.active} to="./terms.html">
              Terms And Conditions
            </Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <hr />
          <br />
          <h1 className="name">Terms of Use</h1>

          <p>
            These are the terms of use binding all Visitors and Users of
            TCN-CCG-DT from the time of first visit or use till exit or
            termination. By accessing TCN-CCG-DT, you agree to be bound by all the
            terms of use alongside the{" "}
            <Link to="/privacy" className={classes.link}>
              Privacy Policy
            </Link>{" "}
            and be responsible for compliance or consequences for non-compliance
            with any of these terms/rules. If you are not comfortable with or do
            not agree with any of the terms stated below, desist from accessing
            or using our services.
          </p>
          <p>
            Our service is provided on an “as is” basis. We will not waive any
            of our rights if you breach the terms and can take necessary actions
            as we deem fit.
          </p>
          <p>
            For the purpose of this agreement, ‘we,’ ‘our’, ‘ours,’ and ‘us’will
            refer to TCN-CCG-DT, while ‘you’ ‘and ‘yours’will refer to the Visitors
            and Users.
          </p>
          <ol className={classes.i} type="I">
            <li>
              <h2 className="name"> Our Services:</h2>
              <ol type="a">
                <li>
                  TCN-CCG-DT is an avenue to showcase your skills and host your
                  Curriculum Vitae (CV). You can also search for people with
                  different skills to access their details via our platform. We
                  are responsible for enabling you to do the above.
                </li>
                <li>
                  We are not responsible for whatever happens outside our
                  platform including your discussions, relationships, or
                  transactions with people you meet on the platform.
                </li>
              </ol>
            </li>
            <li>
              <h2 className="name"> Content Ownership: </h2>
              <p>
                All content and information provided by you remain yours; we
                will not claim ownership in any way.
              </p>
            </li>
            <li>
              <h2 className="name"> Your Responsibilities:</h2>
              <p>By using TCN-CCG-DT, you agree:</p>
              <ol type="a">
                <li>That you are at least eighteen (18) years old.</li>
                <li>
                  To provide or upload content and information that belongs
                  exclusively to you and do not infringe on anyone’s rights.
                </li>
                <li>
                  To not provide or upload illegal, pornographic, racist,
                  violence-instigating, graphic, offensive, insulting, obscene,
                  or otherwise inappropriate content.
                </li>
                <li>That you are not impersonating anyone.</li>
                <li>
                  That you are responsible for all uploaded information,
                  including its authenticity, appropriateness, and legality.
                </li>
                <li>
                  That you are responsible for every activity that takes place
                  on or via your account.
                </li>
                <li>
                  To grant us the rights to store, translate, modify, display,
                  reproduce, and distribute your content in any media format and
                  through any channel.
                </li>
                <li>
                  That you are not entitled to remuneration of any form from
                  TCN-CCG-DT.
                </li>
              </ol>
            </li>
            <li>
              <h2 className="name"> Violation:</h2>
              <ol type="a">
                <li>
                  If we discover or get reports that you have flouted any of our
                  rules, we reserve the right to remove or take down your
                  account without any prior notice after proper investigation
                  and confirmation.
                </li>
                <li>
                  If you discover that any TCN-CCG-DT user violates any of the stated
                  rules, you can report by sending an email to{" "}
                  <a href="mailto:sodiq.akinjobi@gmail.com" className={classes.link}>
                    TCN-CCG-DT
                  </a>
                </li>
              </ol>
            </li>
            <li>
              <h2 className="name"> Intellectual Property:</h2>
              <ol type="a">
                <li>
                  As a User, you are granted a limited, non-exclusive,
                  non-transferrable, and revocable right to use the service
                  based on the terms listed above.
                </li>
                <li>
                  All content on TCN-CCG-DT and our service is covered by trademarks,
                  database, copyright, and other intellectual property rights
                  and laws. You are not allowed to use our name and trademark
                  with any product or service hat is not affiliated with us,
                  unless with prior written consent from us.
                </li>
              </ol>
            </li>
            <li>
              <h2 className="name"> Termination:</h2>
              <ol type="a">
                <li>
                  You can cancel your TCN-CCG-DT account whenever you wish. Once you
                  cancel your account, you would no longer have access to it or
                  the information on it. We are not responsible for providing
                  you with access to your content once you cancel.
                </li>
              </ol>
            </li>
            <li>
              <h2 className="name"> Amendment of Terms:</h2>
              <ol type="a">
                <li>
                  We may make changes to these terms whenever, you are
                  responsible for checking whether the terms have been amended
                  or updated from time to time.
                </li>
                <li>
                  In case of major changes that may directly affect you, we will
                  take the necessary steps to notify you.
                </li>
              </ol>
            </li>
            <li>
              <h2 className="name"> Contact Us:</h2>
              <ol type="a">
                <li>
                  In case of further questions regarding our services and terms,
                  you can reach us via{" "}
                  <a href="mailto:sodiq.akinjobi@gmail.com" className={classes.link}>
                    TCN-CCG-DT
                  </a>
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TnC;
