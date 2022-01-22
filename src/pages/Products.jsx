import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch1";
import SkeletonProduct from "../skeletons/SkeletonProduct";

export default function Products() {
  const { brand } = useParams();
  const { products, isPending } = useFetch(`https://laptopprice-api.herokuapp.com/${brand}`);
  //pagination and sorting
  const [sorted, setSorted] = useState(null);
  const [currentPage,setCurrentPage] = useState(1);
  const [pageNumber,setPageNumber] = useState(null);
  const dataPerPage = 20;

  //go to top of page
  useEffect(()=>{
    window.scrollTo(0,0)
  }, [currentPage])
  

  useEffect(() => {
    if (products) {
      const indexOfLastData = currentPage * dataPerPage;
      const indexOfFirstData = indexOfLastData - dataPerPage;
      setSorted([...products.slice(indexOfFirstData, indexOfLastData)]);

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(products.length / dataPerPage); i++) {
        pageNumbers.push(i)
      }
      setPageNumber(pageNumbers)
    }
  }, [products, currentPage]);


  //sort
  const handleClick = (query) => {
    if (query === "ex") {
      setSorted([...sorted.sort((a, b) => a.price - b.price)]);
    } else {
      setSorted([...sorted.sort((a, b) => b.price - a.price)]);
    }
  };


  return (
    <>
      {sorted && (
        <>
          <Container className="mb-1">
            <Row className="justify-content-center align-items-center bg-dark py-3 border rounded ">
              <Col className="text-center pt-1">
                <h1 className="text-light h5 "> برند {brand}</h1>
              </Col>
              {pageNumber.length>1 && <Col className="text-center text-light">صفحه فعلی: {currentPage}</Col>}
              <Col className="text-center pt-1 text-light">
                تعداد {products.length}
              </Col>
            </Row>
          </Container>

          <Container className="mb-2 text-center">
            <DropdownButton
              as={ButtonGroup}
              align={{ lg: "end" }}
              title="چیدمان بر اساس قیمت"
              id="dropdown-menu-align-responsive-1"
            >
              <Dropdown.Item eventKey={1} onClick={() => handleClick("ch")}>
                گرانترین
              </Dropdown.Item>
              <Dropdown.Item eventKey={2} onClick={() => handleClick("ex")}>
                ارزانترین
              </Dropdown.Item>
            </DropdownButton>
          </Container>

          <Container className="px-0">
            <Row className="justify-content-center">
              {sorted.map((item) => (
                <Col className="col-12 mb-1" key={item._id}>
                  <Card border="secondary">
                    <Card.Header className="text-muted fs-6 fw-lighter">
                      {item.postTitleFa}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title dir="ltr">{item.postTitleEn}</Card.Title>
                      <Card.Text dir="ltr">
                        {item.showingPrice}
                        تومان
                      </Card.Text>
                      <Row className="align-items-center">
                        <Col>
                          <a
                            className="btn btn-primary fs-6 fw-lighter"
                            target="_blank"
                            href={item.link}
                          >
                            مشاهده در سایت
                          </a>
                        </Col>
                        {item.rate !== 0 && (
                          <Col className="text-end">
                            {item.usersRated} {item.rate.toString()}
                            <i className="bi bi-star-fill ms-1 text-warning"></i>
                          </Col>
                        )}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row> 
          </Container>

          {pageNumber.length>1 &&
          <Container className="text-center pagination">
          
            <span onClick={(e)=>setCurrentPage(prev => prev === 1 ? 1 : prev - 1)}>قبلی</span>
            {pageNumber && pageNumber.map(item => (
              <span  key={item} id={item} onClick={(e)=>setCurrentPage(Number(e.target.id))}  >{item}</span>
            ))}
            <span onClick={(e)=>setCurrentPage(prev => prev === pageNumber.length ? currentPage : prev + 1)}>بعدی</span>
            
          </Container>}

        </>
      )}
      
      {isPending && [1, 2, 3, 4, 5, 6, 7].map((i) => <SkeletonProduct key={i} />)}
    </>
  );
}
