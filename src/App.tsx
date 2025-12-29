import { useCallback, useEffect, useState } from 'react'
import logo from './assets/A&H logo no background.png'
import janney from './assets/Guangyan Liu.jpg'
import ContactForm from './components/ContactForm'

function App() {
  const [activeSection, setActiveSection] = useState('introduction')

  const getNavHeight = useCallback(() => {
    const nav = document.getElementById('site-nav')
    return nav?.offsetHeight ?? 80
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['introduction', 'how-it-works', 'testimonials', 'services', 'contact']
      const scrollPosition = window.scrollY + getNavHeight() + 40

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = getNavHeight()
      const elementPosition = element.offsetTop - navHeight - 12
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        id="site-nav"
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
        aria-label="Primary navigation"
      >
        <div className="max-w-7xl mx-auto px-7 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 sm:py-0 sm:h-20">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-emerald-700 transition-colors text-left"
              aria-label="Back to top"
            >
              Acupuncture & Herbs
            </button>

            {/* Tabs: horizontal scroll on mobile, standard on larger screens */}
            <div className="-mx-7 sm:mx-0 px-7 sm:px-0">
              <div
                className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:overflow-visible sm:whitespace-normal"
                aria-label="Page sections"
              >
              {[
                { id: 'introduction', label: 'Introduction' },
                { id: 'how-it-works', label: 'How it works' },
                { id: 'testimonials', label: 'Testimonials' },
                { id: 'services', label: 'Services' },
                { id: 'contact', label: 'Contact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`shrink-0 px-3 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base rounded-lg font-medium transition-all duration-200 ${activeSection === tab.id
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-emerald-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header with Logo */}
      <div className="relative bg-stone-50 pt-40 sm:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-7 sm:px-8 lg:px-10">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="sr-only">Acupuncture &amp; Herbs</h1>
            <img
              src={logo}
              alt="Acupuncture & Herbs logo"
              className="h-auto max-w-2xl w-full mb-6"
              loading="eager"
            />
            <p className="text-xl text-stone-700 mb-2">
              Acupuncture. Herbs. Wisdom.
            </p>
            <p className="text-lg text-stone-600">
              On the Road to Wellness
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <main aria-label="Main content">
        {/* Introduction Section */}
        <section id="introduction" className="py-20 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-7 sm:px-8 lg:px-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-stone-800 mb-4">Introduction</h2>
              <div className="w-24 h-1 bg-emerald-700 mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto text-lg text-stone-700 leading-relaxed space-y-6">
              <p>
                We are an ethical, newly formed company with staff based in the U.K. for over 15 years.
              </p>
              <p>
                We use Traditional Chinese medicine, a renowned form of alternative medicine. Treatments we offer include acupuncture, cupping, and herbs for a wide range of health problems.
              </p>
              <p>
                Our body is a small universe within a big universe. By researching its motion law, the force can be calculated. The motion of the sun and the moon affect our body’s flow of energy the most. A powerful example of the moon’s influence on Earth is the tides flowing in and out.
              </p>
              <div className="bg-white p-6 rounded-lg my-8 border-l-4 border-emerald-700">
                <p className="mb-4">
                  <strong className="text-emerald-800">Acupuncture</strong> uses needles to adjust the flow of energy in our body.
                </p>
                <p>
                  <strong className="text-emerald-800">Herbal Medicine</strong> works in a similar way, using special tastes and smells to adjust the body’s energy.
                </p>
              </div>
              <p>
                The doctor will sit and talk with you, look at your tongue, and take your pulse. To the trained eye, your tongue is a wealth of information: the colour, coating, shape, wetness, and cracks of the tongue map out the condition of your internal organs as well as your mental and emotional health. The doctor also feels your pulse, distinguishing between hundreds of different types of pulse to understand the condition of your organs. These practices may sound far-fetched, but this system of medicine is highly detailed and the result of over 3000 years of clinical testing. From this consultation the doctor will explain the diagnosis and recommend treatment—this will probably be a combination of acupuncture and Chinese herbs.
              </p>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-7 sm:px-8 lg:px-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-stone-800 mb-4">How it works</h2>
              <div className="w-24 h-1 bg-emerald-700 mx-auto mb-4"></div>
              <p className="text-xl text-stone-700">An easy way to understand how acupuncture works to heal the body</p>
            </div>

            {/* YouTube Video Embed */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl bg-stone-100">
                <iframe
                  src="https://www.youtube.com/embed/JQA1HC2YmMY?start=8&rel=0&modestbranding=1"
                  title="How Acupuncture Works to Heal the Body"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
              <p className="mt-3 text-sm text-stone-600 text-center">
                Video: “How Acupuncture Works to Heal the Body” (starts at 0:08)
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-stone-800 mb-6 text-center">We Can Help With</h3>
              <div className="bg-stone-50 p-8 rounded-lg shadow-md">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-stone-700">
                  {[
                    'Anxiety', 'Asthma', 'Back Pain', 'Bells Palsy', 'Chronic Fatigue', 'Colitis',
                    'Crohns', 'Cystitis', 'Depression', 'Endometriosis', 'Fibromyalgia', 'Hayfever',
                    'Headache', 'Infertility', 'Insomnia', 'Irritable Bowel Syndrome', 'Nausea',
                    'Premenstrual Syndrome', 'Sciatica', 'Sports Injuries'
                  ].map((condition, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-700 rounded-full mr-3"></span>
                      <span>{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-teal-50">
          <div className="max-w-7xl mx-auto px-7 sm:px-8 lg:px-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Testimonials</h2>
              <div className="w-24 h-1 bg-teal-700 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Jane Faber',
                  location: 'Essex',
                  text: 'I have tried other products that worked fine, but this one is certainly the best of them all. It brings efficiency to a new level of simplicity.'
                },
                {
                  name: 'John Smith',
                  location: 'Romford',
                  text: 'If you are looking for a high quality company, I highly recommend this one. They are the very best in the field, no compromise.'
                },
                {
                  name: 'Madelaine Taylor',
                  location: 'Dagenham',
                  text: 'The first time I tried this company, I was hooked. Everything was so fabulous, modern and easy. I\'ll never go back to working with anyone else.'
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                  <p className="text-stone-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-stone-900">{testimonial.name}</p>
                    <p className="text-sm text-stone-600">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* About Practitioner Section */}
            <div className="mt-24 max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-stone-800 mb-4">About - our practitioner</h2>
                <div className="w-24 h-1 bg-teal-700 mx-auto"></div>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
                <img
                  src={janney}
                  alt="Janney Liu"
                  className="w-40 sm:w-48 md:w-1/5 h-auto rounded-full shadow-md"
                  loading="lazy"
                />
                <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-auto">
                  <h3 className="text-2xl font-semibold text-stone-900 mb-4">Welcome. I am Janney Liu</h3>
                  <p className="text-lg text-stone-700 mb-6">
                    I am a Practitioner / Therapist of Traditional Chinese Medicine.
                  </p>
                  <div className="space-y-4 text-stone-700 leading-relaxed">
                    <p>
                      I have been involved in this area of study since 1990, graduating with my Bachelor Degree in herbal medicine at Liaoning University of Traditional Chinese Medicine. Thereon I began practicing in Shenyang Traditional Chinese Medicine Hospital in the Pharmacology Department.
                    </p>
                    <p>
                      Later in 2000 I received my Masters Degree in Science in Shenyang Pharmaceutical University which furthered my knowledge of working with herbal medicine.
                    </p>
                    <p>
                      In 2006 I trained in acupuncture - again at Liaoning University TCM. From there I relocated to the U.K. in August 2006 working for the Dr China Clinics.
                    </p>
                    <p className="pt-4">
                      I am a member of <strong>ATCM- Association of Traditional Chinese Medicine</strong>, a largest group of comprising <strong>authentic Chinese doctors</strong>; my membership number: <strong>FM0160033</strong>.
                    </p>
                    <p>
                      For more information, please visit: <a href="https://www.atcm.co.uk" target="_blank" rel="noreferrer" className="text-teal-700 hover:underline">www.atcm.co.uk</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-7 sm:px-8 lg:px-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-stone-800 mb-4">Services</h2>
              <div className="w-24 h-1 bg-emerald-700 mx-auto mb-4"></div>
              <p className="text-xl text-stone-700">Find the Solution to your Problems</p>
            </div>

            {/* Infertility Treatment */}
            <div className="max-w-4xl mx-auto mb-12 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-stone-900 mb-4">Infertility treatment and IVF Support</h3>
              <div className="space-y-4 text-stone-700 leading-relaxed">
                <p>
                  We offer specialised treatment for infertility, with bespoke treatment plans specific to each individual. Common causes of infertility that we are experienced in treating include irregular periods, immature eggs, amenorrhea, endometriosis, uterine fibroid and PCOS.
                </p>
                <p>
                  Normally, a treatment course for infertility takes between 3 to 6 months, as the effects of treatment can only be observed with each passing menstrual cycle.
                </p>
                <p>
                  We also provide complementary acupuncture to support those undergoing IVF, which adapts to suit the needs of each stage of IVF as you go through the process. Research shows that acupuncture is effective at correcting hormone imbalances, often the underlying cause of fertility issues. Acupuncture also promotes ovulation and stimulates the body’s self healing abilities, which helps improve the uterus condition. Physical benefits aside, getting acupuncture is a great means of relaxing and relieving stress, making acupuncture the ideal therapy to accompany the stressful IVF process.
                </p>
                <p>
                  Using herbal medicine in conjunction with acupuncture can greatly improve the result of the treatment. Out of a diverse range of traditional herbal medicines, we offer to prescribe herbal remedies tailored to your needs.
                </p>
              </div>
            </div>

            {/* Service Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">Available Now</span>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-4">Acupuncture</h3>
                <div className="space-y-3 text-stone-700 leading-relaxed">
                  <p>
                    Acupuncture involves the insertion of very fine needles at specific acupuncture points along various meridians in order to unblock the flow of Qi through the body. It is a painless and relaxing treatment that has been widely accepted by Western medicine. There are alternative techniques available if you have a fear of needles.
                  </p>
                  <p>
                    It was utilised by the NHS, who are considering its prospects for wide-spread recommendation, because:
                  </p>
                  <p className="font-semibold text-emerald-800">
                    “Acupuncture works amazingly! Pain relief! Safe, natural & effective.....”
                  </p>
                  <p>
                    Over 3000 years of wisdom, knowledge and experience. Come, and you can feel the effect immediately!
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">Available Now</span>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-4">Cupping</h3>
                <p className="text-stone-700 leading-relaxed">
                  Cupping is a therapy using the suction effect of vacuum cups, which is placed on muscles. The vacuum of the cups sucks the bodily fluids to the surface, which serves to remove internal wetness, excessive heat or coldness. This also relieves muscle tension, which can improve overall blood flow and promote cell repair.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">Available Now</span>
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-4">Herbal Remedies</h3>
                <div className="space-y-3 text-stone-700 leading-relaxed">
                  <p>
                    Chinese herbal therapy involves the use of natural plants in raw or processed forms. Each herb has its own specific characteristics and particular medical use to treat diseases by rectifying any hyperactivity or hypo activity of yin and yang, and to help restore the body to its normal physiological functions.
                  </p>
                  <p>
                    Chinese herbal therapy must be given by qualified TCM practitioners. The practitioner conducts a diagnostic interview, which includes asking questions relating to your health problems, taking your pulse and examining your tongue, before making a prescription.
                  </p>
                  <p>
                    Herbs have several different forms: Loose herbs, powders, tablets or pills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-emerald-50">
          <div className="max-w-7xl mx-auto px-7 sm:px-8 lg:px-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-stone-800 mb-4">CONTACT US</h2>
              <div className="w-24 h-1 bg-emerald-700 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-6">Our Locations</h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="font-semibold text-stone-900 mb-2">Our main treatment room is in Romford town centre:</p>
                    <p className="text-stone-700">
                      <strong>Romford:</strong> 19 - 21 Eastern Road, Romford, RM1 3NH
                    </p>
                    <p className="font-semibold mt-2 text-stone-700">There are parking bays available along Eastern Road.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="font-semibold text-stone-900 mb-4">We can also provide treatment in the following locations:</p>
                    <p className="text-stone-700">
                      <strong>Harold Wood:</strong> Willow Herbal Centre, 2 The Drive, Harold Wood, RM3 0DU
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border-l-4 border-emerald-700 shadow-sm">
                    <p className="font-semibold text-stone-900 mb-2">Book by appointment only!</p>
                    <p className="text-stone-700">
                      Call us now at <a href="tel:07835226135" className="text-emerald-700 hover:underline font-semibold">07835 226135</a> or send a message using the form and we'll get back to you as soon as we can.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-6">Send us a Message</h3>
                <ContactForm />
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-12 max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold text-stone-900 mb-4 text-center">Find us</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=19-21+Eastern+Road,+Romford,+RM1+3NH,+UK&output=embed"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Acupuncture & Herbs Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-7 sm:px-8 lg:px-10 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">ABOUT US</h4>
              <p className="text-sm leading-relaxed mb-4">
                To book an appointment, call or text Janney on <a href="tel:07835226135" className="text-green-400 hover:underline">07835 226135</a>.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">CONTACT US</h4>
              <div className="text-sm space-y-2">
                <p>Romford, Essex</p>
                <p>
                  <a href="tel:07835226135" className="text-emerald-400 hover:underline">+44 7835 226135</a>
                </p>
                <p>
                  <a href="mailto:contact@acupunctureandherbalremedies.com" className="text-emerald-400 hover:underline">contact@acupunctureandherbalremedies.com</a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => scrollToSection('introduction')} className="hover:text-emerald-400 transition-colors">Introduction</button></li>
                <li><button onClick={() => scrollToSection('how-it-works')} className="hover:text-emerald-400 transition-colors">How it Works</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-emerald-400 transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-emerald-400 transition-colors">Contact</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Acupuncture & Herbal Remedies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
