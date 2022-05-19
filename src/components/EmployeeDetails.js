import React, {useEffect} from 'react'
import {useFieldArray, useForm} from "react-hook-form";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import OtpInput from 'react-otp-input';
import SyncLoader from "react-spinners/SyncLoader";

// const defaultValues = {
//     name1: "Baburam Adhikari", id: "121212", phone1: "9823119554", email1: 'idsanjay81@gmail.com',
// }

const byPassIDValidation = true;
export default function EmployeeDetails(props) {
    const {values, setValues, handleStep, family, setFamily} = props

    const defaultValues = {
        name1: values.employeeDetails[0]?.name,
        id: values.employeeDetails[0]?.id,
        // idprooftype: values.employeeDetails[0]?.idprooftype,
        // idproof: values.employeeDetails[0]?.idproof,
        phone1: values.employeeDetails[0]?.phone,
        email1: values.employeeDetails[0]?.email,
        age1: values.employeeDetails[0]?.age,
        gender1: values.employeeDetails[0]?.gender,
        family: [],
    };



    values?.employeeDetails?.map((value, index) => {
        if (index === 0) return;
        const familyDetail = {
            name: value.name,
            phone: value.phone,
            email: value.email,
            age: value.age,
            gender: value.gender,
            relationshipType: value.relationshipType,
        };
        defaultValues.family.push(familyDetail);
    })
    const {setValue, getValues, register, handleSubmit, errors, control} = useForm({
        defaultValues
    });

    const {fields, remove, append, update} = useFieldArray({
        control, name: 'family'
    });

    // const [idproof, setIdproof] = React.useState("")
    const [email, setEmail] = React.useState(values.employeeDetails[0]?.email || "");
    const [emailStatus, setEmailStatus] = React.useState(values.employeeDetails[0]?.email ? "confirmed" : "email"); // email otp confirmed
    const [idStatus, setIdStatus] = React.useState(values.employeeDetails[0]?.id ? "confirmed" : "pending"); // confirmed pending
    const [otpResponse, setOtpResponse] = React.useState({});
    const [spinning, setSpinning] = React.useState(false);
    const [idSpinning, setIdSpinning] = React.useState(false);
    // const [refresh, setRefresh] = React.useState(false);
    const [employeeData, setEmployeeData] = React.useState({
        age: values.employeeDetails[0]?.age,
        gender: values.employeeDetails[0]?.gender,
        name: values.employeeDetails[0]?.name,
        id: values.employeeDetails[0]?.id,
    });

    const onSubmit = async (data) => {
        if(!employeeData?.id || idStatus !== 'confirmed') {
            return NotificationManager.error('Please validate your Employee ID');
        }else if(emailStatus !== 'confirmed') {
            return NotificationManager.error('Please Verify your email first!')
        }
            const emp1 = {
                age: employeeData.age,
                gender: data.gender1,
                name: employeeData.name,
                id: employeeData.id,
                // idprooftype: data.idprooftype,
                // idproof: data.idproof,
                phone: data.phone1,
                email: email
            }

            // var emp2 = {name:data.name2,gender:data.gender,age:data.age,phone:data.phone2,email:data.email2}
            setValues({...values, employeeDetails: (family && data?.family?.length > 0) ? [emp1, ...data?.family] : [emp1]})
            handleStep();
    }
    const sendOTP = async () => {
        if(!email) {
            return NotificationManager.warning('Employee email is invalid');
        }
        const body = {
            email
        }
        setSpinning(true)
        await fetch(`${process.env.REACT_APP_API_HOST?.trim()}/api/appointment/send-otp`,
            {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            }).then(t => t.json()).then((responseData) => {
            if (!responseData?.success) {
                return NotificationManager.error(responseData?.message);
            }
            setOtpResponse(responseData.data);
            setEmailStatus("otp");
            return NotificationManager.info(responseData?.message);
        }).catch(() => {
            NotificationManager.error('Error while generating OTP!');
        }).finally(()=>setSpinning(false))
    }

    const confirmOTP = async () => {
        const {otp, hash, length, email: emailResponse} = otpResponse;
        if(!otp) {
            return NotificationManager.warning('Invalid OTP');
        }
        if(!hash) {
            return NotificationManager.warning('Please send OTP and validate.');
        }
        const body = {
            hash, otp, email: emailResponse
        }
        setSpinning(true)
        await fetch(`${process.env.REACT_APP_API_HOST?.trim()}/api/appointment/validate-pin`,
            {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            }).then(t => t.json()).then((responseData) => {
            if (!responseData?.success) {
                return NotificationManager.error(responseData?.message);
            }
            if(idStatus === 'confirmed') {
                setValue('gender1', employeeData?.gender);
            }
            setEmailStatus("confirmed");
            return NotificationManager.info(responseData?.message);
        }).catch(() => {
            NotificationManager.error('Error while validating email!');
        }).finally(()=>setSpinning(false))
    }

    const getFamilyUI = () => {
        return (<>
                {fields.map((item, index) => {
                    return <>
                        <div onClick={() => remove(index)} className="text-primary font-medium my-3 cursor-pointer">
                            <span className="rounded px-1 border border-danger bg-danger text-white mr-1">&times;</span>
                            Remove
                        </div>
                        <div className="col-md-4" key={item?.id}>
                            <div className="py-2 text-dark font-medium">Name *</div>
                            <input defaultValue={item?.name} type="text" name={`family.${index}.name`} ref={register({required: true})}
                                   className="border p-2 w-full" placeholder="Your Full Name"/>
                            {errors?.family && errors?.family[index] && errors?.family[index]?.name &&
                                <small className="text-danger">Name is required</small>}
                        </div>
                        <div className="col-md-4">
                            <div className="py-2 text-dark font-medium">Gender *</div>
                            <select defaultValue={item?.gender} name={`family.${index}.gender`} className="form-select"
                                    ref={register({required: true})}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            {errors?.family && errors?.family[index] && errors?.family[index]?.gender &&
                                <small className="text-danger">Gender is required</small>}
                        </div>
                        <div className="col-md-4">
                            <div className="py-2 text-dark font-medium">Relationship with Employee *</div>
                            <select defaultValue={item?.relationshipType} name={`family.${index}.relationshipType`} className="form-select"
                                    ref={register({required: true})}>
                                <option value="">- Select -</option>
                                {["Father", "Mother", "Father in Law", "Mother in Law", "Husband", "Wife", "Son", "Daughter", "Brother", "Sister", "Friend",].map((relation) =>
                                    <option key={relation} value={relation}>{relation}</option>)}

                            </select>
                            {errors?.family && errors?.family[index] && errors?.family[index]?.relationshipType &&
                                <small className="text-danger">Relationship is required</small>}
                        </div>

                        <div className="col-md-4">
                            <div className="py-2 text-dark font-medium">Age *</div>
                            <input defaultValue={item?.age} type="number" name={`family.${index}.age`} ref={register({required: true})}
                                   className="border p-2 w-full" placeholder="Enter your age"/>
                            {errors?.family && errors?.family[index] && errors?.family[index]?.age &&
                                <small className="text-danger">Age is required</small>}
                        </div>
                        <div className="col-md-4">
                            <div className="py-2 text-dark font-medium">Email Id *</div>
                            <input defaultValue={item?.email} type="text" name={`family.${index}.email`} ref={register({
                                required: true, pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                }
                            })}
                                   className="border p-2 w-full" placeholder="Enter your Email ID"/>
                            {errors?.family && errors?.family[index] && errors?.family[index]?.email?.type === "required" &&
                                <small className="text-danger">Email Id is required</small>}
                            {errors?.family && errors?.family[index] && errors?.family[index]?.email?.type === "pattern" &&
                                <small className="text-danger">Enter valid email address</small>}
                        </div>
                        <div className="col-md-4">
                            <div className="py-2 text-dark font-medium">Contact Number *</div>
                            <input defaultValue={item?.phone} type="number" name={`family.${index}.phone`}
                                   ref={register({required: true, minLength: 10, maxLength: 10})}
                                   className="border p-2 w-full" placeholder="10-digit Mobile Number"/>
                            {errors?.family && errors?.family[index] && errors.family[index]?.phone?.type === "required" &&
                                <small className="text-danger">Phone number is required</small>}
                            {errors?.family && errors?.family[index] && errors.family[index]?.phone?.type === "minLength" &&
                                <small className="text-danger">Enter valid 10 digit mobile number</small>}
                            {errors?.family && errors?.family[index] && errors.family[index]?.phone?.type === "maxLength" &&
                                <small className="text-danger">Enter valid 10 digit mobile number</small>}
                        </div>
                        <br/>
                    </>
                })}
                <div onClick={() => append({
                    name: '',
                    gender: '',
                    relationshipType: '',
                    age: '',
                    email: '',
                    phone: '',
                })} className="text-primary font-medium my-3 cursor-pointer">
                    <span className="rounded px-1 border border-primary mr-1">+</span>
                    Add another family member
                </div>
            </>)
    }

    const validateEmployeeID = async () => {
        const employeeID = getValues('id');

        if(!employeeID) {
            return NotificationManager.warning('Invalid Employee ID');
        }

        setIdSpinning(true);
        const body = {
            employeeID,
            email: getValues('email1')
        }
        await fetch(`${process.env.REACT_APP_API_HOST?.trim()}/api/employee/validate/`,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            }).then(t => t.json()).then((responseData) => {
            if (!responseData?.isValid) {
                return NotificationManager.error(responseData?.message);
            }
            if(responseData.employee){
                setEmployeeData(responseData.employee);
                if(emailStatus === 'confirmed') {
                    setValue('gender1', responseData?.employee?.gender);
                }
            }
            setIdStatus("confirmed");

        }).catch(() => {
            return NotificationManager.error('Error processing your request!');
        }).finally(()=>setIdSpinning(false));
    }
    return (<div className="container-fluid p-0 bg-white p-4 border shadow-sm">
            <NotificationContainer/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    {/*<div className="col-md-4">*/}
                    {/*    <div className="py-2 text-dark font-medium">Employee Name *</div>*/}
                    {/*    <input type="text" name="name1" ref={register({required: true})}*/}
                    {/*           className="border p-2 w-full" placeholder="Your Full Name"/>*/}
                    {/*    {errors.name1 && <small className="text-danger">Employee name is required</small>}*/}
                    {/*</div>*/}
                    <div className="col-md-6">
                        <div className="py-2 text-dark font-medium">Employee Id * &nbsp; {idStatus === 'confirmed' && '✅'} </div>
                        <input
                            disabled={idStatus === 'confirmed'}
                            // onChange={(event)=>setRefresh(event.target.value)}
                            type="text" name="id" ref={register({required: true})}
                               className="border p-2 w-full" placeholder="Employee Id"/>
                        {errors.id && <small className="text-danger">Employee ID is required</small>}
                        <div className="my-2.5 flex flex-row">
                            {idSpinning && <SyncLoader size={15} margin={2} /> }
                            {!idSpinning && idStatus === "pending" && <>
                                <button onClick={validateEmployeeID} type="button"
                                        className="text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200">
                                    Validate
                                </button>
                            </>}

                            {!idSpinning && idStatus === "confirmed" && emailStatus !== 'confirmed' && <>
                                <button onClick={()=> {
                                    // if(emailStatus === 'confirmed') setEmailStatus("email");
                                    setIdStatus("pending");
                                }} type="button"
                                        className="text-blue-500 bg-white hover:bg-gray-200 font-medium text-xs px-2 py-2 text-center inline-flex items-center">
                                    Edit ID
                                </button>
                            </>}

                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="py-2 text-dark font-medium">Email Id *</div>
                        <div className="flex flex-row col-md-12 align-items-center">
                            <input
                                disabled={emailStatus !== "email"}
                                   onChange={({target: {value}}) => {
                                setEmail(value);
                            }} type="text" name="email1" ref={register({
                                required: true, pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                }
                            })}
                                   className={`${emailStatus === "email" ? 'w-full' : 'col-md-6'} border p-2 `} placeholder="Enter your Email ID"/>

                            {emailStatus==='otp' && <OtpInput
                                inputStyle={{
                                    border: '1px solid #eee',
                                    width: 32,
                                    height: 32,
                                    marginLeft: 5
                                }}
                                value={otpResponse?.otp}
                                onChange={(otp) => setOtpResponse(data => ({...data, otp}))}
                                numInputs={otpResponse.length || 4}
                                separator={<span>-</span>}
                            />}

                            {emailStatus === "confirmed" &&
                                <small className="text-success ml-4">✅ &nbsp;Email is Verified</small>}

                        </div>
                        {errors.email1?.type === "required" &&
                            <small className="text-danger">Email Id is required</small>}
                        {errors.email1?.type === "pattern" &&
                            <small className="text-danger">Enter valid email address</small>}
                        <div className="my-2.5 flex flex-row">
                            {spinning && <SyncLoader size={15} margin={2} /> }
                            {!spinning && emailStatus === "email" && <button onClick={sendOTP} type="button"
                                                                        className="text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200">
                                <svg className="mr-1" version="1.1" width={16} height={16} viewBox="0 0 256 256">
                                    <g transform="translate(128 128) scale(0.72 0.72)" style={{}}>
                                        <g style={{
                                            stroke: 'none',
                                            strokeWidth: 0,
                                            strokeDasharray: 'none',
                                            strokeLinecap: 'butt',
                                            strokeLinejoin: 'miter',
                                            strokeMiterlimit: 10,
                                            fill: 'none',
                                            fillRule: 'nonzero',
                                            opacity: 1
                                        }} transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)">
                                            <path
                                                d="M 75.546 78.738 H 14.455 C 6.484 78.738 0 72.254 0 64.283 V 25.716 c 0 -7.97 6.485 -14.455 14.455 -14.455 h 61.091 c 7.97 0 14.454 6.485 14.454 14.455 v 38.567 C 90 72.254 83.516 78.738 75.546 78.738 z M 14.455 15.488 c -5.64 0 -10.228 4.588 -10.228 10.228 v 38.567 c 0 5.64 4.588 10.229 10.228 10.229 h 61.091 c 5.64 0 10.228 -4.589 10.228 -10.229 V 25.716 c 0 -5.64 -4.588 -10.228 -10.228 -10.228 H 14.455 z"
                                                style={{
                                                    stroke: 'none',
                                                    strokeWidth: 1,
                                                    strokeDasharray: 'none',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'miter',
                                                    strokeMiterlimit: 10,
                                                    fill: 'rgb(29,29,27)',
                                                    fillRule: 'nonzero',
                                                    opacity: 1
                                                }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
                                            <path
                                                d="M 11.044 25.917 C 21.848 36.445 32.652 46.972 43.456 57.5 c 2.014 1.962 5.105 -1.122 3.088 -3.088 C 35.74 43.885 24.936 33.357 14.132 22.83 C 12.118 20.867 9.027 23.952 11.044 25.917 L 11.044 25.917 z"
                                                style={{
                                                    stroke: 'none',
                                                    strokeWidth: 1,
                                                    strokeDasharray: 'none',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'miter',
                                                    strokeMiterlimit: 10,
                                                    fill: 'rgb(29,29,27)',
                                                    fillRule: 'nonzero',
                                                    opacity: 1
                                                }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
                                            <path
                                                d="M 46.544 57.5 c 10.804 -10.527 21.608 -21.055 32.412 -31.582 c 2.016 -1.965 -1.073 -5.051 -3.088 -3.088 C 65.064 33.357 54.26 43.885 43.456 54.412 C 41.44 56.377 44.529 59.463 46.544 57.5 L 46.544 57.5 z"
                                                style={{
                                                    stroke: 'none',
                                                    strokeWidth: 1,
                                                    strokeDasharray: 'none',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'miter',
                                                    strokeMiterlimit: 10,
                                                    fill: 'rgb(29,29,27)',
                                                    fillRule: 'nonzero',
                                                    opacity: 1
                                                }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
                                            <path
                                                d="M 78.837 64.952 c -7.189 -6.818 -14.379 -13.635 -21.568 -20.453 c -2.039 -1.933 -5.132 1.149 -3.088 3.088 c 7.189 6.818 14.379 13.635 21.568 20.453 C 77.788 69.973 80.881 66.89 78.837 64.952 L 78.837 64.952 z"
                                                style={{
                                                    stroke: 'none',
                                                    strokeWidth: 1,
                                                    strokeDasharray: 'none',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'miter',
                                                    strokeMiterlimit: 10,
                                                    fill: 'rgb(29,29,27)',
                                                    fillRule: 'nonzero',
                                                    opacity: 1
                                                }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
                                            <path
                                                d="M 14.446 68.039 c 7.189 -6.818 14.379 -13.635 21.568 -20.453 c 2.043 -1.938 -1.048 -5.022 -3.088 -3.088 c -7.189 6.818 -14.379 13.635 -21.568 20.453 C 9.315 66.889 12.406 69.974 14.446 68.039 L 14.446 68.039 z"
                                                style={{
                                                    stroke: 'none',
                                                    strokeWidth: 1,
                                                    strokeDasharray: 'none',
                                                    strokeLinecap: 'butt',
                                                    strokeLinejoin: 'miter',
                                                    strokeMiterlimit: 10,
                                                    fill: 'rgb(29,29,27)',
                                                    fillRule: 'nonzero',
                                                    opacity: 1
                                                }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
                                        </g>
                                    </g>
                                </svg>
                                Send OTP
                            </button>}
                            {!spinning && emailStatus === "otp" && <>
                                <button onClick={()=>setEmailStatus('email')} type="button"
                                        className="text-blue-500 bg-white hover:bg-gray-200 font-medium text-xs px-2 py-2 text-center inline-flex items-center">
                                    Edit Email
                                </button>
                                <button onClick={confirmOTP} type="button"
                                        className="text-gray-900 bg-white hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200">
                                    Confirm OTP
                                </button>
                            </>}

                        </div>

                    </div>

                    <div className="col-md-6">
                        <div className="py-2 text-dark font-medium">Gender *</div>
                        <select name={`gender1`} className="form-select" ref={register({required: true})}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors?.gender1 && <small className="text-danger">Gender is required</small>}
                    </div>
                    {/*<div className="col-md-4">*/}
                    {/*    <div className="py-2 text-dark font-medium">Age *</div>*/}
                    {/*    <input type="number" name={`age1`} ref={register({required: true})}*/}
                    {/*           className="border p-2 w-full" placeholder="Enter your age"/>*/}
                    {/*    {errors?.age1 && <small className="text-danger">Age is required</small>}*/}
                    {/*</div>*/}

                    <div className="col-md-6">
                        <div className="py-2 text-dark font-medium">Contact Number *</div>
                        <input type="number" name="phone1"
                               ref={register({required: true, minLength: 10, maxLength: 10})}
                               className="border p-2 w-full" placeholder="10-digit Mobile Number"/>
                        {errors.phone1?.type === "required" &&
                            <small className="text-danger">Phone number is required</small>}
                        {errors.phone1?.type === "minLength" &&
                            <small className="text-danger">Enter valid 10 digit mobile number</small>}
                        {errors.phone1?.type === "maxLength" &&
                            <small className="text-danger">Enter valid 10 digit mobile number</small>}
                    </div>


                    <div className="col-md-6 mt-3">
                        <div className="py-2 text-dark font-medium">Employee Name</div>
                        <span className="form-label">
                            {(employeeData && emailStatus === 'confirmed' && idStatus === 'confirmed' ) ? employeeData?.name : "N/A" }
                        </span>
                    </div>

                    <div className="col-md-6 mt-3">
                        <div className="py-2 text-dark font-medium">Employee Age</div>
                        <span className="form-label">
                            {(employeeData && emailStatus === 'confirmed' && idStatus === 'confirmed' ) ? employeeData?.age : "N/A" }
                        </span>
                    </div>

                    <div className="col-md-12 flex items-center">
                        {family ? <>
                        </> : <>
                            <div onClick={() => {
                                append({
                                    name: '',
                                    gender: '',
                                    relationshipType: '',
                                    age: '',
                                    email: '',
                                    phone: '',
                                });
                                setFamily(true)
                            }} className="text-primary font-medium my-3 cursor-pointer">
                                <span className="rounded px-1 border border-primary mr-1">+</span>
                                Add another family member
                            </div>
                        </>}
                    </div>

                    {family ? getFamilyUI() : <></>}

                    <div className="col-md-12">
                        <button
                            type={"submit"}
                                className="cursor-pointer p-2 px-3 bg-success text-white text-center w-1/2 md:w-1/6 mt-3">Continue
                        </button>
                    </div>
                </div>
            </form>

        </div>)
}
