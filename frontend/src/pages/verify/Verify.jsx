import { useContext, useEffect, useState } from "react";
import "./Verify.css"
import { useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";


function Verify() {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const {backendURL, navigate, token} = useContext(StoreContext);
    
    
    // console.log(success, orderId, searchParams);

    const verifyPayment = async () => {
        const response = await axios.post(backendURL + "/api/order/verify", {orderId, success}, {headers: {token}});
        console.log(response);
        if (response.data.success) {
            navigate('/myorders');
        } else {
            navigate('/');
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);


    return (
        <div className="verify">
            <div className="spinner">

            </div>
        </div>
    )
}


export default Verify;