module.exports = {
    generic: {
        subject: (subject) => subject || 'Betacura',
        html: (body) => {
            return `<html>
        <head>
          <meta charSet="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1">

                <style>
                  body {
                  font - family: "Open Sans", sans-serif;
                  line-height: 1.25;
                }

                  table {
                  border: 1px solid #ccc;
                  border-collapse: collapse;
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  table-layout: fixed;
                }

                  table caption {
                  font - size: 1.5em;
                  margin: .5em 0 .75em;
                }

                  table tr {
                  background - color: #f8f8f8;
                  border: 1px solid #ddd;
                  padding: .35em;
                }

                  table th,
                  table td {
                  padding: .625em;
                  text-align: center;
                }

                  table th {
                  font - size: .85em;
                  letter-spacing: .1em;
                  text-transform: uppercase;
                }
                  .wrapper table tbody tr .head{
                  font - weight: 600;
                }
                  @media screen and (max-width: 600px) {
                  table {
                  border: 0;
                }

                  table caption {
                  font-size: 1.3em;
                }

                  table thead {
                  border: none;
                  clip: rect(0 0 0 0);
                  height: 1px;
                  margin: -1px;
                  overflow: hidden;
                  padding: 0;
                  position: absolute;
                  width: 1px;
                }

                  table tr {
                  border-bottom: 3px solid #ddd;
                  display: block;
                  margin-bottom: .625em;
                }


                  table td {
                  border-bottom: 1px solid #ddd;
                  display: block;
                  font-size: .8em;
                }

                  table td::before {
                  /*
                  * aria-label has no advantage, it won't be read inside a table
                  content: attr(aria-label);
                  */
                  content: attr(data-label);
                  float: left;
                  font-weight: bold;
                  text-transform: uppercase;
                }

                  table td:last-child {
                  border-bottom: 0;
                }
                }

                </style>
        </head>
        <body>

        <div className="wrapper">

          <table>
            <caption>New Policy Appointment for Employee ${body?.employeeName} - ${body?.employeeId}</caption>
            <tbody>
            <tr>
              <td className="head">Appointment</td>
              <!-- table -->
              <td>
                <table>
                  <tr>
                    <td className="head">Date 1</td>
                    <td>${body?.packageDetails && body?.packageDetails[0] && body?.packageDetails[0]?.appointment?.date1}</td>
                  </tr>
                   <tr>
                    <td className="head">Time 1</td>
                    <td>${body?.packageDetails && body?.packageDetails[0] && body?.packageDetails[0]?.appointment?.time1}</td>
                  </tr>
                 <tr>
                    <td className="head">Date 2</td>
                    <td>${body?.packageDetails && body?.packageDetails[0] && body?.packageDetails[0]?.appointment?.date2}</td>
                  </tr>
                   <tr>
                    <td className="head">Time 2</td>
                    <td>${body?.packageDetails && body?.packageDetails[0] && body?.packageDetails[0]?.appointment?.time2}</td>
                  </tr>
                </table>
              </td>
            </tr>
                    
             <tr>
              <td style="font-weight: bold" className="head">EmployeeId</td>
              <td style="font-weight: bold">${body?.employeeId}</td>
            </tr>
            <tr>
              <td style="font-weight: bold" className="head">EmployeeName</td>
              <td style="font-weight: bold">${body?.employeeName}</td>
            </tr>
            <tr>
              <td className="head">Payment Mode</td>
              <td>${body.paymentMode}</td>
            </tr>
            <tr>
              <td className="head">Total Amount</td>
              <td>${body.totalprice}</td>
            </tr>
            <tr>
              <td className="head">Email</td>
              <td>${body?.email}</td>
            </tr>
           
            <tr>
              <td className="head">Mobile</td>
              <td>${body.mobile}</td>
            </tr>
            <!-- packge table -->
            <tr>
              <td className="head">PackageDetails</td>

              <td>
                <!-- first details -->
                ${body?.packageDetails?.map((employee, index) => {
                return `<table>

                    <tr>
                      <td className="head">Name</td>
                      <td>${employee?.name}</td>
                    </tr>
                    <tr>
                      <td className="head">Email</td>
                      <td>${employee?.email}</td>
                    </tr>
                    <tr>
                      <td className="head">Mobile</td>
                      <td>${employee?.mobile}</td>
                    </tr>
                    <tr>
                      <td className="head">RelationshipType</td>
                      <td>${employee?.relationshipType}</td>
                    </tr>
                    ${employee?.gender ? `<tr>
                      <td className="head">Gender</td>
                      <td>${employee?.gender}</td>
                    </tr>` : "" }
                   ${employee?.age ?  `<tr>
                      <td className="head">Age</td>
                      <td>${employee?.age}</td>
                    </tr>` : ""}
                    <tr>
                      <td className="head">Address</td>
                      <td>
                        <table>
                          <tr>
                            <td className="head">State</td>
                            <td>${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.appointment?.state || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="head">City</td>
                            <td>${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.appointment?.city || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="head">Locality</td>
                            <td>${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.appointment?.locality || "N/A"}</td>
                          </tr>
                          <tr>
                            <td className="head">Address</td>
                            <td>${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.appointment?.address || "N/A"}</td>
                          </tr>
                           <tr>
                            <td className="head">Landmark</td>
                            <td>${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.appointment?.landmark || "N/A"}</td>
                          </tr>
                           <tr>
                            <td className="head">Zip Code</td>
                            <td>${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.appointment?.zipCode || "N/A"}</td>
                          </tr>
                        </table>
                    </td>
                    </tr>
                    
                    <tr>
                      <td className="head">Packages</td>
                      <!-- table  -->
                      <td>
                        <table>
                          <tr>
                            <td className="head">Package Name</td>
                            <td>${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.packages?.packageName}</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>`
            })}
              </td>


            </tr>
            <!-- packge table end-->

            <tr>
              <td className="head">PaymentMode</td>
              <td>${body.paymentMode}</td>
            </tr>
            <tr>
              <td style="font-weight: bold" className="head">Totalprice</td>
              <td style="font-weight: bold">${body.totalprice}</td>
            </tr>
            </tbody>
          </table>
        </div>
        </body>
        </html>`

        },
    },
    otp: {
        subject: () => 'Betacura | Email Verification',
        html: (otp) =>  {
            return `<html>
        <head>
          <meta charSet="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1">

                <style>
                  @import url("https://fonts.googleapis.com/css?family=Open+Sans");
* {
  box-sizing: border-box;
}

body {
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-email {
  width: 40vw;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);
}
.c-email__header {
  background-color: #0fd59f;
  width: 100%;
  height: 60px;
}
.c-email__header__title {
  font-size: 23px;
  font-family: "Open Sans";
  height: 60px;
  line-height: 60px;
  margin: 0;
  text-align: center;
  color: white;
}
.c-email__content {
  width: 100%;
  height: 300px;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*justify-content: space-around;*/
  /*align-items: center;*/
  /*flex-wrap: wrap;*/
  background-color: #fff;
  padding: 15px;
}
.c-email__content__text {
  font-size: 20px;
  text-align: center;
  color: #343434;
  margin-top: 0;
}
.c-email__code {
  display: block;
  width: 60%;
  margin: 30px auto;
  background-color: #ddd;
  border-radius: 40px;
  padding: 20px;
  text-align: center;
  font-size: 36px;
  font-family: "Open Sans";
  letter-spacing: 10px;
  box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, 0.1);
}
.c-email__footer {
  width: 100%;
  height: 60px;
  background-color: #fff;
}

.text-title {
  font-family: "Open Sans";
}

.text-center {
  text-align: center;
}

.text-italic {
  font-style: italic;
}

.opacity-30 {
  opacity: 0.3;
}

.mb-0 {
  margin-bottom: 0;
}
                </style>
        </head>
        <body>

        <div className="wrapper">

         <div class="c-email">  
  <div class="c-email__header">
    <h1 class="c-email__header__title">Your Verification Code</h1>
  </div>
  <div class="c-email__content">
    <p class="c-email__content__text text-title">
      Enter this verification code in field:
    </p>
    <div class="c-email__code">
      <span class="c-email__code__text">${otp}</span>
    </div>
    <p class="c-email__content__text text-italic opacity-30 text-title mb-0">Verification code is valid only for 30 minutes</p>
  </div>
  <div class="c-email__footer"></div>
</div>
        </div>
        </body>
        </html>`

        },
    }
};
