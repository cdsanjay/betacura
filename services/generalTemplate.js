const getTemplate = require('./partialTemplate');

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
            <tr>
              <td className="head">ID Type</td>
              <td>${body.identificationType}</td>
            </tr>
            <tr>
              <td className="head">ID Type</td>
              <td>
                <img src="${body.identificationDocUrl}" width="150" alt="${body.identificationType}" />
              </td>
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
                          ${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.packages?.customized ? `<tr>
                            <td className="head">Package Description</td>
                            <td>${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.packages?.customized}</td>
                          </tr>` : ``}
                          <tr>
                            <td className="head">AddOnPackages</td>
                            <!-- table -->
                            <td>
                                ${body?.packageDetails && body?.packageDetails[index] && body?.packageDetails[index]?.packages?.addOnPackages?.map((addon, index) => {
                                  return `<table>
                                <tr>
                                   <td>${index+1}</td>
                                  <td className="head">${addon?.name}</td>
                                  <td className="head">${addon?.price}</td>
                                </tr>
                              </table>`
                  })}
                            </td>
                            <!-- table end -->
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
};
