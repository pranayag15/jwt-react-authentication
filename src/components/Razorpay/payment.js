import React, { Component } from "react";
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const API_URL = "http://localhost:5000/api/v1";

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      rpay_id: ""
    }
  }

  paymentHandler = async (e) => {
    e.preventDefault();
    const orderUrl = `${API_URL}/order`;
    const response = await axios.get(orderUrl);
    console.log(response)
    const { data } = response;
    this.setState({rpay_id: data.id})
    const options = {
      key: "rzp_test_fxQWpg9T0PNBq5",
      // amount: 100,
      currency: "INR",
      name: "Pranay Corp",
      description: "Test Transaction",
      image: "./payment-logo.png",
      order_id: data.id,
      // handler: async (response) => {
      //   try {
      //     const paymentId = response.razorpay_payment_id;
      //     const url = `${API_URL}/capture/${paymentId}`;
      //     const captureResponse = await axios.post(url, {});
      //     console.log(captureResponse.data);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // },
      handler: function (response) {
        console.log(response, "payment done")
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  checkPaymentStatus = async (e) => {
    e.preventDefault();
    let rpayId = this.state.rpay_id
    console.log(rpayId, "id")
    const orderUrl = `${API_URL}/orderstatus/${rpayId}`;
    const response = await axios.get(orderUrl);
    console.log(response.data, "status")
    alert(response.data.status)
  }

  onMakePaymentClick = async (e) => {
    e.preventDefault();
    const options = {
      key: "rzp_test_fxQWpg9T0PNBq5",
      amount: "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Pranay Corp",
      description: "Test Transaction",
      image: "./payment-logo.png",
      "order_id": "order_EzQUQXf4287lDb",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Pranay Agarwal",
        email: "pranay.agarwal@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#528FF0",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user}
              <p className="flow-text grey-text text-darken-1">
                Make payment and enjoy{" "}
                <span style={{ fontFamily: "monospace" }}>DUKAAN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={this.onMakePaymentClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Make Payment
            </button>
            <button
              style={{
                width: "300px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                marginLeft: "5px"
              }}
              onClick={this.checkPaymentStatus}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Check Last Payment Status
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
