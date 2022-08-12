
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../components/hooks/useFetch";
import Datatable from "../../components/datatable/Datatable";
import './newHotel.scss'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewHotel = ({ inputs, title }) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({})
  const [rooms, setRooms] = useState([])

  const { data, loading, error } = useFetch('/rooms')

  const handleChange = (e) => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }


  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value)
    console.log(e.target.selectedOptions)
    setRooms(value)
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData()
          data.append("file", file)
          data.append("upload_preset", "upload")
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dmx182kqu/image/upload",
            data
          )
          const { url } = uploadRes.data
          return url
        }))


      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };
      console.log(newhotel)
      await axios.post("http://localhost:8000/api/hotels", newhotel);

      toast("Hotel created !!!");
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id} onChange={handleChange}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}

              <div className="formInput">
                <label>Featured</label>
                <select id='featured' onChange={handleChange}>
                  <option value={false}>Yes</option>
                  <option value={true}>No</option>
                </select>
              </div>

              <div className="selectRooms">
                <label>Rooms</label>
                <select id='rooms' multiple onChange={handleSelect}>
                  {loading ? 'loading' :
                    data && data.map(room =>
                      <option value={room._id} key={room._id}>
                        {room.title}
                      </option>
                    )
                  }
                </select>
              </div>


              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewHotel;
