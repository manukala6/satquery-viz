function QueryParam({ arg, intype, change}) {
    return (
        <>
            <p style={{float: 'left'}}>{arg}</p> <br/>
            <input style={{float: 'right'}} type={intype} onChange={change}></input>
        </>
    )
}

export default QueryParam
