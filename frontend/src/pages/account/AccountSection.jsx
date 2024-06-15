import wave from '../../img/wave1.png'

const AccountSection = ({ children }) => {
    return (
        <section className="section account-section">
            <div className="account-img">
                <img src={wave} className="account-wave"/>
            </div>

            <div className='account-container'>
                { children }
            </div>
        </section>
    )
}

export default AccountSection