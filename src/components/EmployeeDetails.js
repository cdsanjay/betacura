import React from 'react'
import { useForm } from "react-hook-form";

export default function EmployeeDetails(props){
    const { values, setValues, handleStep, family, setFamily } = props
    const { register, handleSubmit, errors } = useForm({
      defaultValues:{
        name1:values.employeeDetails[0]?.name,
        id:values.employeeDetails[0]?.id,
        idprooftype:values.employeeDetails[0]?.idprooftype,
        idproof:values.employeeDetails[0]?.idproof,
        phone1:values.employeeDetails[0]?.phone,
        email1:values.employeeDetails[0]?.email,
        name2:values.employeeDetails[1]?.name,
        gender:values.employeeDetails[1]?.gender,
        age:values.employeeDetails[1]?.age,
        email2:values.employeeDetails[1]?.email,
        phone2:values.employeeDetails[1]?.phone,
      }
    });

    const [idproof,setIdproof] = React.useState("")
    
    const onSubmit = (data) => { 
      var emp1 = {name:data.name1,id:data.id,idprooftype:data.idprooftype,idproof:data.idproof,phone:data.phone1,email:data.email1}
      var emp2 = {name:data.name2,gender:data.gender,age:data.age,phone:data.phone2,email:data.email2}
      setValues({...values,employeeDetails:family?[emp1,emp2]:[emp1]})
      handleStep();
    }
    
    return (
    <div className="container-fluid p-0 bg-white p-4 border shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Employee Name *</div>
            <input type="text" name="name1" ref={register({required:true})} 
            className="border p-2 w-full" placeholder="Your Full Name" />
            {errors.name1 && <small className="text-danger">Employee name is required</small>}
          </div>
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Employee Id *</div>
            <input type="text"  name="id" ref={register({required:true})} 
            className="border p-2 w-full" placeholder="Employee Id" />
            {errors.id && <small className="text-danger">Employee ID is required</small>}
          </div>
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Employee Id proof *</div>
            <select name="idprooftype" className="form-select" ref={register({required:true})} defaultValue={idproof} onChange={(e)=>{setIdproof(e.target.value)}} >
              <option value="">- Select -</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="Pan Card">Pan Card</option>
              <option value="Passport">Passport</option>
            </select> 
            {errors.idprooftype && <small className="text-danger">Employee ID proof is required</small>}
          </div> 

          {idproof?<>
            <div className="col-md-4">
              <div className="py-2 text-dark font-medium">{idproof}*</div>
              <input type="file"accept="image/*,.pdf" name="idproof" ref={register({required:true})} 
              className="border p-2 w-full" placeholder={idproof} />
              {errors.idproof && <small className="text-danger">{idproof} is required</small>}
            </div>
          </>:<></>}

          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Contact Number *</div>
            <input type="number" name="phone1" ref={register({required:true,minLength:10,maxLength:10})} 
            className="border p-2 w-full" placeholder="10-digit Mobile Number" />
            {errors.phone1?.type === "required" && <small className="text-danger">Phone number is required</small>}
            {errors.phone1?.type === "minLength" && <small className="text-danger">Enter valid 10 digit mobile number</small>}
            {errors.phone1?.type === "maxLength" && <small className="text-danger">Enter valid 10 digit mobile number</small>}
          </div>
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Email Id *</div>
            <input type="text" name="email1" ref={register({
              required:true, pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }})} 
            className="border p-2 w-full" placeholder="Enter your Email ID" />
            {errors.email1?.type === "required" && <small className="text-danger">Email Id is required</small>}
            {errors.email1?.type === "pattern" && <small className="text-danger">Enter valid email address</small>}
          </div>
          <div className="col-md-12 flex items-center">
            {family?<>
            <div onClick={()=>setFamily(false)} className="text-primary font-medium my-3 cursor-pointer">
              <span className="rounded px-1 border border-danger bg-danger text-white mr-1">&times;</span>
              Cancel
            </div>
            </>:<>
              <div onClick={()=>setFamily(true)} className="text-primary font-medium my-3 cursor-pointer">
                <span className="rounded px-1 border border-primary mr-1">+</span>
                Add another family member
              </div>
            </>}
          </div>

          {family?<> 
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Name *</div>
            <input type="text" name="name2" ref={register({required:true})} 
            className="border p-2 w-full" placeholder="Your Full Name" />
            {errors.name2 && <small className="text-danger">Name is required</small>}
          </div>
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Gender *</div>
            <select name="gender" className="form-select" ref={register({required:true})} >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <small className="text-danger">Gender is required</small>}
          </div>
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Age *</div>
            <input type="number" name="age" ref={register({required:true})} 
            className="border p-2 w-full" placeholder="Enter your age" />
            {errors.age && <small className="text-danger">Age is required</small>}
          </div>
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Email Id *</div>
            <input type="text" name="email2" ref={register({required:true,pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            }})} 
            className="border p-2 w-full" placeholder="Enter your Email ID" />
            {errors.email2?.type === "required" && <small className="text-danger">Email Id is required</small>}
            {errors.email2?.type === "pattern" && <small className="text-danger">Enter valid email address</small>}
          </div>
          <div className="col-md-4">
            <div className="py-2 text-dark font-medium">Contact Number *</div>
            <input type="number" name="phone2" ref={register({required:true,minLength:10,maxLength:10})} 
            className="border p-2 w-full" placeholder="10-digit Mobile Number" />
            {errors.phone2?.type === "required" && <small className="text-danger">Phone number is required</small>}
            {errors.phone2?.type === "minLength" && <small className="text-danger">Enter valid 10 digit mobile number</small>}
            {errors.phone2?.type === "maxLength" && <small className="text-danger">Enter valid 10 digit mobile number</small>}
          </div>
          </>:<></>}



          <div className="col-md-12">
            <button type="submit" className="cursor-pointer p-2 px-3 bg-success text-white text-center w-1/2 md:w-1/6 mt-3">Continue</button>
          </div>
        </div>  
      </form>

    </div>
    ) 
}
