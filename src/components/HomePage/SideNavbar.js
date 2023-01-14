import { Accordion } from "react-bootstrap";
import { useNavigate } from "react-router";

function SideNavbar({ categories, setCategoryName }) {
  const navigate = useNavigate();

  async function showCategory(categoryID, parent = false) {
    if (parent) navigate(`/parentCat/${categoryID}?page=1`);
    else navigate(`/cat/${categoryID}?page=1`);
  }

  return (
    <Accordion id="categories">
      {categories.map((category, idx) => (
        <Accordion.Item eventKey={idx} key={idx}>
          <Accordion.Header>{category.name}</Accordion.Header>
          <Accordion.Body className="d-flex flex-column">
            <button
              className="category-btn"
              onClick={(e) => showCategory(category.id, true)}
            >
              All {category.name}
            </button>
            {category.childCategories.map((child, idx) => (
              <button
                className="category-btn"
                key={idx}
                onClick={(e) => {
                  showCategory(child.id);
                  setCategoryName(category.name);
                }}
              >
                {child.name}
              </button>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default SideNavbar;
