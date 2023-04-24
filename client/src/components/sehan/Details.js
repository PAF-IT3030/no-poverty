import React, { useState,useEffect} from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { Link,useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./details.css";
import axios from "axios";


const Details = () => {

  const [productname, setProductname] = useState("");
  const [unitprice, setUnitprice] = useState("");
  const [sellername, setSellername] = useState("");
  const [contactno, setContactno] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();


  useEffect(() => {
    function getProduct() {
      axios.get(`http://localhost:5000/product/get/${id}`).then((res) => {

        if (res.data.status) {
          setProductname(res.data.product.productname);
          setUnitprice(res.data.product.unitprice);
          setSellername(res.data.product.sellername);
          setContactno(res.data.product.contactno);
          setDescription(res.data.product.description);
          
        }
      }).catch((err)=>{

        alert(err);
      });
    }

    getProduct();
  },[]);


  function deleteProduct(id){
    Swal.fire({
      title: 'Are You Sure?',
      text: 'Once deleted, You Will Not Able To Recover These Details ! ',
      icon: 'warning',
      dangerMode: true,
      showCancelButton:true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result)=>{
      if(result.isConfirmed)
      {axios.delete("http://localhost:5000/product/delete/"+id);
      Swal.fire({
        title: 'Success!',
        text: 'Deleted Record Successfully',
        icon: 'success',
        showConfirmButton:false,
      });
      setTimeout(() => {
        window.location.replace("http://localhost:3000/view");
        
      });
    
    }
    }).catch((err)=>{
      Swal.fire({
        title : 'Error!',
        text : "Couldn't delete your Details",
        type : 'error',
      });
    });

  }

  return (
    <div id="body3">
      <form id="f1">
        <h1 id="fz">Product Details</h1>
        <img
          src="https://i.pinimg.com/736x/b9/02/b9/b902b9aad58334dd19ad738bfb0083a2--broom-corn-things-i-want.jpg"
          id="imgd"
        />

        <table id="tb1">
          <tr id="tr1">
            <td id="td1">Product Name</td>
            <td id="td1"> {productname} </td>
          </tr>

          <tr id="tr1">
            <td id="td1">Unit Price</td>
            <td id="td1"> {unitprice} </td>
          </tr>

          <tr id="tr1">
            <td id="td1">Seller Name</td>
            <td id="td1"> {sellername} </td>
          </tr>

          <tr id="tr1">
            <td id="td1">Contact Number</td>
            <td id="td1"> {contactno} </td>
          </tr>

          <tr id="tr1">
            <td id="td1">Discription</td>
            <td id="td1"> {description} </td>
          </tr>
        </table>

        <Link to={`/edit/${id}`}>
          
          <button id="btnedit">Edit</button>
        </Link>
        <Link to={`/details/${id}`}>
        
          <button onClick={()=>deleteProduct(id)} id="btndelete">
            Delete
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Details;
