function QueryField({ title, type, name, onChange, value }) {

    return (
        <fieldset>
            <label>
                <span>{title}</span>
                <input type={type} name={name} value={value} onChange={onChange} />
            </label>
        </fieldset>
    )
}

export default QueryField;