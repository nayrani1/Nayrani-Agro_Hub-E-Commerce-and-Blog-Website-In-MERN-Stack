import React, { useEffect, useState } from 'react'
import { MDBCol, MDBRow, MDBTypography } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateBlogAction, clearErrors } from '../../Redux/Actions/blogAction';
import Sidebar from '../components/Sidebar';


const UpdateBlog = ({ blog }) => {
  const toastAlert = (error) => toast.error(error);
  const toastSuccess = (success) => toast.success(success);
  const [name, setName] = useState(blog.name);
  const [title, setTitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [image, setImage] = useState(blog.image.url);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [shortDescription, setShortDescription] = useState(blog.shortDescription);
  const [article, setArticle] = useState(blog.article);
  useEffect(() => {
    if (blog && blog.images) {
      setImagesPreview(blog.images.map(image => image.url));
      setImages(blog.images.map(image => image.url));
    }
  }, [blog]);
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
  const id = blog._id;
  const handleSubmitBlog = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('name', name);
    formData.set('shortDescription', shortDescription);
    formData.set('title', title);
    formData.set('category', category);
    formData.set('article', article);
    formData.set('image', image);
    images.forEach(image => {
      formData.append("images", image)
    })
    dispatch(UpdateBlogAction(id, formData))
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
      window.location.reload();
    }
  }, [dispatch, error, message])


  return (
    <div>
     <div className="Admin-container">
      <ToastContainer
          position="top-left"
            theme="colored"
          />
      <div><Sidebar /></div>
      <div className="Admin-main">
      <MDBRow style={{ boxShadow: "inset 0 0 5px black" }}
      >
        <MDBCol size="10">
          <MDBTypography
            tag="h1"
            className="fw-bold  text-muted cart-item-heading text-center"
            style={{ textShadow: "1px 1px 0px #00bf63" }}
          >
            Blog Details
          </MDBTypography>
        </MDBCol>
        <MDBCol>
          <Form onSubmit={handleSubmitBlog}>
            <div className='grid-form-input'>

              <Form.Group style={{ width: "49%", minWidth: "160px" }}>
                <Form.Select aria-label="Default select example"
                  style={{ border: '1.5px solid #00bf63', borderRadius: "7px" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required>
                  <option>Chose Blog Type</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group style={{ width: "49%", minWidth: "160px" }}>
                <Form.Select aria-label="Default select example"
                  style={{ border: '1.5px solid #00bf63', borderRadius: "7px" }}
                  value={category}
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
            <Form.Group >
              <Form.Control
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="Blog Title Here....."
                required
                onChange={(e) => setTitle(e.target.value)}
                style={{ boxShadow: "inset 0 0 0 1px #00bf63" }}
              />
            </Form.Group>
            <div className='line-brake'></div>
            <Form.Group>
              <Form.Control
                as="textarea" rows={4}
                id="shortDescription"
                name="shortDescription"
                placeholder="Short Description..."
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                style={{ boxShadow: "inset 0 0 0 1px #00bf63" }}

              />
            </Form.Group>
            <div className='line-brake'></div>
            <Form.Group>
              <Form.Control
                as="textarea" rows={8}
                id="article"
                name="article"
                placeholder="Write Your Article Here..."
                value={article}
                required
                onChange={(e) => setArticle(e.target.value)}
                style={{ boxShadow: "inset 0 0 0 1px #00bf63" }}

              />
            </Form.Group>
            <button type="submit" className="btn btn-warning mt-3 mb-3" style={{ width: "100%" }} disabled={loading}>
              Save & Continue
            </button>
          </Form>

        </MDBCol>
      </MDBRow>
      </div>
      </div>
    </div>
  )
}

export default UpdateBlog
