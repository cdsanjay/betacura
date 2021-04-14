import React, { useEffect } from 'react'

export default function PaymentDetails (props) {

  const { values, family } = props
  // const [addonbar1,setAddonbar1] = React.useState(false);
  const [totalPrice,setTotalPrice] = React.useState(0)

  const customized1 = values.packageDetails[0]?.customized;
  const customized2 = values.packageDetails[1]?.customized;
  const pkgPrice1 = values.packageDetails[0]?.pkgprice;
  const pkgPrice2 = values.packageDetails[1]?.pkgprice;
  const addonPrice1 = values.packageDetails[0]?values.packageDetails[0].addonprice:0;
  const addonPrice2 = values.packageDetails[1]?values.packageDetails[1].addonprice:0;

  const employeePrice = customized1 ? ((pkgPrice1 > 2000) ? (pkgPrice1 - 2000) : 0) : 0
  
  const hcc = 250;
  
  useEffect(()=>{
    var total = 0;
    console.log(employeePrice)
    console.log(values)
    if(family){
      total += employeePrice + addonPrice1 + pkgPrice2 + addonPrice2 + (values.charge ? hcc : 0);
    }else{
      total += employeePrice + addonPrice1 + (values.charge ? hcc : 0);
    }
    setTotalPrice(total)
  },[])

  return (
    <>
      <div className="container-fluid p-4 bg-white border shadow-sm">
        <div className="row">
          <div className="mx-auto flex items-center border-b-2 py-2">
            <div className="text-dark font-medium w-3/6 md:w-4/6">Package 
            <span> {family?<> {"for "+values.employeeDetails[0]?.name} </>:<></>} </span>
            </div>
            <div className="text-dark font-medium w-1/6">Qty.</div>
            <div className="text-right text-dark font-medium w-2/6 md:w-1/6">Price</div> 
          </div> 

          <div className="mx-auto flex items-center py-1">
            <div className="w-3/6 md:w-4/6">{values.packageDetails[0].packageName}</div>
            <div className="text-dark font-medium w-1/6">  </div>
            <div className="text-right text-dark font-medium w-2/6 md:w-1/6"></div> 
          </div> 

          {values.packageDetails[0].packageName?<>
            <div className="mx-auto flex items-center">
              <div className="text-dark font-medium w-3/6 md:w-4/6">No. of tests</div>
              <div className="w-1/6">{values.packageDetails[0].count}</div>
              <div className="text-right w-2/6 md:w-1/6">
                <s>Rs. {values.packageDetails[0].pkgprice}</s>
                <div> Rs. {employeePrice} </div>
              </div> 
            </div>
            
            {customized1 && values.packageDetails[0]?.customizePackage.length > 0?<>
              <div className="mx-auto flex items-center">
                <div className="w-3/6 md:w-4/6 flex items-center my-2">
                  <select className="form-select font-medium w-3/6" aria-readonly="true">
                  <option selected={true}>Selected Customize test</option>
                      {
                  values.packageDetails[0]?.customizePackage?.map((e,k)=>(
                    <option value="0" disabled>{e}</option>
                  ))
                  }
                  </select>
                </div> 
                <div className="w-1/6"></div>
                <div className="text-right w-2/6 md:w-1/6"></div> 
              </div>
            </>:<></>}

          </>:<></>}
          
          {values.packageDetails[0].addonsArray.length > 0?<>
            <div className="text-dark font-medium w-3/6 md:w-4/6">Add on tests</div>
            <div className="mx-auto flex items-center">
              <div className="w-3/6 md:w-4/6 flex items-center my-2">
                <select className="form-select font-medium w-3/6" aria-readonly="true">
                <option selected={true}>Selected Add on Tests</option>
                    {
                values.packageDetails[0]?.addons.map((e,k)=>(
                  <option value="0" disabled>{e}</option>
                ))
                }
                </select>
              </div>

              {/* <img src="/info.png" className="mx-2 cursor-pointer" width="20px" title={
              values.packageDetails[0].addons.map((e,k)=>(
                e+", " 
              ))
              } /> </div> */}
              <div className="w-1/6">{values.packageDetails[0].addonsArray.length}</div>
              <div className="text-right w-2/6 md:w-1/6">Rs. {values.packageDetails[0].addonprice}</div> 
            </div>
          </>:<></>}    
          <hr className="my-2" /> 
          {family?<>
            <div className="mx-auto flex items-center border-b-2 py-2">
              <div className="text-dark font-medium w-3/6 md:w-4/6">Package 
              <span> {family?<> {"for "+values.employeeDetails[1]?.name} </>:<></>} </span>
              </div>
              <div className="text-dark font-medium w-1/6">Qty.</div>
              <div className="text-right text-dark font-medium w-2/6 md:w-1/6">Price</div> 
            </div> 
            <div className="mx-auto flex items-center py-1">
              <div className="w-3/6 md:w-4/6">{values.packageDetails[1].packageName}</div>
              <div className="text-dark font-medium w-1/6"></div>
              <div className="text-right text-dark font-medium w-2/6 md:w-1/6"> </div> 
            </div> 
            {values.packageDetails[1].packageName?<>
              <div className="mx-auto flex items-center">
                <div className="text-dark font-medium w-3/6 md:w-4/6">No. of tests</div>
                <div className="w-1/6">{values.packageDetails[1].count}</div>
                <div className="text-right w-2/6 md:w-1/6">
                  Rs. {values.packageDetails[1].pkgprice}
                </div> 
              </div> 
              {customized2 && values.packageDetails[1]?.customizePackage.length > 0?<>
                <div className="mx-auto flex items-center">
                  <div className="w-3/6 md:w-4/6 flex items-center my-2">
                    <select className="form-select font-medium w-3/6" aria-readonly="true">
                    <option selected={true}>Selected Customize test</option>
                        {
                    values.packageDetails[1]?.customizePackage?.map((e,k)=>(
                      <option value="0" disabled>{e}</option>
                    ))
                    }
                    </select>
                  </div> 
                  <div className="w-1/6"></div>
                  <div className="text-right w-2/6 md:w-1/6"></div> 
                </div>
              </>:<></>}
            </>:<></>}
            
            {values.packageDetails[1].addonsArray.length > 0?<>
              <div className="text-dark font-medium w-3/6 md:w-4/6">Add on tests</div>
              <div className="mx-auto flex items-center">
                <div className="w-3/6 md:w-4/6 flex items-center my-2">
                <select className="form-select font-medium w-3/6" aria-readonly="true">
            
                <option selected={true}>Selected Add on Tests</option>
                    {
                values.packageDetails[1]?.addons.map((e,k)=>(
                  <option value="0" disabled>{e}</option>
                ))
                }
                </select>
                </div>
                <div className="w-1/6">{values.packageDetails[1].addonsArray.length}</div>
                <div className="text-right w-2/6 md:w-1/6">Rs. {values.packageDetails[1].addonprice}</div> 
              </div>
            </>:<></>}
            <hr className="my-2" />
          </>:<></>}
            
          {values.charge?<>
            <div className="mx-auto flex items-center py-2">
              <div className="text-dark font-medium w-3/6 md:w-4/6">Home collection charges</div>
              <div className="text-dark font-medium w-1/6"></div>
              <div className="text-right text-dark font-medium w-2/6 md:w-1/6">
                Rs. {hcc}
                </div> 
            </div>
          </>:<></>}
          <div className="mx-auto flex items-center py-2">
            <div className="text-dark font-medium w-3/6 md:w-4/6">Total</div>
            <div className="text-dark font-medium w-1/6"></div>
            <div className="text-right text-dark font-medium w-2/6 md:w-1/6">
              Rs. {totalPrice}
              </div> 
          </div> 
            
        </div>
      </div>


      <div className="p-4 flex justify-between border bg-primary-200 shadow-sm">
        <div>
          <div className="fond-bold display-6">
            Total Rs. {totalPrice}
          </div>
          <div><a  className="text-primary cursor-pointer" onClick={e=>props.submit("ONLINE",totalPrice)}>Pay online here</a></div>
        </div>
        <div>
          <div className="fond-bold display-6">Pay by</div>
          <div><a className="text-primary cursor-pointer" onClick={e=>props.submit("CASH",totalPrice)}>Cash</a></div>
        </div>
      </div>
    </>
  ) 
}
