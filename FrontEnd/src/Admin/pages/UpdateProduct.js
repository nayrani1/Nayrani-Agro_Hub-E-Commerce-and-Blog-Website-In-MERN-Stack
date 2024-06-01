import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import "../Style.css";
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {ClearErrors, UpdateProductAction } from '../../Redux/Actions/ProductAction';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProduct = ({product}) => {
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [stock, setStock] = useState(product.stock);
  const [seller, setSeller] = useState(product.seller);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [shortDescription, setShortDescription] = useState(product.shortDescription);
  const [longDescription, setLongDescription] = useState(product.longDescription);
  const [tags, setTags]= useState(product.tags);
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
  useEffect(() => {
    if (product && product.images) {
      setImagesPreview(product.images.map(image => image.url));
      setImages(product.images.map(image => image.url));
    }
  }, [product]);
  const dispatch = useDispatch();
  const {loading, error, message}= useSelector(state=> state.addProduct)
  useEffect(()=>{
    if(error){
      toastAlert(error);
      dispatch(ClearErrors());
    }
  if(message){
    toastSuccess(message);
    window.location.reload();
  }
  },[dispatch, error, message])

 const id = product._id;
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
    dispatch(UpdateProductAction(id, formData));
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
        <Container>
          <Row className="d-flex justify-content-center align-items-center">
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={8} sm={10} xs={11}>
              <Form className="shipping-info-form" onSubmit={addProductHandller}>
                <p className="text-center mt-1 mb-1" style={{ fontSize: "30px", fontFamily: "serif" }}>Product Details</p>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    style={{ boxShadow: "inset 0 0 0 1px #ffc107" }}
                  />
                </Form.Group>
                <div className='line-brake'></div>
                <Form.Group>
                  <Form.Control
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    placeholder="Product Price"
                    min={1}
                    step="any"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ boxShadow: "inset 0 0 0 1px #ffc107" }}

                  />
                </Form.Group>
                <div className='line-brake'></div>
                <Form.Group>
                  <Form.Select aria-label="Default select example"
                  style={{ border:'1.5px solid #ffca2a', borderRadius:"7px"  }}
                  value={category}
                  onChange ={(e) => setCategory(e.target.value)}
                  required>
                    <option>Chose Category</option>
                    {categories.map(category => (
                       <option key={category} value={category}>{category}</option>
                    ))}  
                  </Form.Select>
                </Form.Group>
                <div className='line-brake'></div>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="seller"
                    name="seller"
                    placeholder="Seller Name"
                    value={seller}
                    required
                    onChange={(e) => setSeller(e.target.value)}
                    style={{ boxShadow: "inset 0 0 0 1px #ffc107" }}
                  />
                </Form.Group>
                <div className='line-brake'></div>
                <Form.Group>
                  <Form.Control
                    type="number"
                    id="stock"
                    name="stock"
                    value={stock}
                    min={0}
                    placeholder="Product stock"
                    required
                    onChange={(e) => setStock(e.target.value)}
                    style={{ boxShadow: "inset 0 0 0 1px #ffc107" }}

                  />
                </Form.Group>
                <div className='line-brake'></div>
                <div className="d-flex align-items-center">
                  <div className="custom-file">
                    <input
                      type="file"
                      name="images"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      multiple
                      onChange={changeDataHandller}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Select Images
                    </label>
                  </div>
                </div>
                <div className='line-brake'></div>
                <div className='d-flex justify-content-flex-start flex-wrap' style={{width:"100%", overflow:"hidden"}}>
                  {imagesPreview.map((image, index) => (
                    <div key={index} className='m-1'>
                      <img src={image} alt="" width={110} height={110}/>
                    </div>
                  ))}
                  </div>
                <div className='line-brake'></div>
                <Form.Group>
                  <Form.Control
                    as="textarea" rows={2}
                    id="shortDescription"
                    name="shortDescription"
                    value={shortDescription}
                    placeholder="Short Description..."
                    required
                    onChange={(e) => setShortDescription(e.target.value)}
                    style={{ boxShadow: "inset 0 0 0 1px #ffc107" }}

                  />
                </Form.Group>
                <div className='line-brake'></div>
                <Form.Group>
                  <Form.Control
                    as="textarea" rows={3}
                    id="longDescription"
                    name="longDescription"
                    value={longDescription}
                    placeholder="Long Description..."
                    required
                    onChange={(e) => setLongDescription(e.target.value)}
                    style={{ boxShadow: "inset 0 0 0 1px #ffc107" }}

                  />
                </Form.Group>
                <div className='line-brake'></div>
                <Form.Group>
                  <Form.Control
                    as="textarea" rows={4}
                    id="tags"
                    name="tags"
                    value={tags}
                    placeholder="Add related tags...."
                    required
                    onChange={(e) => setTags(e.target.value)}
                    style={{ boxShadow: "inset 0 0 0 1px #ffc107" }}

                  />
                </Form.Group>
                <button type="submit" className="btn btn-warning mt-3" disabled={loading} style={{ width: "100%" }}>
                  Save & Continue
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UpdateProduct;