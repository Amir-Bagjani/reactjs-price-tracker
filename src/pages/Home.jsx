import { useEffect, useState } from "react";
import {
  Badge,
  Col,
  Container,
  Dropdown,
  ListGroup,
  ListGroupItem,
  Row,
  DropdownButton,
  ButtonGroup,
  Modal,
  Button,
} from "react-bootstrap";
import { useFetch } from "../hooks/useFetch1";
import { Link, useHistory } from "react-router-dom";
import SkeletonHome from "../skeletons/SkeletonHome";

export default function Home() {
  //modal
  const [show, setShow] = useState(false);

  const history = useHistory();
  const { products, isPending, error } = useFetch(
    `https://laptopprice-api.herokuapp.com`
  );
  const [brand, setBrand] = useState(null);

  const handleClick = (path) => {
    history.push(`/products/${path}`);
  };

  //set modal when error exist
  useEffect(()=>{
    if(error) setShow(true)
  }, [error])


  //find unique brand and count how many for each of it
  useEffect(() => {
    if (products) {
      const b = products.map((i) => i.brand);
      const unique = [...new Set(b)];
      setBrand(
        unique.map((value) => [value, b.filter((str) => str === value).length])
      );
    }
  }, [products]);

  return (
    <>
      {brand && (
        <>
          <Container className="mb-4">
            <Row className="justify-content-center align-items-center bg-dark py-3 border rounded ">
              <Col className="text-center pt-1">
                <h1 className="text-light h5 ">
                  برند تمامی محصولات یافت شده ({brand.length})
                </h1>
              </Col>
              <Col className="text-center pt-1">
                <div>
                  <DropdownButton
                    as={ButtonGroup}
                    align={{ lg: "end" }}
                    title="تمامی برند محصولات"
                    id="dropdown-menu-align-responsive-1"
                  >
                    {brand.map((item, i) => (
                      <Dropdown.Item
                        key={i}
                        eventKey={i}
                        onClick={() => handleClick(item[0])}
                      >
                        {item[0]}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="px-0">
            <ListGroupItem as="ol" className="border-0 bg-transparent px-0">
              {brand.map((item, i) => (
                <Link to={`/products/${item[0]}`} key={item[0]}>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-center mb-1 "
                  >
                    <div className="fw-bold text-primary">{i + 1 + `-`}</div>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold py-3"> برند {item[0]}</div>
                    </div>
                    <Badge variant="primary" pill className="pt-2">
                      {item[1]}
                    </Badge>
                  </ListGroup.Item>
                </Link>
              ))}
            </ListGroupItem>
          </Container>
        </>
      )}
      {isPending && [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13].map((i) => <SkeletonHome key={i} />)}
      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>مشکل در ارتباط با سرور</Modal.Title>
        </Modal.Header>
        <Modal.Body>لطفا از فیلتر شکن استفاده کنید</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>setShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
