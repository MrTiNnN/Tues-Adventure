import './tues.css'
import { FaHourglass } from 'react-icons/fa6'

const AboutTues = () => {
    return (
        <section className="section-tues" id='about-tues'>
            <div className="container tues-container">
                <div className="tues-text-box">
                    <h2 className="heading-secondary tues-heading">За ТУЕС</h2>
                    <p className='tues-text'>
                        Технологично училище „Електронни системи“ към Технически Университет - София е специализирано технологично училище от национално значение, което подготвя бъдещите лидери на ИТ сектора в България и отвъд. Възпитаниците на ТУЕС преминават през задълбочена и специализирана 5-годишна програма, която им позволява да се позиционират възможно най-бързо в технологичния сектор.
                    </p>
                    <p className="tues-text">
                        Същевременно, всички завършили ТУЕС развиват своето любопитство и способност да решават проблеми, научават се да работят в екип и да комуникират ефективно, и създават личните качества и предприемачески дух, които в дългосрочен план им помагат да ускорят своето израстване в професионален и личностен план.
                    </p>
                </div>

                <ul className="tues-statistics">
                    <li>35 годишна история</li>
                    <li>2846 завършили ученици</li>
                    <li>67 награди и отличия</li>
                </ul>
            </div>
        </section>
    )
}

export default AboutTues