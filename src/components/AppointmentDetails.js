import React from 'react'
import { useForm } from "react-hook-form";

export default function AppointmentDetails(props){
  var date1 = new Date();
  date1.setDate(date1.getDate() + 2);
  var date2 = new Date();
  date2.setDate(date2.getDate() + 3);
 
  const { values, setValues, handleStep, family } = props
  const { register, getValues, setValue, handleSubmit, errors } = useForm({
    defaultValues:{
      street1:values.appointmentDetails[0]?.address,
      locality1:values.appointmentDetails[0]?.locality,
      city1:values.appointmentDetails[0]?.city,
      state1:values.appointmentDetails[0]?.state,
      landmark1:values.appointmentDetails[0]?.landmark,
      date1:values.appointmentDetails[0]?.date1,
      time1:values.appointmentDetails[0]?.time1,
      date2:values.appointmentDetails[0]?.date2,
      time2:values.appointmentDetails[0]?.time2,
      street2:values.appointmentDetails[1]?.address,
      locality2:values.appointmentDetails[1]?.locality,
      city2:values.appointmentDetails[1]?.city,
      state2:values.appointmentDetails[1]?.state,
      landmark2:values.appointmentDetails[1]?.landmark,
      // date3:values.appointmentDetails[1]?.date3,
      // time3:values.appointmentDetails[1]?.time3,
      // date4:values.appointmentDetails[1]?.date4,
      // time4:values.appointmentDetails[1]?.time4,
      
    }
  });
  
  const timeList = [
    "7:00 AM - 9:00 AM",
    "9:00 AM - 11:00 AM",
    "11:00 AM - 1:00 PM",
    "1:00 PM - 3:00 PM",
  ]
  

  const copyAddress = (e) => {
    if(e.target.checked){
      setValue("state2",getValues('state1'))
      setValue("city2",getValues('city1'))
      setValue("street2",getValues('street1'))
      setValue("locality2",getValues('locality1'))
      setValue("landmark2",getValues('landmark1'))
      setValue("date3",getValues('date1'))
      setValue("time3",getValues('time1'))
      setValue("date4",getValues('date2'))
      setValue("time4",getValues('time2'))
    }else{
      setValue("state2","")
      setValue("city2","")
      setValue("street2","")
      setValue("locality2","")
      setValue("landmark2","")
      setValue("date3",null)
      setValue("time3",null)
      setValue("date4",null)
      setValue("time4",null)
    }
  }

  const onSubmit = (data) => {
    // const date1 = data.date1 + " " + data.time1; 
    // const date2 = data.date2 + " " + data.time2; 
    // const date3 = data.date3 + " " + data.time3; 
    // const date4 = data.date4 + " " + data.time4; 
    const apmt1 = {address:data.street1,locality:data.locality1,city:data.city1,state:data.state1,
      landmark:data.landmark1,date1:data.date1,date2:data.date2,time1:data.time1,time2:data.time2}
    const apmt2 = {address:data.street2,locality:data.locality2,city:data.city2,state:data.state2,
      landmark:data.landmark2}  
    setValues({...values,appointmentDetails:family?[apmt1,apmt2]:[apmt1]})
    handleStep();
  }
 
  return (
    <div className="container-fluid p-4 bg-white border shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {family?<>
          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Address for {values.employeeDetails[0]?.name} *</div> 
          </div></>:<></>}

          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">State *</div>
            <input type="text" name="state1" ref={register({required:true})} className="form-control" placeholder="Enter your State" />
            {errors.state1?.type==="required" && <small className="text-danger">State is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">City *</div>
            <select name="city1" ref={register({required:true})} className="form-select">
              <option value="">- Select -</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi & NCR">Delhi & NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hydrabad">Hydrabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Ahemdabad">Ahemdabad</option>
            </select>
            {errors.city1?.type==="required" && <small className="text-danger">City is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">Locality*</div>
            <input type="text" name="locality1" ref={register({required:true})} className="form-control" placeholder="Enter your locality" />
            {errors.locality1?.type==="required" && <small className="text-danger">Locality is required</small>}
          </div>
          <div className="col-md-4 my-1"> 
            <div className="py-2 text-dark font-medium">Street Address*</div>
            <input type="text" name="street1" ref={register({required:true})} className="form-control" placeholder="Street Address" />
            {errors.street1?.type==="required" && <small className="text-danger">Street Address is required</small>}
          </div>
          <div className="col-md-4 my-1"> 
            <div className="py-2 text-dark font-medium">Landmark</div>
            <input type="text" name="landmark1" ref={register} className="form-control" placeholder="Landmark" />
            {errors.landmark1?.type==="required" && <small className="text-danger">Landmark is required</small>}
          </div>
          
          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Select An Appointment*</div> 
          </div>
          <div className="col-md-12">
            <div className="py-2">Prefered slot 1</div>
          </div>
          <div className="col-md-4 my-1"> 
            <input type="date" min={date1.toISOString().substr(0,10)} name="date1" ref={register({required:true})} className="form-control" />
            {errors.date1?.type==="required" && <small className="text-danger">Date is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <select name="time1"ref={register({required:true})} className="form-select">
              <option value="">- Select -</option>
              {timeList.map((e,k)=>(
                <option key={k} value={e}> {e} </option>
              ))}
            </select>
            {errors.time1?.type==="required" && <small className="text-danger">Time is required</small>}
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-12">
            <div className="py-2">Prefered slot 2</div>
          </div>
          <div className="col-md-4 my-1">  
            <input type="date" min={date2.toISOString().substr(0,10)} name="date2" ref={register({required:true})} className="form-control" />
            {errors.date2?.type==="required" && <small className="text-danger">Date is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <select name="time2"ref={register({required:true})} className="form-select">
              <option value="">- Select -</option>
              {timeList.map((e,k)=>(
                <option key={k} value={e}> {e} </option>
              ))}
            </select>
            {errors.time2?.type==="required" && <small className="text-danger">Time is required</small>}
          </div>

            {/* If Family Exists */}
          
          {family?<>

          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">
              <input type="checkbox" name="copy" className="mr-2" onClick={copyAddress} />
              Copy address</div> 
          </div>
          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Address for {values.employeeDetails[1]?.name} *</div> 
          </div>
          
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">State *</div>
            <input type="text" name="state2" ref={register({required:true})} className="form-control" placeholder="Enter your State" />
            {errors.state2?.type==="required" && <small className="text-danger">State is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">City *</div>
            <select name="city2" ref={register({required:true})} className="form-select">
              <option value="">- Select -</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi & NCR">Delhi & NCR</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hydrabad">Hydrabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Ahemdabad">Ahemdabad</option>
            </select>
            {errors.city2?.type==="required" && <small className="text-danger">City is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <div className="py-2 text-dark font-medium">Locality*</div>
            <input type="text" name="locality2" ref={register({required:true})} className="form-control" placeholder="Enter your locality" />
            {errors.locality2?.type==="required" && <small className="text-danger">Locality is required</small>}
          </div>
          <div className="col-md-4 my-1"> 
            <div className="py-2 text-dark font-medium">Street Address*</div>
            <input type="text" name="street2" ref={register({required:true})} className="form-control" placeholder="Street Address" />
            {errors.street2?.type==="required" && <small className="text-danger">Street Address is required</small>}
          </div>
          <div className="col-md-4 my-1"> 
            <div className="py-2 text-dark font-medium">Landmark</div>
            <input type="text" name="landmark2" ref={register} className="form-control" placeholder="Landmark" />
            {errors.landmark2?.type==="required" && <small className="text-danger">Landmark is required</small>}
          </div>
          
          {/* <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Select An Appointment*</div> 
          </div>
          <div className="col-md-12">
            <div className="py-2">Prefered slot 1</div>
          </div>
          <div className="col-md-4 my-1"> 
            <input type="date" min={date1.toISOString().substr(0,10)} name="date3" ref={register({required:true})} className="form-control" />
            {errors.date3?.type==="required" && <small className="text-danger">Date is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <select name="time3"ref={register({required:true})} className="form-select">
              <option value="">- Select -</option>
              {timeList.map((e,k)=>(
                <option key={k} value={e}> {e} </option>
              ))}
            </select>
            {errors.time3?.type==="required" && <small className="text-danger">Time is required</small>}
          </div>
          <div className="col-md-4"></div>
          <div className="col-md-12">
            <div className="py-2">Prefered slot 2</div>
          </div>
          <div className="col-md-4 my-1">  
            <input type="date" min={date2.toISOString().substr(0,10)} name="date4" ref={register({required:true})} className="form-control" />
            {errors.date4?.type==="required" && <small className="text-danger">Date is required</small>}
          </div>
          <div className="col-md-4 my-1">
            <select name="time4" ref={register({required:true})} className="form-select">
              <option value="">- Select -</option>
              {timeList.map((e,k)=>(
                <option key={k} value={e}> {e} </option>
              ))}
            </select>
            {errors.time4?.type==="required" && <small className="text-danger">Time is required</small>}
          </div> */}
                    
          </>:<></>}

          
          <div className="col-md-12">
            <button type="submit" className="cursor-pointer p-2 px-3 bg-success text-white text-center w-1/2 md:w-1/6 mt-3">Continue</button>
          </div>

        </div>
      </form>
    </div>
  ) 
}
