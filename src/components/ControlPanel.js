import '../App.css'
import { useState, useReducer } from 'react'

const CONTROL_PANEL_STYLE = {
    position: 'absolute',
    top: '27%',
    right: 10,
    background: 'rgba(76, 175, 80, 0.25)',
    padding: 5
}

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function ControlPanel() {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    
    // handlers
    const handleSubmit = e => {
        e.preventDefault()
        setSubmitting(true);

        /*setTimeout(() => {
            setSubmitting(false);
        }, 10000);*/
    }
    const handleChange = e => {
        setFormData({
            name: e.target.name,
            value: e.target.value,
        })
    }

    return (
        <div className='controlPanel' style={CONTROL_PANEL_STYLE}>
            <h3>Submit a query:</h3>
            {submitting &&
                <div>
                    Submitting:
                    <ul>
                        {Object.entries(formData).map(([name, value]) => (
                            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                        ))}
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <span>Start Date:   </span>
                        <input type='date' name='startDate' onChange={handleChange} value={formData.startDate || ''}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <span>End Date:   </span>
                        <input type='date' name='endDate' onChange={handleChange} value={formData.endDate || ''}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <span>Cloud Cover:   </span>
                        <input type='number' name='cloudCover' onChange={handleChange} value={formData.cloudCover || ''}/>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <span>Index:   </span>
                        <select name='index' onChange={handleChange} value={formData.index || ''}>
                        <option value='NDVI'>NDVI</option>
                        <option value='NDWI'>NDWI</option>
                        <option value='NDBI'>NDBI</option>
                        <option value='NDMI'>NDMI</option>
                        </select>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <span>Satellite:   </span>
                        <select name='satellite' onChange={handleChange} >
                        <option value='sentinel-1'>Sentinel-1</option>
                        <option value='sentinel-2'>Sentinel-2</option>
                        <option value='landsat-8'>Landsat-8</option>
                        </select>
                    </label>
                </fieldset>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ControlPanel
