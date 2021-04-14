import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { addons, customizePackageList } from "./globalVar"

export default function PackageDetails(props){
  
  const [customizePrice1,setCustomizePrice1] = React.useState(0);
  const [customizePrice2,setCustomizePrice2] = React.useState(0);

  const packageList = [
    {name:"Package A",price:2000,count:29,data:[
      "Preliminary Test (Complete Blood Count, ESR, Urine Routine)","Diabetic Checkup (F.B.S, HBA1C)",
      "Kidney Profile (Electrolytes, BUN, Creatinine, Uric Acid, Calcium, Phosphorus)",
      "Liver Profile (Bilirubin Total, Bilirubin Direct, Bilirubin Indirect, SGOT, SGPT, Total Protien, Albumin, Globulin, Alkaline  Phosphate, Gamma G.T)",
      "Lipid Profile (Total Cholesterol, LDLC, VLDL, LDL/HDLC Ratio, TC/DLC Ratio)",
      "Physician Examination","Teleconsultation"
    ]},
    {name:"Package B",price:2000,count:23,data:[
      "Preliminary Test (Complete Blood Count, ESR, Urine Routine)","Diabetic Checkup (F.B.S, HBA1C)",
      "Kidney Profile (Electrolytes, BUN, Creatinine, Uric Acid, Calcium, Phosphorus)",
      "Lipid Profile (Total Cholesterol, LDLC, VLDL, LDL/HDLC Ratio, TC/DLC Ratio)",
      "Thyroid Profile (T3, T4, TSH)","Radiological Test (ECG)",
      "USG Abdomen","Physician Examination","Teleconsultation"
    ]},
    {name:"Customize Package",price:customizePrice2,count:0,data:[]}
  ]
  
  const { values, setValues, handleStep, family } = props
  const [addonPrice1,setAddonPrice1] = React.useState(0);
  const [addonPrice2,setAddonPrice2] = React.useState(0);
  const [totalPrice1,setPrice1] = React.useState(0);
  const [totalPrice2,setPrice2] = React.useState(0);
  // const [totalPrice,setPrice] = React.useState(0);
  const [addonbar1,setAddonbar1] = React.useState(false);
  const [addonbar2,setAddonbar2] = React.useState(false);
  const [customizeBar1,setCustomizeBar1] = React.useState(false);
  const [customizeBar2,setCustomizeBar2] = React.useState(false);
  const [category1,setCategory1] = React.useState(values.packageDetails[0]?values.packageDetails[0].category:"")
  const [category2,setCategory2] = React.useState(values.packageDetails[1]?values.packageDetails[1].category:"")
  const [selectedPackage1,setSelectedPackage1] = React.useState(String(packageList.findIndex(e=>(
    e.name===values.packageDetails[0]?.packageName
  ))) === "-1"?"":String(packageList.findIndex(e=>(
    e.name===values.packageDetails[0]?.packageName
  ))))
  const [selectedPackage2,setSelectedPackage2] = React.useState(String(packageList.findIndex(e=>(
    e.name===values.packageDetails[1]?.packageName
  ))) === "-1"?"":String(packageList.findIndex(e=>(
    e.name===values.packageDetails[1]?.packageName
  ))))

  const hcc = 250;
  
   
  const [charge,setCharge] = React.useState(false);
  
  const { register, getValues, handleSubmit } = useForm({
    defaultValues:{
      package1:String(packageList.findIndex(e=>(
        e.name===values.packageDetails[0]?.packageName
      ))) === "-1"?"":String(packageList.findIndex(e=>(
        e.name===values.packageDetails[0]?.packageName
      ))),
      package2:String(packageList.findIndex(e=>(
        e.name===values.packageDetails[1]?.packageName
      ))) === "-1"?"":String(packageList.findIndex(e=>(
        e.name===values.packageDetails[1]?.packageName
      ))),
      addons1:values.packageDetails[0]?.addonsArray,
      addons2:values.packageDetails[1]?.addonsArray,
      customizePackage1:values.packageDetails[0]?.customArray,
      customizePackage2:values.packageDetails[1]?.customArray,
    }
  });
  

  useEffect(()=>{
    handleChange() 
  },[])
  
  const handleChange = () => {
    const selPkg1 = getValues("package1")?getValues("package1"):""
    const selPkg2 = getValues("package2")?getValues("package2"):""
    const addons1 = getValues("addons1")
    const customizePackage1 = getValues("customizePackage1")
    const addons2 = getValues("addons2")
    const customizePackage2 = getValues("customizePackage2")
    var price1 = 0, price2 = 0;
    addons1?.map(el=>{
      price1 += addons[Number(el)].price
    })
    customizePackage1?.map(el=>{
      price2 += customizePackageList[Number(el)].price
    })
    setAddonPrice1(price1)
    setCustomizePrice1(price2)
    if(price2 > 2000){
      var calc1 = price1 + price2 - 2000;
      setPrice1(calc1)
    }else{
      setPrice1(price1)
    }


    if(family){
      var  price3 = 0, price4 = 0;
      var pkgprice = packageList[selPkg2]?packageList[selPkg2].price:0;
      addons2?.map(el=>{
        price3 += addons[Number(el)].price
      })
      customizePackage2?.map(el=>{
        price4 += customizePackageList[Number(el)].price
      })
      setAddonPrice2(price3)
      setCustomizePrice2(price4)
      var calc2 = price3 + price4 + pkgprice
      setPrice2(calc2)
    }
    
    if(family){
      setCharge((addons1?.length > 0 || addons2?.length > 0) && (selPkg1 === "" && selPkg2 === ""))
    }else{
      setCharge((addons1?.length > 0) && (selPkg1 === ""))
    }

  } 
 
  const onSubmit = (data) => {
    var addons1 = data.addons1?.map(e=>addons[Number(e)].value)
    var addons2 = data.addons2?.map(e=>addons[Number(e)].value)
    var customizePackage1 = data.customizePackage1?.map(e=>customizePackageList[Number(e)].value)
    var customizePackage2 = data.customizePackage2?.map(e=>customizePackageList[Number(e)].value)
    var customized1 = data.package1 === "2"
    var customized2 = data.package2 === "2"
    var pkgprice1,pkgprice2,count1,count2;
    if(!customized1){
      count1 = packageList[data.package1]?.count
      pkgprice1 = packageList[data.package1]?.price
    }else{
      count1 = data.customizePackage1.length
      pkgprice1 = customizePrice1
    }
    if(!customized2){
      count2 = packageList[data.package2]?.count
      pkgprice2 = packageList[data.package2]?packageList[data.package2].price:0
    }else{
      count2 = data.customizePackage2.length
      pkgprice2 = customizePrice2
    }
    var addonPackages1 = data.addons1?.map(e=>({name:addons[Number(e)].value,price:addons[Number(e)].price}))
    var addonPackages2 = data.addons2?.map(e=>({name:addons[Number(e)].value,price:addons[Number(e)].price}))
    var pkg1 = {
      packageName:packageList[data.package1]?.name,
      pkgDesc:packageList[data.package1]?.data.join(", "),
      addOnPackages:addonPackages1,
      count:count1,
      addonsArray:data.addons1,
      addons:addons1,
      customArray:data.customizePackage1,
      customizePackage:customizePackage1,
      // price:price1,
      pkgprice:pkgprice1,
      addonprice:addonPrice1,
      customized:customized1,
      category:category1
    }
    var pkg2 = {
      packageName:packageList[data.package2]?.name,
      pkgDesc:packageList[data.package2]?.data.join(", "),
      addOnPackages:addonPackages2,
      count:count2,
      addonsArray:data.addons2,
      addons:addons2,
      customArray:data.customizePackage2,
      customizePackage:customizePackage2,
      // price:price2,
      pkgprice:pkgprice2,
      addonprice:addonPrice2,
      customized:customized2,
      category:category2
    }
    setValues({...values,packageDetails:family?[pkg1,pkg2]:[pkg1],charge:charge})
    handleStep();
  }
  return (
  <div className="container-fluid p-4 bg-white border shadow-sm">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">  
        {/* Package 1 */} 
        <div className="col-md-12">
          <div className="py-2 text-dark font-medium">Package  
          {family?<><span>( For {values.employeeDetails[0]?.name} ) </span></>:<></>} 
          *</div>
          <select name="category" className="form-select my-1" defaultValue={category1} onMouseLeave={e=>handleChange()} onChange={e=>setCategory1(e.target.value)}>
            <option value="">- Select -</option>
            <option value="0">Corporate Sponsored</option>
            <option value="1">Addons</option>
          </select>
          {category1==="0"?<>
            <div>
              <select name={"package1"} defaultValue={selectedPackage1} onChange={e=>{setSelectedPackage1(e.target.value);handleChange();}} className="form-select" ref={register}>
                  <option value="">- Select Package -</option>
                    {packageList.map((el,key)=>(
                      <option key={key} value={key}>{el.name}</option>
                    ))}
              </select>
              <div className="flex-row md:flex my-2">
                  <div className="w-full md:w-5/6"> 
                    {packageList[selectedPackage1]?.data.map((e,k)=>(
                      <span key={k}> {e + ", "} </span>
                    ))} 
                  </div> 
                {selectedPackage1 !== "2" && selectedPackage1 !== ""?
                <div className="ml-auto text-right pl-4 font-medium w-full md:w-1/6">
                    <div> <s> Rs. {packageList[selectedPackage1]?packageList[selectedPackage1].price:0} </s> </div>
                    <div> FREE </div>
                </div>:<></>}
              </div> 
              <div className={selectedPackage1==="2"?"block":"hidden"}>
                <div className="accordion my-2" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" onClick={e=>setCustomizeBar1(!customizeBar1)}>
                      <button className={customizeBar1?"accordion-button":"accordion-button collapsed"} type="button">
                      Customize Package <span className="text-sm md:text-lg font-medium text-dark px-2"> (Rs.  {customizePrice1<2000?<s> {customizePrice1} </s>:<> {customizePrice1} - 2000 = {customizePrice1-2000} </>} )</span>
                      </button>
                    </h2>
                    <div className={customizeBar1?"accordion-collapse":"accordion-collapse collapse"}>
                      <div className="accordion-body">
                        <div className=""> 
                          <div className="w-full">
                            {customizePackageList.map((el,key)=>(
                              <div key={key} className="flex items-start justify-between mr-1">
                                <div className="flex items-start w-4/6">
                                  <input type="checkbox" className="m-2 ml-0" defaultValue={key} onChange={handleChange} name="customizePackage1" ref={register} />
                                  <div>
                                    <div className="text-lg font-medium mx-2">{el.value} </div>
                                    {el.sub.map((e,k)=>(
                                      <div className="px-2" key={k}>{e}</div>
                                    ))}
                                  </div>
                                </div>
                                <div>Rs. {el.price} </div>
                              </div>
                            ))} 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>:<></>}
 
          {category1===""?<></>:<>
            <div>
              <div className="accordion my-2" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" onClick={e=>setAddonbar1(!addonbar1)}>
                    <button className={addonbar1?"accordion-button":"accordion-button collapsed"} type="button">
                    Add-on Tests <span className="text-sm md:text-lg font-medium text-dark px-2"> (Rs. {addonPrice1})</span>
                    </button>
                  </h2>
                  <div className={addonbar1?"accordion-collapse":"accordion-collapse collapse"}>
                    <div className="accordion-body">
                      <div className=""> 
                        <div className="w-full">
                          {addons.map((el,key)=>(
                            <div key={key} className="flex items-start justify-between mr-1">
                              <div className="flex items-start w-4/6">
                                <input type="checkbox" className="m-2 ml-0" defaultValue={key} onChange={handleChange} name="addons1" ref={register} />
                                <div>
                                  <div className="text-lg font-medium mx-2" style={{overflow:"hidden"}}>{el.value} </div>
                                </div>
                              </div>
                              <div>Rs. {el.price} </div>
                            </div>
                          ))} 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}

        </div>
            

        {/* Package 2 */}
        {family?<>
          <hr className="my-3" />
          <div className="col-md-12">
            <div className="py-2 text-dark font-medium">Package  
            {family?<><span>( For {values.employeeDetails[1]?.name} ) </span></>:<></>} 
            *</div>
            <select name="category" className="form-select my-1" defaultValue={category2} onMouseLeave={e=>handleChange()} onChange={e=>setCategory2(e.target.value)}>
              <option value="">- Select -</option>
              <option value="0">Packages</option>
              <option value="1">Addons</option>
            </select>

            {category2==="0"?<>
              <div>
                <select name={"package2"} defaultValue={selectedPackage2} onChange={(e)=>{setSelectedPackage2(e.target.value);handleChange()}} className="form-select" ref={register}>
                    <option value="">- Select Package -</option>
                    {packageList.map((el,key)=>(
                      <option key={key} value={key}>{el.name}</option>
                    ))}
                </select>
                <div className="flex-row md:flex my-2">
                  <div className="w-full md:w-5/6">
                    {packageList[selectedPackage2]?.data.map((e,k)=>(
                      <span key={k}> {e + ", "} </span>
                    ))}
                  </div>
                  {selectedPackage2 !== "2" && selectedPackage2 !== ""?
                  <div className="text-right pl-4 font-medium w-full md:w-1/6">
                      <div> Rs. {packageList[selectedPackage2]?packageList[selectedPackage2].price:0} </div>
                  </div>:<></>}
                </div>  
                <div className={selectedPackage2==="2"?"block":"hidden"}>
                  <div className="accordion my-2" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" onClick={e=>setCustomizeBar2(!customizeBar2)}>
                        <button className={customizeBar2?"accordion-button":"accordion-button collapsed"} type="button">
                        Customize Package <span className="text-sm md:text-lg font-medium text-dark px-2"> (Rs. {customizePrice2} )</span>
                        </button>
                      </h2>
                      <div className={customizeBar2?"accordion-collapse":"accordion-collapse collapse"}>
                        <div className="accordion-body">
                          <div className=""> 
                            <div className="w-full">
                              {customizePackageList.map((el,key)=>(
                                <div key={key} className="flex items-start justify-between mr-1">
                                  <div className="flex items-start w-4/6">
                                    <input type="checkbox" className="m-2 ml-0" defaultValue={key} onChange={handleChange} name="customizePackage2" ref={register} />
                                    <div>
                                      <div className="text-lg font-medium mx-2">{el.value} </div>
                                      {el.sub.map((e,k)=>(
                                        <div className="px-2" key={k}>{e}</div>
                                      ))}
                                    </div>
                                  </div>
                                  <div>Rs. {el.price} </div>
                                </div>
                              ))} 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </>:<></>}

            {category2===""?<></>:<>
              <div>
                <div className="accordion my-2" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" onClick={e=>setAddonbar2(!addonbar2)}>
                      <button className={addonbar2?"accordion-button":"accordion-button collapsed"} type="button">
                      Add-on Tests <span className="text-sm md:text-lg font-medium text-dark px-2"> (Rs. {addonPrice2})</span>
                      </button>
                    </h2>
                    <div className={addonbar2?"accordion-collapse":"accordion-collapse collapse"}>
                      <div className="accordion-body">
                        <div className=""> 
                          <div className="w-full">
                            {addons.map((el,key)=>(
                              <div key={key} className="flex items-start justify-between mr-1">
                                <div className="flex items-start w-4/6">
                                  <input type="checkbox" className="m-2 ml-0" defaultValue={key} onChange={handleChange} name="addons2" ref={register} />
                                  <div>
                                    <div className="text-lg font-medium mx-2">{el.value} </div>
                                  </div>
                                </div>
                                <div>Rs. {el.price} </div>
                              </div>
                            ))} 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>}


          </div> 
        </>:<></>}

        <hr className="my-3" />
        {charge?<>
          <div className="flex items-center justify-between my-2">
            <div className="text-lg font-medium">Home Collection charge</div>
            <div className="text-lg font-medium"> Rs. {hcc} </div>
          </div> 
        </>:<></>}
        {/* {customizePrice1 > 2000 ?<>
          <div className="flex items-center justify-between my-2">
            <div className="text-lg font-medium">Employee offer for customize package ( Rs. 2000 Off ) </div>
            <div className="text-lg font-medium"> Rs. {customizePrice1} - 2000 </div>
          </div>
          <div className="flex items-center justify-between my-2">
            <div className="text-lg font-medium"> </div>
            <div className="text-lg font-medium"> Rs. {customizePrice1 - 2000 }</div>
          </div>
        </>:<></>} */}
        <div className="flex items-center justify-between my-2">
          <div className="text-lg font-medium">Total  </div>
          <div className="text-lg font-medium"> Rs. {totalPrice1 + totalPrice2 + (charge ? hcc : 0)} </div>
        </div>

        <div className="col-md-12">
          <button type="submit" className="cursor-pointer p-2 px-3 bg-success text-white text-center w-1/2 md:w-1/6 mt-3">Continue</button>
        </div>
      </div>
    </form>

  </div>
  )
        
}
