import { Accordion } from "react-bootstrap";

function SideNavbar({ categories }) {
  return (
    <Accordion id="categories">
      {categories.map((category, idx) => (
        <Accordion.Item eventKey={idx} key={idx}>
          <Accordion.Header>{category.name}</Accordion.Header>
          <Accordion.Body className="d-flex flex-column">
            <a href="...">All {category.name}</a>
            {category.childCategories.map((child, idx) => (
              <a href="..." key={idx}>
                {child.name}
              </a>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default SideNavbar;
