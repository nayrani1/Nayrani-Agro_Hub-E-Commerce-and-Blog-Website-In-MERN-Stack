import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col } from "react-bootstrap";
import ScrollToTopButton from "../../layouts/Features/backToTop";
import "../../layouts/css/AnimatedBg.scss";
import * as Fa6Icons from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../layouts/main/Header";
import Footer from "../../layouts/main/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogAction } from "../../../Redux/Actions/blogAction";
import Loader from "../../layouts/Features/Loader";
import Title from "../../layouts/Features/CustonTitle";
import Pagination from "react-js-pagination";
import DOMPurify from "dompurify";

const BlogComponent = () => {
  const toastAlert = (error) => toast.error(error);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const backgroundImageUrl =
    'url("https://res.cloudinary.com/djljb8aby/image/upload/v1708800161/AgroHub/SiteAssets/dimitri-iakymuk-mCR10j_B6sM-unsplash_k2pjxk.jpg")';
  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const { Blogs, error, loading, totalBlogs, resPerPage } = useSelector(
    (state) => state.blog
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogAction(category, currentPage));
    if (error) {
      toastAlert(error);
    }
  }, [dispatch, category, currentPage, error]);

  const categories = [
    "Organic Farming",
    "Genetic Engineering",
    "Permaculture",
    "Conservation Agriculture",
    "Homobiotic Turnover",
    "Animal Breeding",
  ];
  const totalPages = totalBlogs / resPerPage;
  const totalPage = Math.round(totalPages);

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };
  return (
    <div>
      <ToastContainer position="top-left" theme="colored" />
      <Title title={"Blogs- Read Expert's Blogs About Daily life Farming"} />
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container fluid className="Products m-0">
            <Row
              className="product-page-top m-0"
              style={{ backgroundImage: backgroundImageUrl }}
            >
              <Col md={12}>
                <h1>Blogs</h1>
                <br />
                <h5> Home / Blogs</h5>
              </Col>
            </Row>
            <Row className="blog-container">
              <Col md={9} className=" mt-4 ">
                <Row className="products-top-row m-0 p-0">
                  <p>
                    view page {currentPage} of {totalPage}
                  </p>
                </Row>
                <Row>
                  {Blogs &&
                    Blogs.map((blog) => (
                      <div className="blog-card">
                        <div className="blog-img">
                          <img src={blog.image.url} alt="" />
                        </div>
                        <div className="blog-card-content">
                          <p style={{ color: "#292d30" }}>
                            {new Intl.DateTimeFormat("en", {
                              month: "long",
                            }).format(new Date(blog.createdAt))}{" "}
                            {new Date(blog.createdAt).getDate()}{" "}
                            {new Date(blog.createdAt).getFullYear()} | by{" "}
                            {blog.user.name} | {blog.comments.length}{" "}
                            <Fa6Icons.FaRegMessage />
                          </p>
                          <h2>
                            <Link className="blog-title">{blog.title}</Link>
                          </h2>
                          <div>
                            <div
                              dangerouslySetInnerHTML={createMarkup(
                                blog.shortDescription
                              )}
                            />
                          </div>
                          <Link
                            to={`/blogs/read/${blog._id}`}
                            className="blog-read-more"
                          >
                            Read More &#x2192;
                          </Link>
                        </div>
                      </div>
                    ))}
                </Row>
                <Row className="pagination-row">
                  <div className="d-flex justify-content-center mt-2">
                    {resPerPage <= totalBlogs && (
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={totalBlogs}
                        onChange={setCurrentPageNo}
                        nextPageText={"⟩"}
                        prevPageText={"⟨"}
                        firstPageText={"«"}
                        lastPageText={"»"}
                        itemClass="page-item"
                        linkClass="page-link"
                      />
                    )}
                  </div>
                </Row>
              </Col>
              <Col md={3} className="side-Data sticky-col">
                <img
                  className="seller-img"
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1708594645/AgroHub/Users/user_v4mann.png"
                  alt="user"
                />
                <p>
                  We do great work in our business so that you can always see
                  the quality of our work.
                </p>
                <br />
                <div className="side-data-line"></div>
                <br />
                <h4>Categories</h4>
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
                <h4>Tags</h4>
                <div className="side-data-line-low"></div>
                <div className="price-range">
                  <div className="Blogs-Tags-section mt-2 mb-2">
                    <div>Live Stock</div>
                    <div>Plants</div>
                    <div>Animal Breeding</div>
                    <div>Farming</div>
                  </div>
                </div>
                <p
                  className="view-details"
                  onClick={() => navigate("/blog/write")}
                >
                  Write a Blog
                </p>
                <div className="side-data-line-low"></div>
                <h4>Advertizing spot</h4>
                <img
                  src="https://res.cloudinary.com/djljb8aby/image/upload/v1706033676/AgroHub/SiteAssets/image-22_ngenbo.jpg"
                  width="100%"
                  height={"200px"}
                  alt=""
                />
                <br />
              </Col>
            </Row>
            <Row className="row-line"></Row>
          </Container>
          <ScrollToTopButton />
          <Footer />
        </>
      )}
    </div>
  );
};

export default BlogComponent;
