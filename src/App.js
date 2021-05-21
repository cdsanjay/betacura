import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import logo from './logo.png';
import logoLeft from "./logoLeft.jpeg";
import check from './assets/check.svg'
import './helperCss/bootstrap.css';
import './helperCss/tailwind.css';
import './App.css';

import EmployeeDetails from './components/EmployeeDetails';
import PackageDetails from './components/PackageDetails';
import AppointmentDetails from './components/AppointmentDetails';
import PaymentDetails from './components/PaymentDetails';
import SuccessPage from './components/Success';
import FailedPage from './components/Failed';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

function App() {
  const [step,setStep] = React.useState(1);
  const [paymentUrl,setPaymentUrl] = React.useState('');
  const [ImageUrl,setImageUrl] = React.useState('');
  const [family,setFamily] = React.useState(false)
  const [values,setValues] = React.useState({
    employeeDetails:[],
    packageDetails:[],
    appointmentDetails:[],
    charge:false
  })

  const handleStep = () => {
    setStep(step+1)
  }


  const onSubmit = (payment,total) => {

    const pkg = values.employeeDetails.map((el,key)=>{
      return {
        name:el.name,
        email:el.email,
        mobile:el.phone,
        relationshipType: key===0 ? "Self" : el.relationshipType,
        packages:{
          packageName:values.packageDetails[key].packageName,
          pkgDesc:values.packageDetails[key].pkgDesc,
          price:values.packageDetails[key].price,
          customized: values.packageDetails[key].customizePackage,
          addOnPackages:values.packageDetails[key].addOnPackages,
        },
        appointment:values.appointmentDetails[key],
      }
    })

    const data = {
      appointmentDate1:values.appointmentDetails[0].date1,
      appointmentDate2:values.appointmentDetails[0].date2,
      email:values.employeeDetails[0].email,
      employeeId:values.employeeDetails[0].id,
      employeeName:values.employeeDetails[0].name,
      identificationType:values.employeeDetails[0].idprooftype,
      identificationDocUrl:ImageUrl,
      mobile:values.employeeDetails[0].phone,
      packageDetails:pkg,
      totalConvienceCharge:0,
      paymentMode:payment,
      totalprice:total,
    }

    // setStep(step+1)

    // console.log(values.employeeDetails[0].idproof)
    var formData = new FormData();
    formData.append("type","BCuraLead")
    formData.append("file",values.employeeDetails[0].idproof[0])
    formData.append("fileName",values.employeeDetails[0].idproof[0].name)
    formData.append("mediaType","image")
    console.log(formData)
    const serverOrigin ='https://reachlocalads.com';
    //const serverOrigin ='http://13.233.125.97:8080';
     fetch(serverOrigin+"/upload/ext/file",{
      method: 'POST',
      body: formData,
    }).then(async d=>await d.json()).then(json=>{
      setImageUrl(json.url);
        data.idProofURL = json;
       console.log(json);
       // after image saved.. proceed for payment
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
       // TODO 1. mail the data

       // TODO 2. handle the payment
       if(payment === 'ONLINE'){
         displayRazorpay(total, data, payment);
       }
       else if(payment === "CASH"){
         emailTheResponse(total, data, payment)
       }
     })

    // console.log(data)
    // fetch(`${serverOrigin}/incoming-lead/receive/w/appointment`,{
    //   method:"POST",
    //   body:JSON.stringify(data),
    //   headers: {
    //     "Accept":"application/json",
    //     "Content-Type":"application/json",
    //   },
    // })
    // .then(d=>d.json())
    // .then(json=>{
    //   console.log(json)
    //   setPaymentUrl(json.paymentUrl)
    // }).catch(err=>{
    //   console.log(err)
    // })


  }
  const props = { values,setValues,handleStep,family,setFamily }

  async function emailTheResponse(totalAmount, appointmentData, payment) {
    const body = {
      ...appointmentData,
      amount: totalAmount,
      payment: payment
    }
    const data = await fetch(`${process.env.REACT_APP_API_HOST}/api/appointment/save`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }).then((t) => {
          window.location ='/success'
          t.json();
        }
    ).catch(()=>{
      window.location ='/paymentfailed'
    })
  }
  async function displayRazorpay(totalAmount, appointmentData, paymentType) {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const body = {
      amount: totalAmount
    }
    const data = await fetch(`${process.env.REACT_APP_API_HOST}/api/appointment/razorpay`,
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        }).then((t) =>
        t.json()
    )

    console.log(data)

    const options = {
      key: process.env.REACT_APP_RAZOR_KEY_ID,
      currency: data.currency,
      amount: totalAmount,
      order_id: data.id,
      name: 'Betacura Test',
      description: 'Payment',
      image: `${process.env.REACT_APP_API_HOST}/api/appointment/logo`,
      handler: function (response) {
        console.log("response", response)
        emailTheResponse(totalAmount,{
          ...appointmentData,
          paymentResponse: response
        } , paymentType)
        // alert(response.razorpay_payment_id)
        // alert(response.razorpay_order_id)
        // alert(response.razorpay_signature)
      },
      // prefill: {
      //   name,
      //   email: 'sdfdsjfh2@ndsfdf.com',
      //   phone_number: '9899999999'
      // }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <Router>
      <Switch>
        <Route path="/paymentfailed">
          <FailedPage logo={logo} />
        </Route>
        <Route path="/success">
          <SuccessPage logo={logo} />
        </Route>
        <Route path="/">
          <div className="bg-light">
            <div className="container">
            <div className="flex flex-wrap justify-around">
                <img
                  src={logoLeft}
                  alt={"LogoLeft"}
                  className="w-1/5 md:w-2/12 md:h-32 my-7"
                />
                <img
                  src={logo}
                  alt={"Logo"}
                  className="w-1/5 md:w-2/12  my-7"
                />
              </div>

              <div className="container-fluid">

                {/* Employee Details */}
                {values.employeeDetails.length > 0 ?<>
                  <div className="container-fluid p-0 md:p-2 my-3">
                    <div className="flex-row md:flex bg-white p-3 cursor-pointer border shadow-sm">
                      <div className="flex items-center w-full md:w-4/5">
                        <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">1</div>
                        <div className="text-sm md:text-xl px-3 font-medium w-full">
                            {values?.employeeDetails.map((each, index) => {
                              return <>
                              {index === 1 && <div>Family Details</div>}
                                {index === 0 && <div className="flex items-center">
                                  <div>Employee Details</div>
                                  <img src={check} width="20px" alt={"Check"} className="mx-3"/>
                                </div>}
                                <div
                                    className="text-md text-secondary">{each?.name} +91{each?.phone}</div>
                              </>
                            })}
                          {/* {values.employeeDetails.map((el,key)=>(
                            <div key={key} className="text-md text-secondary">{el.name} +91{el.phone}</div>
                          ))} */}
                        </div>
                      </div>
                      <div className="ml-auto self-center w-1/2 md:w-1/5">
                        <div onClick={()=>{setStep(1)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
                      </div>
                    </div>
                    {step === 1?<EmployeeDetails {...props} />:<></>}
                  </div>
                </>:<>
                  <div className="container-fluid p-0 md:p-2 my-3">
                    <div className="flex items-center bg-primary p-3 cursor-pointer">
                      <div className="p-1 px-2 bg-white rounded">1</div>
                      <div className="text-xl text-white px-3 font-medium">Employee Details</div>
                    </div>
                    {step === 1?<EmployeeDetails {...props} />:<></>}
                  </div>
                </>}
                {/* Package Details */}
                {values.packageDetails.length > 0 ?<>
                  <div className="container-fluid p-0 md:p-2 my-3">
                    <div className="flex-row md:flex bg-white p-3 cursor-pointer border shadow-sm">
                      <div className="flex items-center w-full md:w-4/5">
                        <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">2</div>
                        <div className="text-sm md:text-xl px-3 font-medium w-full">
                          <div className="flex items-center">
                            <div>Package Details</div>
                            <img src={check} alt={"Check"} width="20px" className="mx-3" />
                          </div>
                          {values.employeeDetails.length > 1?<>
                            {values.packageDetails.map((el,key)=>(
                              <>
                                <div key={key} className="text-dark text-sm">
                                  <span className="text-sm md:text-lg text-secondary font-medium">{values.employeeDetails[key].name}</span>
                                  : {el.packageName}</div>
                                <div className="text-sm">
                                  <span className="text-secondary">Add-on Package: </span>
                                  <span>{el.addons.map(el=>(el+","))}</span>
                                </div>
                              </>
                            ))}
                          </>:<>
                            {values.packageDetails.map((el,key)=>(
                              <>
                                <div key={key} className="text-dark text-sm">Package: {el.packageName}</div>
                                <div className="text-dark text-sm">Add-on Package: {el.addons?.map(el=>(el+","))}</div>
                              </>
                            ))}
                          </>}
                        </div>
                      </div>
                      <div className="ml-auto self-center w-1/2 md:w-1/5">
                        <div onClick={()=>{setStep(2)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
                      </div>
                    </div>
                    {step === 2?<PackageDetails {...props} />:<></>}
                  </div>

                </>:<>
                  <div className="container-fluid p-0 md:p-2 my-3">
                    <div className="flex items-center bg-primary p-3 cursor-pointer">
                      <div className="p-1 px-2 bg-white rounded">2</div>
                      <div className="text-xl text-white px-3 font-medium">Package Details</div>
                    </div>
                    {step === 2?<PackageDetails {...props} />:<></>}
                  </div>
                </>}

                {/* Appointment Details */}
                {values.appointmentDetails.length > 0 ?<>
                  <div className="container-fluid p-0 md:p-2 my-3">
                    <div className="flex-row md:flex bg-white p-3 cursor-pointer border shadow-sm">
                      <div className="flex items-center w-full md:w-4/5">
                        <div className="w-10 p-2 text-center self-start border rounded bg-light shadow-sm">3</div>
                        <div className="text-sm md:text-xl px-3 font-medium w-full">
                          <div className="flex items-center">
                            <div>Appointment Details</div>
                            <img src={check} alt={"Check"} width="20px" className="mx-3" />
                          </div>
                          {values.employeeDetails.length > 1?<>
                            {values.appointmentDetails.map((el,key)=>(
                              <>
                                <div key={key} className="text-dark text-sm">
                                  <span className="text-sm md:text-lg text-secondary font-medium">{values.employeeDetails[key].name}</span>
                                  : {el.address}  {el.locality}  {el.city}  {el.state}  {el.landmark} </div>
                                  {el.date1?<>
                                    <div className="text-dark text-sm">Date & Time : {el.date1}</div>
                                  </>:<></>}
                              </>
                            ))}
                          </>:<>
                            {values.appointmentDetails.map((el,key)=>(
                              <>
                                <div key={key} className="text-dark text-sm">Appointment: {el.address}</div>
                                <div className="text-dark text-sm">Date & Time : {el.date1}</div>
                              </>
                            ))}
                          </>}
                        </div>
                      </div>
                      <div className="ml-auto self-center w-1/2 md:w-1/5">
                        <div onClick={()=>{setStep(3)}} className="text-center p-2 border text-primary rounded mx-3">CHANGE</div>
                      </div>
                    </div>
                    {step === 3?<AppointmentDetails {...props} />:<></>}
                  </div>

                </>:<>
                  <div className="container-fluid p-0 md:p-2 my-3">
                    <div className="flex items-center bg-primary p-3 cursor-pointer">
                      <div className="p-1 px-2 bg-white rounded">3</div>
                      <div className="text-xl text-white px-3 font-medium">Appointment Details</div>
                    </div>
                    {step === 3?<AppointmentDetails {...props} />:<></>}

                  </div>
                </>}


                {/* Paymen Details */}
                <div className="container-fluid p-0 md:p-2 my-3">
                  <div className="flex items-center bg-primary p-3 cursor-pointer">
                    <div className="p-1 px-2 bg-white rounded">4</div>
                    <div className="text-xl text-white px-3 font-medium">Payment</div>
                  </div>
                  {step === 4?<PaymentDetails {...props} submit={onSubmit} />:<></>}
                </div>


              </div>

            </div>
          </div>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
