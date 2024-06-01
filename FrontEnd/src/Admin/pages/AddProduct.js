import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import "../Style.css";
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewProductAction, ClearErrors } from '../../Redux/Actions/ProductAction';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ADD_PRODUCT_RESET } from '../../Redux/Constants/ProductsConstant';
import { MDBCol, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import ReactQuill from 'react-quill';

const AddProduct = () => {
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [stock, setStock] = useState();
  const [seller, setSeller] = useState();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [shortDescription, setShortDescription] = useState();
  const [longDescription, setLongDescription] = useState();
  const [tags, setTags] = useState();
  const categories = [
    "Food",
    "Vagetables",
    "Fruits",
    "Grains",
    "Seeds",
    "Dairy",
    "LiveStock",
    "Farming Instruments",
    "Drinks"
  ]
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.addProduct)
  useEffect(() => {
    if (error) {
      toastAlert(error);
      dispatch(ClearErrors());
    }
    if (message) {
      toastSuccess(message);
      dispatch({ type: ADD_PRODUCT_RESET });
    }
  }, [dispatch, error, message])

  const addProductHandller = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);
    formData.set("shortDescription", shortDescription);
    formData.set("longDescription", longDescription);
    formData.set("tags", tags)
    images.forEach(image => {
      formData.append("images", image)
    })
    dispatch(AddNewProductAction(formData));
  }

  const changeDataHandller = (e) => {
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(oldArray => [...oldArray, reader.result])
          setImagesPreview(oldArray => [...oldArray, reader.result])
        }
      }
      reader.readAsDataURL(file);
    })
  }

  return (
    <div className="Admin-container">
      <ToastContainer
        position="top-left"
        theme="colored"
      />
      <div><Sidebar /></div>
      <div className="Admin-main">
        <MDBRow className="justify-content-center align-items-center"
          style={{ boxShadow: "inset 0 0 5px black" }}
        >
          <MDBCol size="12">
            <Container>
              <Row className="d-flex justify-content-center align-items-center">
              </Row>
              <Row className="d-flex justify-content-center align-items-center">
                <Col md={8} sm={10} xs={11}>
                  <Form className="shipping-info-form" onSubmit={addProductHandller}>
                    <MDBTypography
                      tag="h2"
                      className="fw-bold  text-muted cart-item-heading text-center"
                      style={{ textShadow: "1px 1px 0px #ffc107" }}
                    >
                      Products Details
                    </MDBTypography>
                    <div className='grid-form-input'>
                      <Form.Group style={{ width: "49%", minWidth: "160px" }}>
                        <Form.Control
                          type="text"
                          id="name"
                          name="name"
                          required
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Product Name"
                          style={{ boxShadow: "inset 0 0 0 1px #00bf63" }}
                        />
                      </Form.Group>
                      <Form.Group style={{ width: "49%", minWidth: "160px" }}>
                        <Form.Control
                          type="number"
                          id="price"
                          name="price"
                          placeholder="Product Price"
                          min={1}
                          step="any"
                          required
                          onChange={(e) => setPrice(e.target.value)}
                          style={{ boxShadow: "inset 0 0 0 1px #00bf63" }}

                        />
                      </Form.Group>
                    </div>
                    <div className='line-brake'></div>
                    <div className='grid-form-input'>
                      <Form.Group style={{ width: "49%", minWidth: "160px" }}>
                        <Form.Select aria-label="Default select example"
                          style={{ border: '1.5px solid #00bf63', borderRadius: "7px" }}
                          onChange={(e) => setCategory(e.target.value)}
                          required>
                          <option>Chose Category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group style={{ width: "49%", minWidth: "160px" }}>
                        <Form.Control
                          type="text"
                          id="seller"
                          name="seller"
                          placeholder="Seller Name"
                          required
                          onChange={(e) => setSeller(e.target.value)}
                          style={{ boxShadow: "inset 0 0 0 1px #00bf63" }}

                        />
                      </Form.Group>
                    </div>
                    <div className='line-brake'></div>
                    <div className='grid-form-input'>
                      <div style={{ width: "49%", minWidth: "160px" }}>
                        <Form.Group >
                          <Form.Control
                            type="number"
                            id="stock"
                            name="stock"
                            min={0}
                            placeholder="Product stock"
                            required
                            onChange={(e) => setStock(e.target.value)}
                            style={{ boxShadow: "inset 0 0 0 1px #00bf63" }}
                          />
                        </Form.Group>
                      </div>
                      <div className="d-flex align-items-center" style={{ width: "49%", minWidth: "160px" }}>
                        <div className="custom-file">
                          <input
                            type="file"
                            name="images"
                            className="custom-file-input"
                            id="customFile"
                            accept="images/*"
                            required
                            multiple
                            onChange={changeDataHandller}
                          />
                          <label className="custom-file-label" htmlFor="customFile">
                            Select Images
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='line-brake'></div>
                    <div className='d-flex justify-content-flex-start flex-wrap' style={{ width: "100%", overflow: "hidden" }}>
                      {imagesPreview.map((image, index) => (
                        <div key={index} className='m-1'>
                          <img src={image} alt="" width={110} height={110} />
                        </div>
                      ))}
                    </div>
                    <div className='line-brake'></div>
                    <Form.Group>
                      <Form.Control
                        as="textarea" rows={2}
                        id="tags"
                        name="tags"
                        placeholder="Add related tags...."
                        required
                        onChange={(e) => setTags(e.target.value)}
                        style={{ boxShadow: "inset 0 0 0 1px #00bf63" }}

                      />
                    </Form.Group>
                    <div className='line-brake'></div>
                    <Form.Group>
                    <Form.Label>
                      Short Description
                    </Form.Label>
                      <ReactQuill
                        value={shortDescription}
                        onChange={setShortDescription}
                        placeholder='Enter Short Description....'
                        modules={{
                          toolbar: [
                            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                            [{ size: [] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['link', 'image', 'video'],
                            ['clean']
                          ],
                        }}
                        formats={[
                          'header', 'font', 'size',
                          'bold', 'italic', 'underline', 'strike', 'blockquote',
                          'list', 'bullet',
                          'link', 'image', 'video'
                        ]}
                      />
                    </Form.Group>
                    <div className='line-brake'></div>
                    <Form.Group>
                    <Form.Label>
                      Long Description
                    </Form.Label>
                    <ReactQuill
                      value={longDescription}
                      onChange={setLongDescription}
                      placeholder='Enter Full Details....'
                      modules={{
                        toolbar: [
                          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                          [{ size: [] }],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          ['link', 'image', 'video'],
                          ['clean']
                        ],
                      }}
                      formats={[
                        'header', 'font', 'size',
                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                        'list', 'bullet',
                        'link', 'image', 'video'
                      ]}
                    />
                    </Form.Group>
                    <button type="submit" className="btn btn-warning mt-3" disabled={loading} style={{ width: "100%" }}>
                      Save & Continue
                    </button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default AddProduct;