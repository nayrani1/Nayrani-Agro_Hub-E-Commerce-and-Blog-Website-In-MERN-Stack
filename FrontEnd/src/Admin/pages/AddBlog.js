import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import "../Style.css";
import { MDBCol, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddBlogAction, clearErrors } from '../../Redux/Actions/blogAction';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MDBCard, MDBCardBody, MDBCardHeader } from 'mdbreact';

const AddBlog = () => {
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [shortDescription, setShortDescription] = useState('');
  const [article, setArticle] = useState('');


  const categories = [
    "Organic Farming",
    "Genetic Engineering",
    "Permaculture",
    "Conservation Agriculture",
    "Homobiotic Turnover",
    "Animal Breeding",
  ]
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector(state => state.addBlog);
  const handleSubmitBlog = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('shortDescription', shortDescription);
    formData.set('title', title);
    formData.set('category', category);
    formData.set('article', article);
    formData.set('image', image);
    images.forEach(image => {
      formData.append("images", image)
    })
    dispatch(AddBlogAction(formData))
  };

  const changeDataHandller = (e) => {
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages(oldArray => [...oldArray, reader.result]);
          setImagesPreview(oldArray => [...oldArray, reader.result]);
        }
      }
      reader.readAsDataURL(file);
    })
  }
  // convert image to base64 encoded
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleChangeData = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        // Now base64Image contains the base64-encoded image
        console.log(base64Image);
        setImage(base64Image);
        // You can now send base64Image in your request body
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      toastAlert(error);
      dispatch(clearErrors());
    }
    if (message) {
      toastSuccess(message);
      dispatch(clearErrors());
    }
  }, [dispatch, error, message])
  return (
    <div className="Admin-container">
      <div><Sidebar /></div>
      <div className="Admin-main">
        <ToastContainer
          position="top-left"
          theme="colored"
        />
        <MDBRow>
          <MDBCol>
            <MDBCard >
              <MDBCardHeader>
                <MDBTypography
                  tag="h4"
                  className="mb-0 text-center"
                  style={{ textShadow: "1px 1px 0px #00e476" }}
                >
                  Blog Details
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                <Form onSubmit={handleSubmitBlog}>
                  <div className='grid-form-input'>
                  <Form.Group style={{ width: "49%", minWidth: "160px" }}>
                      <Form.Control
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Blog Title Here....."
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group style={{ width: "49%", minWidth: "160px" }}>
                      <Form.Select aria-label="Default select example"
                        onChange={(e) => setCategory(e.target.value)}
                        required>
                        <option>Chose Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='line-brake'></div>
                  <div className='grid-form-input'>
                    <div className="d-flex align-items-center" style={{ width: "49%", minWidth: "160px" }}>
                      <div className="custom-file">
                        <input
                          type="file"
                          name="image"
                          className="custom-file-input"
                          id="customFile"
                          accept="images/*"
                          onChange={handleChangeData}
                        />
                        <label className="custom-file-label" htmlFor="customFile">
                          Choose Banner Image
                        </label>
                      </div>
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
                          Choose More Images
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='line-brake'></div>
                  <div className='d-flex justify-content-flex-start flex-wrap' style={{ width: "100%", overflow: "hidden" }}>
                    {image ?
                      <div className='m-1'>
                        <img src={image} alt="" width={120} height={120} />
                      </div>
                      : null
                    }
                    {imagesPreview.map((image, index) => (
                      <div key={index} className='m-1'>
                        <img src={image} alt="" width={120} height={120} />
                      </div>
                    ))}
                  </div>
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
                      Full Article
                    </Form.Label>
                    <ReactQuill
                      value={article}
                      onChange={setArticle}
                      placeholder='Enter Your Article....'
                      minHeight={200}
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
                  <button type="submit" className="btn btn-warning mt-3" style={{ width: "100%" }} disabled={loading}>
                    Save & Continue
                  </button>
                </Form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default AddBlog;