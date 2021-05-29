export default function SuccessPage (props) {
    return <div className="bg-light">
      <div className="container">
        <img src={props.logo} alt={"Logo"} className="w-3/5 md:w-1/5 mx-auto" />
        <div className="container-fluid">
            <div className="py-10" style={{height:500}}>
                <div className="text-center text-2xl">Thank you for choosing your Wellness Health Screening and placing your request with us.</div>
                <div className="text-center text-secondary text-1xl">Your case will be allocated to dedicated case manager and
                you will be contacted within 24 working hours. Please inbox us at <a className="text-primary" href={`mail://${process.env.REACT_APP_FORM_SEND_EMAIL}`}>{process.env.REACT_APP_FORM_SEND_EMAIL} </a>
                if you have any questions. You can explore more about us by hitting on <a className="text-primary" href="http://www.betacura.com">www.betacura.com</a> </div>
                {/* <div onClick={()=>window.location.reload()} className="px-4 p-1 border shadow-sm rounded text-center col-md-2 mx-auto my-3 text-primary">START Again</div> */}
            </div>
        </div>
        </div>
    </div>
}
