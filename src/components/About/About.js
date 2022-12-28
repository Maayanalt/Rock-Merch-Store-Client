import { Card } from "react-bootstrap";
import "./About.css";

function About() {
  return (
    <Card id="about">
      <Card.Header as="h5">
        ABOUT US - THE BIRTH OF THE LOUDEST STORE IN THE MALL
      </Card.Header>
      <Card.Body className="p-4">
        <p>
          If you're looking for the latest in metal merchandise, we've got you
          covered. At Rock Merch, you'll find all of the hottest trends in metal
          merchandise, including t-shirts, keychains, patches and lots of other
          cool stuff. Whether you're looking for grunge, hard rock, grindcore or
          heavy metal merchandise, you've come to the right place.
        </p>
        <p>
          Rock Merch is your one-stop-shop for 100% officially licensed band
          merchandise from today's most popular bands, like Ghost, Slayer, Iron
          Maiden and more. With so much band merch to choose from, this is the
          perfect time to add new stuff to your collection. What's more, we've
          even got media music merchandise like CDs, DVDs, and vinyl records to
          rock out to.
        </p>
        <p>
          Our heavy metal apparel comes in a variety of sizes for men, women,
          and children. We've also got baby bibs and bodysuits, so even the
          youngest music fans are covered. You're sure to find lots of great
          stuff when you check out the Rock Merch website. We've made it easy to
          navigate the pages so that you can locate specific items by sorting
          the selections by band, music genre, or item type.
        </p>
      </Card.Body>
    </Card>
  );
}

export default About;
