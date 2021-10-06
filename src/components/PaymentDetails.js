import React, { useEffect } from "react";

export default function PaymentDetails(props) {
  const { values, family } = props;
  // const [addonbar1,setAddonbar1] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [ack, setAck] = React.useState(false);

  const customized1 = values.packageDetails[0]?.customized;
  const pkgPrice1 = values.packageDetails[0]?.pkgprice;
  const addonPrice1 = values.packageDetails[0]
      ? values.packageDetails[0].addonprice
      : 0;
  const employeePrice = customized1
      ? pkgPrice1 > 2000
          ? pkgPrice1 - 2000
          : 0
      : 0;

  const hcc = parseFloat(process.env.REACT_APP_DELIVERY_FEE);

  useEffect(() => {
    let total = 0;
    console.log(employeePrice);
    console.log(values);
    if (family) {
      for(const [index, family] of values.employeeDetails?.entries()){
        if(index === 0) {
          //   do nothing
        }
        else {
          const pkgPrice2 = values?.packageDetails[index] ? (values?.packageDetails[index]?.pkgprice || values?.packageDetails[index]?.customized) : 0;
          const addonPrice2 = values.packageDetails[index]
              ? values.packageDetails[index].addonprice
              : 0;

          total += pkgPrice2 +
              addonPrice2;
        }
      }
      total +=
          employeePrice +
          addonPrice1 +
          (values.charge ? hcc : 0);
    } else {
      total += employeePrice + addonPrice1 + (values.charge ? hcc : 0);
    }
    setTotalPrice(total);
  }, []);

  return (
      <>
        <div className="container-fluid p-4 bg-white border shadow-sm">
          {values.employeeDetails?.map((item, index) => {
            return (
                <div className="row">
                  <div className="mx-auto flex items-center border-b-2 py-2">
                    <div className="text-dark font-medium w-3/6 md:w-4/6">
                      Package
                      <span> for {item?.name}</span>
                    </div>
                    <div className="text-dark font-medium w-1/6">Qty.</div>
                    <div className="text-right text-dark font-medium w-2/6 md:w-1/6">
                      Price
                    </div>
                  </div>

                  <div className="mx-auto flex items-center py-1">
                    <div className="w-3/6 md:w-4/6">
                      {values.packageDetails[index].packageName}
                    </div>
                    <div className="text-dark font-medium w-1/6"></div>
                    <div className="text-right text-dark font-medium w-2/6 md:w-1/6"></div>
                  </div>

                  {values.packageDetails[index].packageName ? (
                      <>
                        <div className="mx-auto flex items-center">
                          <div className="text-dark font-medium w-3/6 md:w-4/6">
                            No. of tests
                          </div>
                          <div className="w-1/6">{values.packageDetails[index].count}</div>
                          <div className="text-right w-2/6 md:w-1/6">
                            {index === 0 && <s>Rs. {values.packageDetails[0].pkgprice}</s>}
                            <div> Rs. {index === 0 ? employeePrice : values.packageDetails[index].pkgprice || values?.packageDetails[index]?.customized} </div>
                          </div>
                        </div>

                        {/*{values?.packageDetails[index]?.customized &&*/}
                        {/*values.packageDetails[index]?.customizePackage?.length > 0 ? (*/}
                        {/*    <>*/}
                        {/*      <div className="mx-auto flex items-center">*/}
                        {/*        <div className="w-3/6 md:w-4/6 flex items-center my-2">*/}
                        {/*          <select*/}
                        {/*              className="form-select font-medium w-3/6"*/}
                        {/*              aria-readonly="true"*/}
                        {/*          >*/}
                        {/*            <option selected={true}>Selected Customize test</option>*/}
                        {/*            {values.packageDetails[index]?.customizePackage?.map(*/}
                        {/*                (e, k) => (*/}
                        {/*                    <option value="0" disabled>*/}
                        {/*                      {e}*/}
                        {/*                    </option>*/}
                        {/*                )*/}
                        {/*            )}*/}
                        {/*          </select>*/}
                        {/*        </div>*/}
                        {/*        <div className="w-1/6"></div>*/}
                        {/*        <div className="text-right w-2/6 md:w-1/6"></div>*/}
                        {/*      </div>*/}
                        {/*    </>*/}
                        {/*) : (*/}
                        {/*    <></>*/}
                        {/*)}*/}
                      </>
                  ) : (
                      <></>
                  )}

                  {/*{values.packageDetails[index].addonsArray.length > 0 ? (*/}
                  {/*    <>*/}
                  {/*      <div className="text-dark font-medium w-3/6 md:w-4/6">*/}
                  {/*        Add on tests*/}
                  {/*      </div>*/}
                  {/*      <div className="mx-auto flex items-center">*/}
                  {/*        <div className="w-3/6 md:w-4/6 flex items-center my-2">*/}
                  {/*          <select*/}
                  {/*              className="form-select font-medium w-3/6"*/}
                  {/*              aria-readonly="true"*/}
                  {/*          >*/}
                  {/*            <option selected={true}>Selected Add on Tests</option>*/}
                  {/*            {values.packageDetails[index]?.addons.map((e, k) => (*/}
                  {/*                <option value="0" disabled>*/}
                  {/*                  {e}*/}
                  {/*                </option>*/}
                  {/*            ))}*/}
                  {/*          </select>*/}
                  {/*        </div>*/}
                  {/*        <div className="w-1/6">*/}
                  {/*          {values.packageDetails[index].addonsArray.length}*/}
                  {/*        </div>*/}
                  {/*        <div className="text-right w-2/6 md:w-1/6">*/}
                  {/*          Rs. {values.packageDetails[index].addonprice}*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*    </>*/}
                  {/*) : (*/}
                  {/*    <></>*/}
                  {/*)}*/}
                  <hr className="my-2" />
                </div>
            );
          })}

        </div>

        <div style={{
          padding: 16
        }}>
          <input checked={ack} type="checkbox"  name="id" className="m-lg-2"  onChange={({target: {checked}}) => setAck(checked)} />
          <span>
            I understand.
          </span>
          <br />
          <span>
            Disclaimer:- This is to inform that your health screening reports will be shared with your company Human Resource Team. Please acknowledge this by placing tick on the given box.
          </span>
          <br />
          <br />
        {ack || <small className="text-danger">Before proceeding, you must agree.</small>}
        </div>



        <div className="p-4 flex justify-between border bg-primary-200 shadow-sm">
          <div>
            <div className="fond-bold display-6">Total Rs. {totalPrice}</div>
            <div>
              {totalPrice !== 0 && <button
                  disabled={totalPrice === 0 || !ack}
                  onClick={(e) => props.submit("ONLINE", totalPrice)}
                  className="cursor-pointer p-2 px-3 bg-success text-white text-center  mt-3"
              >
                Pay online here
              </button>}
            </div>
          </div>
          <div>
            {totalPrice !== 0 && <div className="fond-bold display-6">Pay by</div>}
            <div>
              <button
                  disabled={!ack}
                  onClick={(e) => props.submit("CASH", totalPrice)}
                  className={`cursor-pointer p-2 px-3 ${ack ? "bg-success" : "bg-secondary"} text-white text-center  mt-3`}
              >
                {totalPrice=== 0 ? "Submit" : "Cash"}
              </button>
            </div>
          </div>
        </div>
      </>
  );
}
