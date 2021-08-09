function QueryParam({ arg, intype}) {
    return (
        <>
            <p style={{float: 'left'}}>{arg}</p> <br/>
            <input style={{float: 'right'}} type={intype}></input>
        </>
    )
}

export default QueryParam
