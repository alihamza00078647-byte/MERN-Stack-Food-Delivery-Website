import { useContext, useEffect } from "react";
import "./Verify.css";
import { useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

function Verify() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { backendURL, navigate, token } = useContext(StoreContext);

  const verifyPayment = async () => {
    const authToken = token || localStorage.getItem("token");

    if (!authToken || !orderId) {
      toast.error("Please login again to continue.");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        backendURL + "/api/order/verify",
        { orderId, success },
        { headers: { token: authToken } },
      );

      if (response.data.success) {
        toast.success("Payment verified successfully.");
        navigate("/");
      } else {
        toast.error(response.data.message || "Payment could not be verified.");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [backendURL, navigate, token, orderId, success]);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
