import React from 'react';

const InputField = ({type, value, onchange,placeholder}) =>{
    return(
        <div className='input-field'>
            <input
                type={type}
                value={value}
                onchange={onchange}
                placeholder={placeholder}
                required
            />
        </div>
    )
}

export default InputField;