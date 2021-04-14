export default function FailedPage (props) {
    return <div className="bg-light">
      <div className="container">  
        <img src={props.logo} alt={"Logo"} className="w-3/5 md:w-1/5 mx-auto" />
        <div className="container-fluid">
            <div className="py-10" style={{height:500}}>
                <div className="text-center text-danger text-2xl">Something went wrong or the process was cancelled by the user.</div>
                <div className="text-center text-secondary text-1xl">Your order is aborted. Retry to place Order.</div>
                {/* <div onClick={()=>window.location.reload()} className="px-4 p-1 border shadow-sm rounded text-center col-md-2 mx-auto my-3 text-primary">START Again</div> */}
            </div>
        </div>
        </div>
    </div>
}