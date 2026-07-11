import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { backendURL } from "../Add/Add";
import { toast } from "react-toastify";

function List() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(backendURL + "/api/food/list");

    if (response.data.success) {
        setList(response.data.data);
    } else {
        toast.error(response.data.message);
    }
  };

  const removeFood = async (id) => {
    console.log(id);

    const response = await axios.post(backendURL + "/api/food/remove", {id: id});
    
  }


  useEffect(() => {
    // console.log(list)
    fetchList();
  }, [])

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return(
            <div key={index} className="list-table-format">
                <img src={`${backendURL}/images/${item.image}`} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className="cursor" onClick={() => removeFood(item._id)}>X</p>
            </div>
          ) 

        })}
      </div>
    </div>
  );
}

export default List;
