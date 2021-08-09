import '../App.css'
import QueryParam from './QueryParam'

const CONTROL_PANEL_STYLE = {
    position: 'absolute',
    top: '27%',
    right: 10,
    background: 'rgba(76, 175, 80, 0.25)',
    padding: 5
}
function ControlPanel() {
    return (
        <div className='controlPanel' style={CONTROL_PANEL_STYLE}>
            <h3>Submit a query:</h3>
            <form>
                <QueryParam arg='Start Date' intype='date'/> <br/>
                <QueryParam arg='End Date' intype='date'/> <br/>
                <QueryParam arg='Cloud Cover' intype='number'/> <br/>
                <QueryParam arg='Index' intype='text'/> <br/>
            </form>
        </div>
    )
}

export default ControlPanel
