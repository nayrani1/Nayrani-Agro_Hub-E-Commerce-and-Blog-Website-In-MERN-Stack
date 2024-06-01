import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FetchProducts,
} from "../../../Redux/Actions/ProductAction";
import Loader from "../../layouts/Features/Loader";
import { useParams } from "react-router-dom";
import Header from "../../layouts/main/Header";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import Footer from "../../layouts/main/Footer";
import ScrollToTopButton from "../../layouts/Features/backToTop";
import ProductCard from "../../layouts/main/ProductCard";
import Pagination from "react-js-pagination";
import Search from "../../layouts/main/search";
import "../../layouts/css/AnimatedBg.scss";
import Title from "../../layouts/Features/CustonTitle";

const SearchedProducts = () => {
  // const navigate = useNavigate();
  const goBack = () => {
    window.location.href = "/products";
  };
  const tostAlert = (error) => toast.error(error);
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000000000]);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { loading, products, error, totalProducts, resPerPage } = useSelector(
    (state) => state.Products
  );
  const params = useParams();
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      tostAlert(error);
    }
    dispatch(FetchProducts(keyword, currentPage, category, price));
  }, [dispatch, currentPage, keyword, category, price, error]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = products && products.length / resPerPage;
  const totalPage = Math.round(totalPages);
  const categories = [
    "Food",
    "Vagetables",
    "Fruits",
    "Grains",
    "Seeds",
    "Dairy",
    "LiveStock",
    "Farming Instruments",
  ];
  const priceRange = [
    {
      min: 0,
      max: 1000,
    },
    {
      min: 1000,
      max: 5000,
    },
    {
      min: 5000,
      max: 5000000,
    },
  ];
  return (
    <div>
      <ToastContainer position="top-left" theme="colored" />
      <Title
        title={"Best Organic Products in the Store, Buy and Enjoy Healthy Life"}
      />
      {loading ? (
        <Loader />
      ) : (
        <div>
          {error === "No Product Found" ? (
            <div>
              <div className="animation-container">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="vh-100 d-flex align-items-center justify-content-center">
                  <Row>
                    <Col>
                      <div className="text-center">
                        <h1>No Product Found !</h1>
                        <p style={{ color: "red" }}>
                          Related to your search....
                        </p>
                        <h4 style={{ color: "#34495E" }}>
                          Search More Products
                        </h4>
                        <Search
                          searchForm={"search-form"}
                          searchBox={"search-box"}
                          searchBtn={"search-button"}
                          btnData={"Search"}
                        />
                        <h2 style={{ color: "green" }}>Or</h2>
                        <Button className="view-details" onClick={goBack}>
                          Go Back
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Header />
              <Container fluid className="Products m-0">
                <Row className="product-page-top m-0">
                  <Col md={12}>
                    <h1>Search Result</h1>
                    <br />
                    <h5> Searched Products</h5>
                  </Col>
                </Row>
                <Row>
                  <Col md={9} className="products-column mt-4">
                    <Row className="products-top-row">
                      <p>
                        view page {currentPage} of {totalPage}
                      </p>
                    </Row>
                    {products &&
                      products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    <Row className="pagination-row">
                      {totalProducts > resPerPage ? (
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
                      ) : (
                        ""
                      )}
                    </Row>
                  </Col>
                  <Col md={3} className="side-Data mt-4">
                    <img
                      className="seller-img"
                      src="https://res.cloudinary.com/djljb8aby/image/upload/v1708594645/AgroHub/Users/user_v4mann.png"
                      alt="user"
                    />
                    <p>
                      We do great work in our business so that you can always
                      see the quality of our work.
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
                          key={category}
                          style={{ cursor: "pointer", listStyleType: "square" }}
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
              <ScrollToTopButton />
              <Footer />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchedProducts;
