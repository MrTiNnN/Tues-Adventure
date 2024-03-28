import './hero.css'

const Hero = () => {
    return (
        <section className="section section-hero">
            
            <div className="container container-hero">
                <div className="hero-text-box">

                    <h1 className='heading-primary hero-title'>Adventure Club Tues</h1>

                    <p className="hero-text">
                        Програмата ще включва разходки, планинско колоездене, къмпингуване, каяци, катерене и други. Ако искате да дойдете с нас през уикендите или ваканциите, включете се в клуба! Свържете се с мен, ако имате някакви въпроси.
                    </p>

                    {/* <button className="btn">Запиши се</button> */}

                    <div className="hero-cta">
                        <input 
                            type="text"
                            placeholder='martin.v.velchev.2022@elsys-bg.org'
                        />
                        <button className='btn'>Запиши се</button>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Hero