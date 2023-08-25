export function NumberInput({labelText, htmlName, value, setValue, nameClass='form-control', setNameClass}) {
    return (
        <div className="mb-3 w-50">
            <label htmlFor={htmlName} className="form-label required">{labelText}</label>
            <input type="text" className={nameClass} name={htmlName} id={htmlName}
                   value={value}
                   onChange={e=> {
                       const val = e.target.value.replace(/\D/g, "");
                       setValue(val);
                       // Will cancel red borders when input is valid
                       if (val !== '' && setNameClass) {
                           setNameClass(`form-control`);
                       }
                   }}
            />
            <div className="valid-feedback">
                Correct
            </div>
        </div>
    );
}

export function TextInput({labelText, htmlName, value, setValue, nameClass='form-control', setNameClass= e=> {}}) {
    return (
        <div className="mb-3 w-50">
            <label htmlFor={htmlName} className="form-label">{labelText}</label> <br/>
            <input type="text" className={nameClass} name={htmlName} id={htmlName}
                   value={value}
                   onChange={e=> {
                       const val = e.target.value;
                       setValue(val);
                       // Will cancel red borders when input is valid
                       if (val !== '' && setNameClass) {
                           setNameClass(`form-control`);
                       }
                   }}
            />
            <div className="valid-feedback">
                Correct
            </div>
        </div>
    );
}

export function SelectInput({labelText, htmlName, value, setValue, options}) {
    return (
        <div className="mb-3 w-50">
            <label htmlFor={htmlName} className="form-label">{labelText}</label>
            <select className="form-select" name={htmlName} id={htmlName}
                    value={value}
                    onChange={e => setValue(e.target.value)}>
                {options.map(item => {
                    return (<option key={item.value} value={item.value}>{item.text}</option>)
                })}
            </select>
        </div>
    );
}

export function LogBox({value}) {
    return (
        <div className="log-box">
            <code className="log-text">{value}</code>
        </div>
    );
}
