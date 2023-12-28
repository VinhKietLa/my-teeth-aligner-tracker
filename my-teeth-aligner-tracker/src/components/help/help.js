import { Tabs, Tab, Accordion, Image, Container } from "react-bootstrap";
import "./help.css";
import image1 from "./cleaning-aligners.png";
import image2 from "./cleaning-aligners-1.png";
import image3 from "./family-aligners.png";
import useIsMobile from "../is-mobile/is-mobile";

function HelpSection() {
  const GeneralHelp = () => {
    return (
      <>
        <Container className="general-section">
          <h3>Basics for using your aligners</h3>
          <p>
            Everything you need to know about prepping, using and cleaning your
            aligners. Follow this routine for the best aligner hygiene - before,
            between, and after each wear.
          </p>
          <ul>
            <li>
              <strong>Start wearing each set at night.</strong> To reduce
              discomfort of wearing new aligners, we suggest starting each set
              at night before you go to bed.
            </li>

            <li>
              <strong>Cleaning up before you start.</strong> Always wash your
              hands, brush your teeth and floss before putting your aligners in.
            </li>
            <li>
              {" "}
              <strong>Use the aligner tool to take out your aligners. </strong>
              Pulling from your back teeth teeth, use one hook to pull your
              lower aligners up and off your teeth. For your upper aligners,
              pull down to remove. Nver pull outward, as it could damage your
              aligners.
            </li>
            <li>
              <strong>Don't throw out your old aligners.</strong> Keep all your
              previously worn aligners in a safe, sanitary place, just in case
              you misplace one and need a quick replacement.
            </li>
            <li>
              {" "}
              <strong>Clean your aligners.</strong> Before each use, clean your
              aligners with warm water and gentle liquid soap - no toothpaste.
            </li>
            <li>
              Make sure to wear your aligners all day and night as prescribed.
            </li>

            <li>Only pull outone set of aligners at a time.</li>
          </ul>
          <Image src={image1} fluid></Image>
        </Container>
      </>
    );
  };

  const CleaningInstructions = () => {
    return (
      <>
        <Container className="cleaning-section">
          <h3>How to Clean Your Aligners</h3>
          <p>A few ways to get your clear aligners clean again.</p>
          <h4>Soak in antibacterial soap and water</h4>
          <p>
            Add a small amount of soap to a bowl with warm water, mix together
            and leave your clear aligners in for 20-30 minutes. Rinse with cold
            water before putting them back on.
          </p>
          <h4>Baking soda and water</h4>
          <p>
            Add a small amount of baking soda to a bowl with warm water, mix
            together and leave your clear aligners in for 30-60 minutes. Rinse
            with cold water before putting them back on.
          </p>
          <h4>White vinegar and water</h4>
          <p>
            Add one tablespoon of white vinegar to a bowl with warm water, mix
            together and leave your clear aligners in for 15-20 minutes. Rinse
            your aligners thoroughly before use with cold water and leave them
            to dry before putting them back on.
          </p>

          <Image src={image2} fluid></Image>
        </Container>
      </>
    );
  };
  const DosAndDonts = () => {
    return (
      <>
        <Container className="do-dont-section">
          <h3>Do's</h3>
          <ul>
            <li>
              Protect your aligners from sunlight, hot cars, toaster ovens, hair
              dryers, space heaters, blowtorches, supernovas and other sources
              of excessive heat.
            </li>
            <li>
              Store your aligners in your case when you're not wearing them to
              keep them safely away from pets or children.
            </li>
            <li>
              Get regular dental checkups and cleaning so your teeth and gum
              stay healthy. After all, you care enough about your smile to make
              it straight and bright, so make sure it's healthy too.
            </li>
            <li>
              Always wash your aligners before putting them in your mouth.
            </li>
            <li>Brush and floss your teeth before putting your aligners in.</li>
            <li>
              Always save your last set of aligners in the bag they came in just
              in case.
            </li>
          </ul>
          <h3>Don'ts</h3>
          <ul>
            <li>
              Don't use sharp objects to remove your aligners. That's what your
              aligner tool is used for.
            </li>
            <li>
              Don't wrap your aligners in a napkin or paper towel. Because next
              stop, the bin. Store them in their case instead.
            </li>
            <li>
              Don't use hot water to clean your aligners, and don't put them in
              the dishwasher. High temperatures will turn them into tiny useless
              plastic sculptures.
            </li>
            <li>
              Don't use denture cleaners on yur aligners or soak them in
              mouthwash, since this can damage and discolor them.
            </li>
            <li>
              Don't wear aligners while eating or drinking anything other than
              cool water.
            </li>
            <li>
              Don't bite your aligners into position. This can damage your
              aligners and your teeth.
            </li>
            <li>Don't smoke or chew gum while wearing your aligners.</li>
          </ul>
          <Image src={image3} fluid></Image>
        </Container>
      </>
    );
  };

  const FaqSection = () => {
    return (
      <Container className="faq-section">
        <h3>Frequently asked questions</h3>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What's with the lisp?</Accordion.Header>
            <Accordion.Body>
              Don't worry. It's common to have a slight lisp for the first few
              days after wearing a new aligner set. This will go away as you get
              more comfortable with the feeling of aligners in your mouth.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What about minor pressure?</Accordion.Header>
            <Accordion.Body>
              It's perfectly normal to experience some discomfort during your
              treatment. Try starting each set at night before going to bed.
              Before long, your mouth will get used to having the aligners in.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>What if they feel loose?</Accordion.Header>
            <Accordion.Body>
              First, double-check that you have the right set of aligners on.
              Because your teeth are shifting, it's natural for aligners to feel
              a bit looser the longer you wear them. This is normal and usually
              a good sign you'll be switching to a new set soon.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              Why do my teeth or bite feel different?
            </Accordion.Header>
            <Accordion.Body>
              As you complete your treatment plan, your teeth are gently being
              moved by each set of aligners you wear and might feel loose or
              different. This is normal.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              Can I eat and drink with my aligners on?
            </Accordion.Header>
            <Accordion.Body>
              Other than drinking water, if you're drinking or eating anything
              else you will need to remove your aligners and store them safely
              in its container.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>
              Can I smoke or vape with my aligners on?
            </Accordion.Header>
            <Accordion.Body>
              We would recommend not smoking or vaping whilst wearing your
              retainers as this can lead to damage to your aligners such as
              staining.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7">
            <Accordion.Header>
              I have a question that isn't listed?
            </Accordion.Header>
            <Accordion.Body>
              Feel free to send an email to{" "}
              <a href="mailto:kietla@live.co.uk">kietla@live.co.uk</a> and I'll
              help the best I can.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    );
  };
  return (
    <Container fluid={useIsMobile} className="help-main-content">
      <Tabs
        defaultActiveKey="generalHelp"
        id="uncontrolled-tab-example"
        className="mb-3 help-tabs"
      >
        <Tab eventKey="generalHelp" title="Basics for aligners usage">
          {<GeneralHelp />}
        </Tab>
        <Tab eventKey="cleaning" title="Cleaning Your Aligners">
          {<CleaningInstructions />}
        </Tab>
        <Tab eventKey="dosDonts" title="Do's and Don'ts">
          {<DosAndDonts />}
        </Tab>
        <Tab eventKey="faqs" title="FAQs">
          {<FaqSection />}
        </Tab>
      </Tabs>
    </Container>
  );
}

export default HelpSection;
