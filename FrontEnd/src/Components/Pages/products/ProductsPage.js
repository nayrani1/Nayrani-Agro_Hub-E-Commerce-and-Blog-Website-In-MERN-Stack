import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Footer from "../../layouts/main/Footer";
import ScrollToTopButton from "../../layouts/Features/backToTop";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearErrors,
  FetchProducts,
} from "../../../Redux/Actions/ProductAction";
import Loader from "../../layouts/Features/Loader";
import ProductCard from "../../layouts/main/ProductCard";
import Pagination from "react-js-pagination";
import { ToastContainer, toast } from "react-toastify";
import Search from "../../layouts/main/search";
import { Fade } from "react-awesome-reveal";
import Title from "../../layouts/Features/CustonTitle";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/main/Header";

const ProductsPage = () => {
  const navigate = useNavigate();
  const toastAlert = (error) => toast.error(error);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([1, 1000000000]);
  const dispatch = useDispatch();
  const { loading, products, error, totalProducts, resPerPage } = useSelector(
    (state) => state.Products
  );
  const [keyword] = useState("");
  useEffect(() => {
    dispatch(FetchProducts(keyword, currentPage, category, price));
    if (error) {
      toastAlert(error);
      dispatch(ClearErrors());
    }
    if (error === "No Product Found") {
      navigate("/product/not-found");
    }
  }, [dispatch, navigate, currentPage, keyword, category, price, error]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = totalProducts / resPerPage;
  const totalPage = Math.round(totalPages);
  const categories = [
    "Food",
    "Vagetables",
    "Fruits",
    "Grains",
    "Seeds",
    "Dairy",
    "Drinks",
  ];
  const priceRange = [
    {
      min: 0,
      max: 10,
    },
    {
      min: 10,
      max: 20,
    },
    {
      min: 20,
      max: 5000,
    },
  ];
  return (
    <div>
      <Title
        title={"Best Organic Products in the Store, Buy and Enjoy Healthy Life"}
      />
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <ToastContainer position="top-left" theme="colored" />
          <Header />
          <Container fluid className="Products m-0">
            <Row className="product-page-top m-0">
              <Col md={12}>
                <h1>Shop</h1>
                <br />
                <h5>Home / Shop</h5>
              </Col>
            </Row>
            <Row className="row-line"></Row>
            <Row>
              <Col md={9} className="products-column">
                <Row className="products-top-row">
                  <p>
                    view page {currentPage} of {totalPage}
                  </p>
                </Row>
                {products &&
                  products.map((product) => (
                    <Fade cascade damping={0.8}>
                      <ProductCard key={product._id} product={product} />
                    </Fade>
                  ))}
                <Row className="pagination-row">
                  {resPerPage <= totalProducts && (
                    <div className="d-flex justify-content-center mt-2">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={totalProducts}
                        onChange={setCurrentPageNo}
                        nextPageText={"⟩"}
                        prevPageText={"⟨"}
                        firstPageText={"«"}
                        lastPageText={"»"}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    </div>
                  )}
                </Row>
              </Col>
              <Col md={3} className="side-Data">
                <img className="seller-img" src="./img/user.png" alt="user" />
                <p>
                  We do great work in our business so that you can always see
                  the quality of our work.
                </p>
                <br />
                <br />
                <Search
                  searchForm={""}
                  searchBox={"side-data-search"}
                  searchBtn={"side-data-search-btn"}
                  btnData={<FaSearch />}
                />
                <div className="side-data-line"></div>
                <br />
                <br />
                <h4>Product Categories</h4>
                <div className="side-data-line-low"></div>
                <ul className="filter-keywords">
                  {categories.map((category) => (
                    <li
                      style={{ cursor: "pointer", listStyleType: "square" }}
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <div className="hidden-line"></div>
                <h4>Price Range</h4>
                <div className="side-data-line-low"></div>
                <div className="price-range">
                  <ul>
                    {priceRange.map((price) => (
                      <li
                        key={price.min}
                        style={{
                          cursor: "pointer",
                          listStyleType: "square",
                        }}
                        onClick={() => setPrice([price.min, price.max])}
                      >
                        {price.min} - {price.max}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="side-data-line-low"></div>
                <h4>Advertizing spot</h4>
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1706033676/AgroHub/SiteAssets/image-22_ngenbo.jpg"
                  width="100%"
                  height={"200px"}
                  alt=""
                />
              </Col>
            </Row>
            <Row className="row-line"></Row>
          </Container>
          <Footer />
          <ScrollToTopButton />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
