import '../App.css'
import QueryField from './QueryField';

const CONTROL_PANEL_STYLE = {
    position: 'absolute',
    top: '27%',
    right: 10,
    background: 'rgba(76, 175, 80, 0.25)',
    padding: 5
}

function ControlPanel({ formData, submitForm, handleChange, handleSubmit}) {

    return (
        <div className='queryForm' style={CONTROL_PANEL_STYLE}>
            <h3>Submit a Query:</h3>
            {submitForm &&
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
                <QueryField 
                    title='Start Date:   ' 
                    type='date' 
                    name='startDate' 
                    value={formData.startDate || ''} 
                    onChange={handleChange}
                />
                <QueryField 
                    title='End Date:   ' 
                    type='date' 
                    name='endDate' 
                    value={formData.endDate || ''} 
                    onChange={handleChange}
                />
                <QueryField 
                    title='Cloud Cover:   ' 
                    type='number' 
                    name='cloudCover' 
                    value={formData.cloudCover || ''} 
                    onChange={handleChange}
                />
                <QueryField 
                    title='Satellite:   ' 
                    type='string' 
                    name='satellite' 
                    value={formData.satellite || ''} 
                    onChange={handleChange}
                />
                <QueryField 
                    title='Index:   ' 
                    type='string' 
                    name='index' 
                    value={formData.index || ''} 
                    onChange={handleChange}
                />
                <button type='submit'>Submit Query</button>
            </form>
        </div>
    )
}

export default ControlPanel;