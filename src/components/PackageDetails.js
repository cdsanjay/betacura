import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {addons, customizePackageList, packages} from "./globalVar";

const FamilyPackage = ({setFamilyPkgIndex, setFamilyPriceIndex, familyName, values, index, register, getValues}) => {

  const [customizePrice2, setCustomizePrice2] = React.useState(0);
  const [addonPrice2, setAddonPrice2] = React.useState(0);
  const [totalPrice2, setPrice2] = React.useState(0);
  const [addonbar2, setAddonbar2] = React.useState(false);
  const [customizeBar2, setCustomizeBar2] = React.useState(false);
  const [category, setCategory] = React.useState(
      values?.packageDetails[index] ? values.packageDetails[index]?.category : ""
  );
  const packageList = [
    ...packages,
    { name: "Customize Package", price: customizePrice2, count: 0, data: [] },
  ];
  const [selectedPackage, setSelectedPackage] = React.useState(
      String(
          packageList.findIndex(
              (e) => e.name === values?.packageDetails[index]?.packageName
          )
      ) === "-1"
          ? ""
          : String(
          packageList.findIndex(
              (e) => e.name === values?.packageDetails[index]?.packageName
          )
          )
  );

  const handleChange = () => {
    const selPkg2 = getValues(`package2_${index}`) ? getValues(`package2_${index}`) : "";
    const addons2 = getValues(`addons2_${index}`);
    const customizePackage2 = getValues(`customizePackage2_${index}`);

    let price3 = 0,
        price4 = 0;
    const pkgprice = packageList[selPkg2] ? packageList[selPkg2].price : 0;
    addons2?.map((el) => {
      price3 += addons[Number(el)].price;
    });
    customizePackage2?.map((el) => {
      price4 += customizePackageList[Number(el)].price;
    });
    setAddonPrice2(price3);
    setCustomizePrice2(price4);
    const calc2 = price3 + price4 + pkgprice;
    setPrice2(calc2);
    setFamilyPriceIndex(index, calc2);
    const addonPackages2 = addons2?.map((e) => ({
      name: addons[Number(e)].value,
      price: addons[Number(e)].price,
    }));
    const customized2 = selPkg2 === "2";
    let count, pkgPrice;
    if (!customized2) {
      count = packageList[selPkg2]?.count;
      pkgPrice = packageList[selPkg2]
          ? packageList[selPkg2].price
          : 0;
    } else {
      count = customizePackage2.length;
      // pkgprice2 = customizePrice2;
    }
    var pkg = {
      packageName: packageList[selPkg2]?.name,
      pkgDesc: packageList[selPkg2]?.data.join(", "),
      addOnPackages: addonPackages2,
      count: count,
      addonsArray: addons2,
      addons: addons2?.map((e) => addons[Number(e)].value),
      customArray: customizePackage2,
      customizePackage: customizePackage2?.map(
          (e) => customizePackageList[Number(e)].value
      ),
      price: calc2,
      pkgprice: pkgPrice,
      addonprice: price3,
      customized: price4,
      category: category,
    };
    setFamilyPkgIndex(index, pkg)
  }
  return <>
    <hr className="my-3" />
    <div className="col-md-12">
      <div className="py-2 text-dark font-medium">
        Package
        <span>( For {familyName} ) </span>
        *
      </div>
      <select
          name={`category_${index}`}
          className="form-select my-1"
          defaultValue={category}
          onChange={(e) => {
            setCategory(e.target.value)
            handleChange();
          }}
      >
        <option value="">- Select -</option>
        <option value="0">Packages</option>
        <option value="1">Addons</option>
      </select>

      {category === "0" ? (
          <>
            <div>
              <select
                  name={`package2_${index}`}
                  defaultValue={selectedPackage}
                  onChange={(e) => {
                    setSelectedPackage(e.target.value);
                    handleChange();
                  }}
                  className="form-select"
                  ref={register}
              >
                <option value="">- Select Package -</option>
                {packageList.map((el, key) => (
                    <option key={key} value={key}>
                      {el.name}
                    </option>
                ))}
              </select>
              <div className="flex-row md:flex my-2">
                <div className="w-full md:w-5/6">
                  {packageList[selectedPackage]?.data.map((e, k) => (
                      <span key={k}> {e + ", "} </span>
                  ))}
                </div>
                {selectedPackage !== "2" && selectedPackage !== "" ? (
                    <div className="text-right pl-4 font-medium w-full md:w-1/6">
                      <div>
                        {" "}
                        Rs.{" "}
                        {packageList[selectedPackage]
                            ? packageList[selectedPackage].price
                            : 0}{" "}
                      </div>
                    </div>
                ) : (
                    <></>
                )}
              </div>
              <div
                  className={
                    selectedPackage === "2" ? "block" : "hidden"
                  }
              >
                <div className="accordion my-2" id="accordionExample">
                  <div className="accordion-item">
                    <h2
                        className="accordion-header"
                        onClick={(e) => setCustomizeBar2(!customizeBar2)}
                    >
                      <button
                          className={
                            customizeBar2
                                ? "accordion-button"
                                : "accordion-button collapsed"
                          }
                          type="button"
                      >
                        Customize Package{" "}
                        <span className="text-sm md:text-lg font-medium text-dark px-2">
                                  {" "}
                          (Rs. {customizePrice2} )
                                </span>
                      </button>
                    </h2>
                    <div
                        className={
                          customizeBar2
                              ? "accordion-collapse"
                              : "accordion-collapse collapse"
                        }
                    >
                      <div className="accordion-body">
                        <div className="">
                          <div className="w-full">
                            {customizePackageList.map((el, key) => (
                                <div
                                    key={key}
                                    className="flex items-start justify-between mr-1"
                                >
                                  <div className="flex items-start w-4/6">
                                    <input
                                        type="checkbox"
                                        className="m-2 ml-0"
                                        defaultValue={key}
                                        onChange={handleChange}
                                        name={`customizePackage2_${index}`}
                                        ref={register}
                                    />
                                    <div>
                                      <div className="text-lg font-medium mx-2">
                                        {el.value}{" "}
                                      </div>
                                      {el.sub.map((e, k) => (
                                          <div className="px-2" key={k}>
                                            {e}
                                          </div>
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
          </>
      ) : (
          <></>
      )}

      {category === "" ? (
          <></>
      ) : (
          <>
            <div>
              <div className="accordion my-2" id="accordionExample">
                <div className="accordion-item">
                  <h2
                      className="accordion-header"
                      onClick={(e) => setAddonbar2(!addonbar2)}
                  >
                    <button
                        className={
                          addonbar2
                              ? "accordion-button"
                              : "accordion-button collapsed"
                        }
                        type="button"
                    >
                      Add-on Tests{" "}
                      <span className="text-sm md:text-lg font-medium text-dark px-2">
                                {" "}
                        (Rs. {addonPrice2})
                              </span>
                    </button>
                  </h2>
                  <div
                      className={
                        addonbar2
                            ? "accordion-collapse"
                            : "accordion-collapse collapse"
                      }
                  >
                    <div className="accordion-body">
                      <div className="">
                        <div className="w-full">
                          {addons.map((el, key) => (
                              <div
                                  key={key}
                                  className="flex items-start justify-between mr-1"
                              >
                                <div className="flex items-start w-4/6">
                                  <input
                                      type="checkbox"
                                      className="m-2 ml-0"
                                      defaultValue={key}
                                      onChange={handleChange}
                                      name={`addons2_${index}`}
                                      ref={register}
                                  />
                                  <div>
                                    <div className="text-lg font-medium mx-2">
                                      {el.value}{" "}
                                    </div>
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
          </>
      )}
    </div>
  </>
}

export default function PackageDetails(props) {
  const discountForEmployee = parseFloat(process.env.REACT_APP_EMPLOYEE_DISCOUNT);
  const [customizePrice1, setCustomizePrice1] = React.useState(0);
  const [familyPackages, setFamilyPackages] = React.useState([]);
  const [familyPrice, setFamilyPrice] = React.useState([]);

  const setFamilyPriceIndex = (index, price) => {
    const familyPriceTemp = [...familyPrice];
    familyPriceTemp.splice(index, 1, price || 0);
    setFamilyPrice(familyPriceTemp)
  }

  const setFamilyPkgIndex = (index, pkg) => {
    const familyPkgTemp = [...familyPackages];
    familyPkgTemp.splice(index, 1, pkg || {});
    setFamilyPackages(familyPkgTemp);
  }
  const { values, setValues, handleStep, family } = props;
  useEffect(() => {
    if(values && values.employeeDetails && values.employeeDetails.length > 1){
      setFamilyPrice(new Array(values.employeeDetails.length - 1).fill(0))
      setFamilyPackages(new Array(values.employeeDetails.length - 1).fill({}))
    }
  }, [values]);

  const [addonPrice1, setAddonPrice1] = React.useState(0);

  const [totalPrice1, setPrice1] = React.useState(0);
  // const [totalPrice,setPrice] = React.useState(0);
  const [addonbar1, setAddonbar1] = React.useState(false);
  const [customizeBar1, setCustomizeBar1] = React.useState(false);

  const [category1, setCategory1] = React.useState(
      values.packageDetails[0] ? values.packageDetails[0].category : ""
  );

  const packageList = [...packages,
    { name: "Customize Package", price: customizePrice1, count: 0, data: [] },
  ];

  const [selectedPackage1, setSelectedPackage1] = React.useState(
      String(
          packageList.findIndex(
              (e) => e.name === values.packageDetails[0]?.packageName
          )
      ) === "-1"
          ? ""
          : String(
          packageList.findIndex(
              (e) => e.name === values.packageDetails[0]?.packageName
          )
          )
  );


  const hcc = parseFloat(process.env.DELIVERY_FEE);

  const [charge, setCharge] = React.useState(false);

  const { register, getValues, handleSubmit } = useForm({
    defaultValues: {
      package1:
          String(
              packageList.findIndex(
                  (e) => e.name === values.packageDetails[0]?.packageName
              )
          ) === "-1"
              ? ""
              : String(
              packageList.findIndex(
                  (e) => e.name === values.packageDetails[0]?.packageName
              )
              ),
      package2:
          String(
              packageList.findIndex(
                  (e) => e.name === values.packageDetails[1]?.packageName
              )
          ) === "-1"
              ? ""
              : String(
              packageList.findIndex(
                  (e) => e.name === values.packageDetails[1]?.packageName
              )
              ),
      addons1: values.packageDetails[0]?.addonsArray,
      addons2: values.packageDetails[1]?.addonsArray,
      customizePackage1: values.packageDetails[0]?.customArray,
      customizePackage2: values.packageDetails[1]?.customArray,
    },
  });

  // useEffect(() => {
  //   handleChange();
  // }, []);

  const handleChange = () => {
    const selPkg1 = getValues("package1") ? getValues("package1") : "";
    const selPkg2 = getValues("package2") ? getValues("package2") : "";
    const addons1 = getValues("addons1");
    const customizePackage1 = getValues("customizePackage1");
    const addons2 = getValues("addons2");
    const customizePackage2 = getValues("customizePackage2");
    var price1 = 0,
        price2 = 0;
    addons1?.map((el) => {
      price1 += addons[Number(el)].price;
    });
    customizePackage1?.map((el) => {
      price2 += customizePackageList[Number(el)].price;
    });
    setAddonPrice1(price1);
    setCustomizePrice1(price2);
    let totalCalcPrice = price1;
    if (price2 > discountForEmployee) {
      totalCalcPrice = price1 + price2 - discountForEmployee;
      setPrice1(totalCalcPrice);
    } else {
      setPrice1(price1);
    }

    // if (family) {
    //   var price3 = 0,
    //       price4 = 0;
    //   var pkgprice = packageList[selPkg2] ? packageList[selPkg2].price : 0;
    //   addons2?.map((el) => {
    //     price3 += addons[Number(el)].price;
    //   });
    //   customizePackage2?.map((el) => {
    //     price4 += customizePackageList[Number(el)].price;
    //   });
    //   setAddonPrice2(price3);
    //   setCustomizePrice2(price4);
    //   var calc2 = price3 + price4 + pkgprice;
    //   setPrice2(calc2);
    // }
    setCharge(totalCalcPrice < parseFloat(process.env.REACT_APP_FREE_DELIERY_UPTO));
    // if (family) {
    //   setCharge(
    //       (addons1?.length > 0 || addons2?.length > 0) &&
    //       selPkg1 === "" &&
    //       selPkg2 === ""
    //   );
    // } else {
    //   setCharge(addons1?.length > 0 && selPkg1 === "");
    // }
  };

  const onSubmit = (data) => {
    var addons1 = data.addons1?.map((e) => addons[Number(e)].value);
    var addons2 = data.addons2?.map((e) => addons[Number(e)].value);
    var customizePackage1 = data.customizePackage1?.map(
        (e) => customizePackageList[Number(e)].value
    );
    var customizePackage2 = data.customizePackage2?.map(
        (e) => customizePackageList[Number(e)].value
    );
    var customized1 = data.package1 === "2";
    var customized2 = data.package2 === "2";
    var pkgprice1, pkgprice2, count1, count2;
    if (!customized1) {
      count1 = packageList[data.package1]?.count;
      pkgprice1 = packageList[data.package1]?.price;
    } else {
      count1 = data.customizePackage1.length;
      pkgprice1 = customizePrice1;
    }
    if (!customized2) {
      count2 = packageList[data.package2]?.count;
      pkgprice2 = packageList[data.package2]
          ? packageList[data.package2].price
          : 0;
    } else {
      count2 = data.customizePackage2.length;
      // pkgprice2 = customizePrice2;
    }
    var addonPackages1 = data.addons1?.map((e) => ({
      name: addons[Number(e)].value,
      price: addons[Number(e)].price,
    }));
    var addonPackages2 = data.addons2?.map((e) => ({
      name: addons[Number(e)].value,
      price: addons[Number(e)].price,
    }));
    var pkg1 = {
      packageName: packageList[data.package1]?.name,
      pkgDesc: packageList[data.package1]?.data.join(", "),
      addOnPackages: addonPackages1,
      count: count1,
      addonsArray: data.addons1,
      addons: addons1,
      customArray: data.customizePackage1,
      customizePackage: customizePackage1,
      // price:price1,
      pkgprice: pkgprice1,
      addonprice: addonPrice1,
      customized: customized1,
      category: category1,
    };
    var pkg2 = {
      packageName: packageList[data.package2]?.name,
      pkgDesc: packageList[data.package2]?.data.join(", "),
      addOnPackages: addonPackages2,
      count: count2,
      addonsArray: data.addons2,
      addons: addons2,
      customArray: data.customizePackage2,
      customizePackage: customizePackage2,
      // price:price2,
      // pkgprice: pkgprice2,
      // addonprice: addonPrice2,
      customized: customized2,
      // category: category2,
    };
    console.log('familyPackages', familyPackages);
    setValues({
      ...values,
      packageDetails: family ? [pkg1, ...familyPackages] : [pkg1],
      charge: charge,
    });
    handleStep();
  };
  return (
      <div className="container-fluid p-4 bg-white border shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Package 1 */}
            <div className="col-md-12">
              <div className="py-2 text-dark font-medium">
                Package
                {family ? (
                    <>
                      <span>( For {values.employeeDetails[0]?.name} ) </span>
                    </>
                ) : (
                    <></>
                )}
                *
              </div>
              <select
                  name="category"
                  className="form-select my-1"
                  defaultValue={category1}
                  onMouseLeave={(e) => handleChange()}
                  onChange={(e) => setCategory1(e.target.value)}
              >
                <option value="">- Select -</option>
                <option value="0">Corporate Sponsored</option>
                <option value="1">Addons</option>
              </select>
              {category1 === "0" ? (
                  <>
                    <div>
                      <select
                          name={"package1"}
                          defaultValue={selectedPackage1}
                          onChange={(e) => {
                            setSelectedPackage1(e.target.value);
                            handleChange();
                          }}
                          className="form-select"
                          ref={register}
                      >
                        <option value="">- Select Package -</option>
                        {packageList.map((el, key) => (
                            <option key={key} value={key}>
                              {el.name}
                            </option>
                        ))}
                      </select>
                      <div className="flex-row md:flex my-2">
                        <div className="w-full md:w-5/6">
                          {packageList[selectedPackage1]?.data.map((e, k) => (
                              <span key={k}> {e + ", "} </span>
                          ))}
                        </div>
                        {selectedPackage1 !== "1" && selectedPackage1 !== "" ? (
                            <div className="ml-auto text-right pl-4 font-medium w-full md:w-1/6">
                              <div>
                                {" "}
                                <s>
                                  {" "}
                                  Rs.{" "}
                                  {packageList[selectedPackage1]
                                      ? packageList[selectedPackage1].price
                                      : 0}{" "}
                                </s>{" "}
                              </div>
                              <div> FREE </div>
                            </div>
                        ) : (
                            <></>
                        )}
                      </div>
                      <div
                          className={selectedPackage1 === "1" ? "block" : "hidden"}
                      >
                        <div className="accordion my-2" id="accordionExample">
                          <div className="accordion-item">
                            <h2
                                className="accordion-header"
                                onClick={(e) => setCustomizeBar1(!customizeBar1)}
                            >
                              <button
                                  className={
                                    customizeBar1
                                        ? "accordion-button"
                                        : "accordion-button collapsed"
                                  }
                                  type="button"
                              >
                                Customize Package{" "}
                                <span className="text-sm md:text-lg font-medium text-dark px-2">
                              {" "}
                                  (Rs.{" "}
                                  {customizePrice1 < discountForEmployee ? (
                                      <s> {customizePrice1} </s>
                                  ) : (
                                      <>
                                        {" "}
                                        {customizePrice1} - {discountForEmployee} ={" "}
                                        {customizePrice1 - discountForEmployee}{" "}
                                      </>
                                  )}{" "}
                                  )
                            </span>
                              </button>
                            </h2>
                            <div
                                className={
                                  customizeBar1
                                      ? "accordion-collapse"
                                      : "accordion-collapse collapse"
                                }
                            >
                              <div className="accordion-body">
                                <div className="">
                                  <div className="w-full">
                                    {customizePackageList.map((el, key) => (
                                        <div
                                            key={key}
                                            className="flex items-start justify-between mr-1"
                                        >
                                          <div className="flex items-start w-4/6">
                                            <input
                                                type="checkbox"
                                                className="m-2 ml-0"
                                                defaultValue={key}
                                                onChange={handleChange}
                                                name="customizePackage1"
                                                ref={register}
                                            />
                                            <div>
                                              <div className="text-lg font-medium mx-2">
                                                {el.value}{" "}
                                              </div>
                                              {el.sub.map((e, k) => (
                                                  <div className="px-2" key={k}>
                                                    {e}
                                                  </div>
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
                  </>
              ) : (
                  <></>
              )}

              {category1 === "" ? (
                  <></>
              ) : (
                  <>
                    <div>
                      <div className="accordion my-2" id="accordionExample">
                        <div className="accordion-item">
                          <h2
                              className="accordion-header"
                              onClick={(e) => setAddonbar1(!addonbar1)}
                          >
                            <button
                                className={
                                  addonbar1
                                      ? "accordion-button"
                                      : "accordion-button collapsed"
                                }
                                type="button"
                            >
                              Add-on Tests{" "}
                              <span className="text-sm md:text-lg font-medium text-dark px-2">
                            {" "}
                                (Rs. {addonPrice1})
                          </span>
                            </button>
                          </h2>
                          <div
                              className={
                                addonbar1
                                    ? "accordion-collapse"
                                    : "accordion-collapse collapse"
                              }
                          >
                            <div className="accordion-body">
                              <div className="">
                                <div className="w-full">
                                  {addons.map((el, key) => (
                                      <div
                                          key={key}
                                          className="flex items-start justify-between mr-1"
                                      >
                                        <div className="flex items-start w-4/6">
                                          <input
                                              type="checkbox"
                                              className="m-2 ml-0"
                                              defaultValue={key}
                                              onChange={handleChange}
                                              name="addons1"
                                              ref={register}
                                          />
                                          <div>
                                            <div
                                                className="text-lg font-medium mx-2"
                                                style={{ overflow: "hidden" }}
                                            >
                                              {el.value}{" "}
                                            </div>
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
                  </>
              )}
            </div>

            {/* Package 2 */}
            {values.employeeDetails.map((familyDetail, index) => {
              if(index === 0) return <></>;
              return <FamilyPackage setFamilyPkgIndex={setFamilyPkgIndex} setFamilyPriceIndex={setFamilyPriceIndex} getValues={getValues} familyName={familyDetail?.name} index={index-1} values={values} handleChange={handleChange} register={register()} />
            })}

            <hr className="my-3" />
            {charge ? (
                <>
                  <div className="flex items-center justify-between my-2">
                    <div className="text-lg font-medium">
                      Home Collection charge
                    </div>
                    <div className="text-lg font-medium"> Rs. {hcc} </div>
                  </div>
                </>
            ) : (
                <></>
            )}
            {/* {customizePrice1 > discountForEmployee ?<>
          <div className="flex items-center justify-between my-2">
            <div className="text-lg font-medium">Employee offer for customize package ( Rs. discountForEmployee Off ) </div>
            <div className="text-lg font-medium"> Rs. {customizePrice1} - {discountForEmployee} </div>
          </div>
          <div className="flex items-center justify-between my-2">
            <div className="text-lg font-medium"> </div>
            <div className="text-lg font-medium"> Rs. {customizePrice1 - discountForEmployee }</div>
          </div>
        </>:<></>} */}
            <div className="flex items-center justify-between my-2">
              <div className="text-lg font-medium">Total </div>
              <div className="text-lg font-medium" key={familyPrice[0]}>
                {" "}
                {/* TODO change 2nd totalPrice1 to 2 */}
                Rs. {totalPrice1 + familyPrice.reduce((acc, curr) => acc + curr, 0) + (charge ? hcc : 0)}{" "}
              </div>
            </div>

            <div className="col-md-12">
              <button
                  type="submit"
                  className="cursor-pointer p-2 px-3 bg-success text-white text-center w-1/2 md:w-1/6 mt-3"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}
